### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  JWT stands for JSON Web Token. It's often used as a means of authentication and authorization in web applications and APIs

- What is the signature portion of the JWT? What does it do?
  It's one of the three parts, it's created by encoding the header and payload, appending a secret key only known to the server.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  Yes. They can decode the payload part to view its contents.

- How can you implement authentication with a JWT? Describe how it works at a high level.
  The server generates a JWT and the client stores the JWT. The server validates the JWT signature to ensure its authenticity and grants access to protected resources or endpoints.

- Compare and contrast unit, integration and end-to-end tests.
  Unit tests are small, isolated tests that focus on individual units of code.
  Integration tests examine how multiple units or components interact with each to make sure they work correctly when integrated.
  End to end tests validate the entire application.

- What is a mock? What are some things you would mock?
  it's a test double used in unit testing to mimic the behavior of objects or components.

- What is continuous integration?
  its a software development practice where code changes are automatically built, tested, and integrated into the shared repository.

- What is an environment variable and what are they used for?
  it exists outside the program and its part of the operating system's environment.

- What is TDD? What are some benefits and drawbacks?
  Test Driven Development. Developers write automated tests before implementing the actual code. Some benefits of TDD include improved code quality, early bug detection, and increased test coverage.

- What is the value of using JSONSchema for validation?
  it's a specification for defining the structure, format, and constraints of JSON data.

- What are some ways to decide which code to test?
  it can be determined using code coverage analysis and risk based testing.

- What does `RETURNING` do in SQL? When would you use it?
  It's a clause in SQL that allows you to retrieve values that were affected by an 'INSERT', 'UPDATE', or 'DELETE'.

- What are some differences between Web Sockets and HTTP?
  Web sockets provide full duplex communication, allows persistent connections. HTTP is a stateless protocol, follows a request-response model, and is mostly for traditional client-server ineteractions

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
  Personally I do like Flask better than Express, mostly since it's easier to use. Other than that, they're both pretty similar.
