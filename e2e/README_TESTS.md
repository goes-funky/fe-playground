# Automated Tests Explanation

In this file you can find a short explanation of the logic used when completing the task.

## Important pattern used: POM (page object model)

- Created a folder inside e2e, called 'pages' and added a class called 'loginPage'.
- This object encapsulates common operations I used for my tests.
- The user will need to login every time, in order to interact with the Products page, so it is better to add needed functions
  inside the class, like: 'enterEmail', 'enterPassword', 'clickSubmit', and 'logInToY42', and then use the loginPage class in the tests.

## test.beforeEach() & test.afterEach()

- These two functions are executed before and after each test.
- test.beforeEach() => initializes the page object and navigates to the app before starting the test.
- test.afterEach() => closes the app.

## test.describe()

- Any tests added in this callback will belong to the group.





