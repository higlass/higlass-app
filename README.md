# HiGlass App

> The web application for viewing, exploring, and annotating 1D and 2D genomic data.

[![HiGlass](https://img.shields.io/badge/higlass-👍-red.svg?colorB=0f5d92)](http://higlass.io)
[![Build Status](https://img.shields.io/travis/hms-dbmi/higlass-app/master.svg?colorB=0f5d92)](https://travis-ci.org/hms-dbmi/higlass-app)

**URL**: http://higlass.io

**Note**: This is the source code for the web application only! You might want to check out the following repositories as well:

- HiGlass viewer: https://github.com/hms-dbmi/higlass
- HiGlass server: https://github.com/hms-dbmi/higlass-server
- HiGlass docker: https://github.com/hms-dbmi/higlass-docker

## Development

### Installation

```bash
$ git clone --recursive https://github.com/hms-dbmi/higlass-app && higlass-app
$ npm install
```

**Note**: If you forgot to add `--recursive` do the following to pull the submodules

```
$ git submodule update --init --recursive --remote
```

In order to update the wiki run:

```
$ git submodule update --recursive --remote
```

### Commands

**Developmental server**: `npm start`

**Production build**: `npm run build`

**Run tests**: `npm test`
