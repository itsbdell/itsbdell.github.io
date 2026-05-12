#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "net/http"
require "time"
require "uri"
require "yaml"

ROOT = File.expand_path("..", __dir__)
OUTPUT_PATH = File.join(ROOT, "_data", "recent_saves.yml")

LOOKBACK_HOURS = Integer(ENV.fetch("RECENT_SAVES_LOOKBACK_HOURS", "48"))
MAX_ITEMS = Integer(ENV.fetch("RECENT_SAVES_MAX_ITEMS", "12"))

PINBOARD_ENDPOINT = "https://api.pinboard.in/v1/posts/recent"

def fetch_json(url)
  uri = URI(url)
  response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https") do |http|
    request = Net::HTTP::Get.new(uri)
    request["User-Agent"] = "briandell.xyz recent saves updater"
    http.request(request)
  end

  unless response.is_a?(Net::HTTPSuccess)
    raise "GET #{uri.host}#{uri.path} failed with #{response.code}: #{response.body}"
  end

  JSON.parse(response.body)
end

def pinboard_items
  token = ENV["PINBOARD_AUTH_TOKEN"].to_s.strip
  return [] if token.empty?

  uri = URI(PINBOARD_ENDPOINT)
  uri.query = URI.encode_www_form(
    auth_token: token,
    format: "json",
    count: 100
  )

  posts = fetch_json(uri.to_s).fetch("posts", [])
  cutoff = Time.now.utc - (LOOKBACK_HOURS * 60 * 60)

  posts
    .map { |post| normalize_pinboard_post(post) }
    .select { |item| Time.parse(item.fetch("saved_at")).utc >= cutoff }
end

def normalize_pinboard_post(post)
  url = post.fetch("href")
  tags = post.fetch("tags", "").split(/\s+/)
  title = clean_text(post["description"]) || URI(url).host || url

  {
    "type" => classify_type(url, tags),
    "icon" => icon_for(url, tags),
    "title" => title,
    "author" => author_for(url, tags),
    "url" => url,
    "source" => "pinboard",
    "saved_at" => Time.parse(post.fetch("time")).iso8601
  }
end

def clean_text(value)
  text = value.to_s.strip
  text.empty? ? nil : text
end

def classify_type(url, tags)
  tag_string = tags.join(" ").downcase
  host = URI(url).host.to_s.downcase

  return "tweet" if tag_string.match?(/\btweet\b|\btwitter\b|\bx\b/) || host.end_with?("x.com", "twitter.com")
  return "video" if tag_string.match?(/\bvideo\b|\byoutube\b/) || host.end_with?("youtube.com", "youtu.be")
  return "post" if tag_string.match?(/\bpost\b|\bblog\b/)

  "article"
end

def icon_for(url, tags)
  case classify_type(url, tags)
  when "tweet"
    "※"
  when "video"
    "▶"
  when "post"
    "◆"
  else
    "✦"
  end
end

def author_for(url, tags)
  tag_author = tags.find { |tag| tag.start_with?("author:") || tag.start_with?("by:") }
  return tag_author.split(":", 2).last.tr("_-", " ") if tag_author

  host = URI(url).host.to_s.sub(/\Awww\./, "")
  host.empty? ? "saved link" : host
end

def dedupe(items)
  seen = {}
  items.each_with_object([]) do |item, list|
    next if seen[item["url"]]

    seen[item["url"]] = true
    list << item
  end
end

items = dedupe(pinboard_items)
  .sort_by { |item| Time.parse(item.fetch("saved_at")) }
  .reverse
  .first(MAX_ITEMS)

if items.empty?
  warn "No recent saves found. Leaving #{OUTPUT_PATH} unchanged."
  exit 0
end

File.write(OUTPUT_PATH, "#{items.to_yaml(line_width: -1)}\n")
puts "Wrote #{items.size} recent saves to #{OUTPUT_PATH}"
