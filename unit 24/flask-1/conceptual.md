### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
  Syntax, Purpose, and execution environment.

As for purpose, Python is a general purpose programming language while Javascript is primarily used for clientside and server side web development.

- Given a dictionary like `{"a": 1, "b": 2}`: , list two ways you
  can try to get a missing key (like "c") _without_ your programming
  crashing.
  Could try the get() method, dictionary.get('c') or use a try-except block, catching the 'KeyError' exception and handling it gracefully

- What is a unit test?
  a type of software testing where components such as functions or methods are tested in isolation to see if they work as expected.

- What is an integration test?
  It validates the interaction between different modules or components of a system

- What is the role of web application framework, like Flask?
  To provide a structured way to build web applications by offering libraries, tools, and patterns.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  Use route URL parameters when the parameter value is essential to the resource being requested, such as retrieving a specific item by ID.
  Use URL query parameters when the parameter value is optional or used for filtering, sorting, or additional information that doesn't directly identify the requested resource.

- How do you collect data from a URL placeholder parameter using Flask?
  By adding an argument with the same name

- How do you collect data from the query string using Flask?
  by using request.args

- How do you collect data from the body of the request using Flask?
  by using request.json.get('key')

- What is a cookie and what kinds of things are they commonly used for?
  a small piece of data stored on the clinet side by a web browser. Mostly used to store user preferences, session information, and track behavior on websites.

- What is the session object in Flask?
  a dictionary like object that allows you to store data across multiple requests.

- What does Flask's `jsonify()` do?
  it serializes a python object into a json response.
