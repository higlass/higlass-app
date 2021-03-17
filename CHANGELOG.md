## v1.1.11

- Updated Slack invite link

## v1.1.10

- Fixed broken links to the docs
- Added Altius' Epilogos, Altius' Index, and ABC Enhancer-Gene Maps to the example use cases

## v1.1.9

- Unknown. Please ask @pkerpedjiev

## v1.1.8

- Add a drop-down link for the user and python links
- Update HiGlass to v1.8, PIXI to v5.2, and other dependencies
- Update several dev libraries

## v1.1.7

- Replaced embedded blog and docs with links to the actual blog and docs

## v1.1.6

- Unregister the service worker

## v1.1.5

- Avoid mixed protocol issues when loading content

## v1.1.4

- Use PIXI legacy `v5` for better backwards compatibility

## v1.1.3

- Disable _undo_ and _redo_ handlers when an input element is focused
- Move _Core Contributors_ and _PIs_ above tutorial resources in `/about`
- Add the talk video from the SciPy conference to `/about`
- Switch content URLs to hopefully fix an ad blocker issue when loading JSON from GitHub pages
- Fix year of the copyright

## v1.1.2

- Disable service workers

## v1.1.1

- Fix minor visual glitch with HiGlass `v1.6`

## v1.1.0

- Add support for a custom footer for branding the organization running the HiGlass instance.

## v1.0.6

- Fix #10 and #11
- Fix other minor visual glitches to provide better support for mobile devices

## v1.0.5

- Update to HiGlass v1.4

## v1.0.4

- Use `window.HGAC_SERVER` for pulling viewconfs
- Use `window.hglib.version` for the info dialog
- Do not enforce protocol when loading viewconfs from higlass.io
- Add link to our Twitter account

## v1.0.3

- Support deep links to blog posts. E.g., [https://higlass.io/blog/2018/11/05/higlass-overview/](https://higlass.io/blog/2018/11/05/higlass-overview/)

## v1.0.2

- Avoid strict protocol for higlass views on higlass.io to support https and http
- Fix link to adding plugin tracks
- Fix link to bioinformatics.stackexchange.com
- Fix typos

## v1.0.1

- Add cTracks to the list of projects using HiGlass
- Fix outdated citation on the homepage of higlass.io
- Fix a path issue: assume that HGA is running under root by default

## v1.0.0

- Add list of plugins
- Add blog
- Add news section on the home page
- Add permanent full screen mode when started without demos, i.e., `"homepageDemos": false` in the `config.json` (or `config.js`)
- Serve all assets locally and cache them using a service worker. This enables offline support and make it easier to deploy HiGlass within an intranet.
- Load home page demos on demand (i.e., once the user scrolls to them)
- Allow setting default viewconfs and default track options via `HGAC_DEFAULT_VIEW_CONFIG` and `HGAC_DEFAULT_OPTIONS` in `config.js`.
- Allow running HGA under a different directory other than root using `HGAC_BASEPATH` in `config.js`.
- Update to session storage only
- Update to HiGlass `v1.3`
- Update to React `v16.6`
- Update to React Scripts `v2`
- Update to Webpack `v4`
- Update to Babel `v7`
- Update 3rd party packages
- Updated citation
- Updated help page with slack channel and 4DN Hi-C Bootcamp
- Refactor pub-sub service as HOC using an external library
- Refactor state service as factory
- Refactor DOM event server as factory
- Remove `/help` (content is integrated into `/about`)
- Exclude server endpoints from the service worker
- Load news, examples, and plugins from gh-pages since rawgit shuts down 😢
- Add stylelint to check for issue with stylesheets
- Add husky and lintstaged to run eslint, stylelint, and prettier automatically prior to commits

## v0.9.2

- Add separate file for global settings

## v0.9.1

- Update version of HiGlass in production build

## v0.9.0

- Replace outdated docs with live version; check `/docs`
- Exclude HiGlass, React, ReactDOM, ReactBootstrap, and PIXI.js from production bundle. Libraries are loaded via CDNs now.
- Fix severe subSub bug
- Updated HiGlass to `v0.10.6` and other third-party libraries

## v0.8.0

- Add `/help`
- Update `/about`
- Updated HiGlass to `v0.9.14` and other third-party libraries
- Fix smaller visual bugs

## v0.7.1

- Optimize Travis CI builds

## v0.7.0

- Update HiGlass to `v0.9.x`
- Update tons of third party libs
- Add talks, presentations, and tutorials to about
- Fix nasty unboundedness bug

## v0.6.0

- Add range select tool
- Add annotation form

## v0.5.0

- Add sub-top bar
- Add right bar
- Add tool tip
- Add tabs

## v0.4.0

- Add support for user authentication
- Add various keyboard shortcuts

## v0.3.0

- Add dual-layer (session > localforage) state persistency
- Store and restore view config changes
- Add convinience button to download view config

## v0.2.0

- Add support for dialogs
- Add an info dialog for version numbers

## v0.1.0

- Replication of the functionality of https://github.com/hms-dbmi/higlass-website
