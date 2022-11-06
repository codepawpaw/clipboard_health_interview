# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. First i refactoring the unit test to be using nested describe. I using that so my test case will be more clear with the use case.
2. Im using a simple breakdown with negative case conditional first and then i put the positive condition later. The unit test help me refactoring the code. Whenever i refactor something in the dpk.js i always run the unit test before put another refactor.
3. I think my version is more readable because its more clear with the conditional. The old one full with nested condition and it takes more time to read.
- First i do decompose conditional. I isolate all special checks and edge cases into separate clause and place them before the main checks.
- Then i consolidate all these conditional in a single expression
- Then i move the code outside the conditional

