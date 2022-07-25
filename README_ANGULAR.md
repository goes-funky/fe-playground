# Angular developer interview task

Hello and thanks for your interest in the "Angular developer" position here @ Y42.

If you haven't yet please first read the [main readme](README.md) to setup the working environment and get the app up and running.

## Technical details

rxjs `BehaviorSubject`s are being used for state management.

In the background, data is being fetched from [dummyjson API](https://dummyjson.com/docs/products).

Since that API does not support mutating calls like PUT or DELETE we are simulating these calls with a small delay before modifying the local copy.

## Expectations

- Please implement at least two of the below tasks.
- Please do not forget (happy path) unit tests.
- Please keep in mind that code quality and cleanliness, ie. adherence to best practices will be evaluated.
- Feel free to refactor/improve/abstract existing code if necessary.
- Please do not take more than 90 minutes for the task.

## Tasks

- Implement a "Add product" functionality based on the existing `product-detail` component.
- Implement search functionality to dynamically filter the product list (please use [this API](https://dummyjson.com/docs/products#search)).
- Implement a "Fetched XXX seconds ago" label, which updates every minute.

## Definition of Done

- CI pipeline is green
- At least two tasks are implemented
- New code is covered by unit tests (happy path)

Once you are ready please either open a pull-request or send a link to your Github branch where the solution is implemented back to the recruiter.
