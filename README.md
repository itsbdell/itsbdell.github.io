# itsbdell.github.io

Personal site at [briandell.xyz](https://briandell.xyz).

## Apps feed

The site publishes an [apps.json](https://briandell.xyz/apps.json) feed (the [apps.json](https://github.com/itsbdell/apps-json) decentralized standard — RSS for vibe-coded micro-apps). The feed and the on-site `/apps/` page are both rendered from a single source of truth at `_data/apps.yml` — to add a new entry, append it there with at least `id`, `name`, `description`, `url`, and (where it applies) `vibe_coded: true`, `source`, `forkable`, `tags`, and `targets[]`. Then run a Jekyll build and the public feed plus the `/apps/` page update together. Validate locally with `node /path/to/apps-json/appfeed/bin/appfeed.js validate ./_site/apps.json` (the `@apps-json/cli` package is the same tool once it's published on npm).
