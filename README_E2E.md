# Automated test developer interview task

Hello and thanks for your interest in the "automated test developer" position here @ Y42.

If you haven't yet please first read the [main readme](README.md) to setup the working environment and get the app up and running.

**Important**: Please **fork the repository before cloning**.

As your task for the role you will implement automated tests against our demo application.

As described in the [main readme](README.md) it is a simple product catalog with editing capabilities that is "secured" by a login form.

The app works and it is enough to run `npm run e2e` to run the tests.

## Expectations

- Please checkout a new branch at `e2e/{your-name} and commit your changes there.
- Please write **all** tests in the `/e2e` directory.
  Additionally, you are also encouraged to make changes to any file in the `/src` directory if necessary.
- Please keep in mind that code quality and cleanliness, ie. adherence to best practices will be evaluated.
- Please write as many or as few tests as you like.
- Please do not take more than 90 minutes for the task

## Task

Write automated tests (using Playwright) to test that the application

- supports double-clicking a row and opening the `Product form` to edit every property of a `Product`
- supports double-clicking the `Stock` cell to edit the value directly from the grid
- supports double-clicking the `Price` cell to edit the value directly from the grid
- correctly validates the inputs in the `Product form`
- supports sorting the list by `Stock`

## Definition of Done

- The above mentioned use-cases are covered by tests
- Running `npm run e2e` succeeds
- The CI pipeline is green

Once you are ready please open a pull-request.
Remember that this only works from **forked** repositories.
