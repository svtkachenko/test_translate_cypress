# test_translate_cypress

Example how to test basic Google Translate functionality using Cypress.

# How to use

## Locally

### Install

1. `git clone`
1. `yarn install`

### Run in interactive mode with time-travel

1. `yarn cypress open`
1. Select specific spec file or `run all tests`

### Run in non-interactive CLI mode

All available specs in Electron browser: `yarn cypress run`

Specific spec: `yarn run cypress run cypress/integration/document_translation.spec.js`

Specific browser: `yarn run cypress run -b firefox`

## Docker

All available specs in Electron browser: `docker-compose run cypress`

Specific browser: `docker-compose run cypress -b chromium`

## Fetching results

When running in non-interactive mode, both in a docker and locally, videos and screenshots could be found in
`cypress/videos` and `cypress/screenshots` folders.

For docker videos could be disable this way:

```
$ CYPRESS_VIDEO=false
$ docker-compose run -e CYPRESS_VIDEO cypress
```

# Existing limitations

Document translate test works only in Chrome-based browsers, but not in Firefox, as this type of translation causes a
cross-origin error and currently it could be disabled only in Chrome-based browsers.
