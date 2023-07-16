Issue #1: The command "npm run seed" produces error messages without executing the intended actions. It seems this bug might be specific to Apple computers. While the bug was fixed to work as intended on most platforms, it might still persist for Apple users.

Issue #2: The function "authUser()" incorrectly decodes the token instead of verifying its authenticity, which compromises the security of user authentication.

Issue #3: There is a lack of input validation for the database, particularly in the registration and update routes. The absence of proper validation exposes the application to potential data integrity issues.

Issue #4: This bug relates to the second part of the previous issue (Issue #3) and affects a different route. Separate validation issues exist for the registration and update routes, which need to be addressed individually.

Issue #5: The "PATCH users/username" route doesn't allow users to update their own information due to an incorrect implementation of the "requireAdmin" middleware. This restriction should only apply to non-admin users updating someone else's information.

Issue #6: The "auth/login" route fails to await the completion of "User.authenticate" function, leading to a vulnerability where anyone can receive a login token irrespective of their actual credentials.

Issue #7: The "auth/login" route doesn't check whether both the username and password parameters are submitted, resulting in generic code 500 errors instead of more specific error handling.

Issue #8: The "User.getAll()" function inexplicably accepts "username" and "password" arguments without apparent use. These unnecessary arguments were removed to improve the code's clarity and maintainability.

Issue #9: The "DELETE users/username" route doesn't await the results, which means it doesn't catch errors, especially when an invalid username is entered for deletion. This could lead to incomplete or failed deletion operations.
