# Implementation Notes

## made.json site update

- The canonical standard is now `made.json`; `apps.json` should be treated as historical/prototype language.
- The public site should publish `/made.json` with top-level `items`, not `/apps.json` with top-level `apps`.
- Existing item metadata mostly maps directly to the new schema. The main content update is the first entry: `apps-json` should become `made-json`, with `made-json.org` and `github.com/itsbdell/made-json` links.
- Keep `/apps/` as the human-readable software page unless a later product decision renames the route. The route describes the page category, not the feed contract.
- Do not maintain a second `/apps.json` feed. The site now uses a Netlify 301 redirect from `/apps.json` to `/made.json` for old links.
- Validation should cover the Jekyll build output and the generated `/_site/made.json` against the current made-json CLI/schema.
