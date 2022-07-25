# Y42 frontend interview app

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

A simple authentication mechanism is implemented in `auth.service.ts`.

- Use a valid email.
- Any password of length > 2 is allowed

The app is a simple product catalog, which allows viewing products and editing them.

You can double-click a row to open a small bottom sheet with a form to edit all fields, or optionally you can also double-click the `stock` and `price` cells to update them right from the grid.

## Running E2E tests

To run E2E tests with Playwright

```sh
npm run e2e
```
