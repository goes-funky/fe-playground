# Y42 frontend playground

## Prerequisites

- Node 16
- Angular CLI

```sh
npm install
```

## Running the app

### Getting started

To serve the app

```sh
npm start
```

and open the browser @ http://localhost:4200

### About the app

The app is a simple product catalog, which allows viewing products and editing them.

You can double-click a row to open a small bottom sheet with a form to edit all fields, or optionally you can also double-click the `stock` and `price` cells to update them right from the grid.

A simple authentication mechanism is implemented in `auth.service.ts`.

- Use a valid email.
- Any password of length > 2 is allowed

### Running E2E tests

To run E2E tests with Playwright

```sh
npm run e2e
```

### Running unit tests

To run unit tests with Jest

```sh
npm run test
```

## Interview tasks

### Senior Angular Developer

If you are applying for the `Senior Angular Developer` position please continue reading the [Senior Angular Developer task description](README_ANGULAR.md).

### Automated Test Developer

If you are applying for the `Automated Test Developer` position please continue reading the [Automated Test Developer task description](README_E2E.md).
