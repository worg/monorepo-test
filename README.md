# Monorepo Demo

This monorepo contains two web projects built with parcel, this monorepo uses npm native workspace support

## Directory structure

```bash
packages/
  ├── issue-viewer # github issue viewer
  └── user-stats # hello world (sorry have a busy sprint, ran out of time)x
```

## Tooling

This monorepo uses parcel to build the projects, issue viewer uses styled-components and react-router

## Available scripts

From the repo root:

### lint:all

Runs `eslint --fix` and `prettier -w` on all packages

### dev

Runs parcel in watch mode for all packages, issue-viewer runs in port 1234 and user-stats runs in port 1235

individual dev mode scripts for each are available as `dev:issue-viewer` and `dev:user-stats`

### build

Runs parcel in build mode for all packages, outputs artifacts in `dist` directory