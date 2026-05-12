# itsbdell.github.io

Personal site at [briandell.xyz](https://briandell.xyz).

## Apps feed

The site publishes an [apps.json](https://briandell.xyz/apps.json) feed (the [apps.json](https://github.com/itsbdell/apps-json) decentralized standard — RSS for vibe-coded micro-apps). The feed and the on-site `/apps/` page are both rendered from a single source of truth at `_data/apps.yml` — to add a new entry, append it there with at least `id`, `name`, `description`, `url`, and (where it applies) `vibe_coded: true`, `source`, `forkable`, `tags`, and `targets[]`. Then run a Jekyll build and the public feed plus the `/apps/` page update together. Validate locally with `node /path/to/apps-json/appfeed/bin/appfeed.js validate ./_site/apps.json` (the `@apps-json/cli` package is the same tool once it's published on npm).

## Recent saves ticker

The footer ticker is rendered from `_data/recent_saves.yml`. Update it from Pinboard with:

```sh
PINBOARD_AUTH_TOKEN="username:api_token" ruby scripts/update_recent_saves.rb
```

Optional settings:

- `RECENT_SAVES_LOOKBACK_HOURS` controls the window, default `48`.
- `RECENT_SAVES_MAX_ITEMS` controls how many links appear, default `12`.

The GitHub Action in `.github/workflows/update-recent-saves.yml` runs hourly and commits `_data/recent_saves.yml` when Pinboard returns new items. Add `PINBOARD_AUTH_TOKEN` as a repository secret using the value from your Pinboard settings page.

The script infers item type from URL and tags. Use tags like `video`, `tweet`, `blog`, `author:Robin-Sloan`, or `by:Maggie-Appleton` in Pinboard when you want better ticker labels.
