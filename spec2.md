1) A summary of the application
    This is a Rails project management application which any business can use to create and track client projects.

2) [ ] What is your plan to render an index page via JavaScript & JSON?
    I am going to render http://localhost:3000/projects index page via JS and JSON
    and create buttons to retrieve projects.

3) [ ] What is your plan to render a show page via JavaScript & JSON?
    I am going to render http://localhost:3000/clients/3/projects/23 show page via JS and JSON and create a button to retrieve a particular project.  Do I need to add a button to show the next and previous project? I will also add a button to retrieve the comments.

4) [ ] How will you implement rendering a has_many relationship via JavaScript & JSON?
    I will use Active Model Serialization to render a has_many relationship which is
    a project has_many comments.

5) [ ] What form will you use to submit via AJAX?
    I will use http://localhost:3000/projects/new form to submit via AJAX.  

6) [ ] What is meant by JavaScript Model Objects and how will you implement them in your application.

  JS model objects are objects created using a class constructor with key / value pairs.  I will translate the JSON responses from the database into JS model objects and create a prototype on the object constructor to show the data.

7) [ ]  There will be a quiz in your assessment. Be familiar with hoisting and scope as well as benefits of using jQuery and how that differs from vanilla JavaScript.

  Benefits of JQuery

  It is a Javascript library that makes writing Javascript easier.  More compatible between cross browsers.    It will reduce the development time. Use it to add animation and even handling on your website. jQuery simplifies HTML document traversing, which means "move through", are used to "find" (or select) HTML elements based on their relation to other elements. 

  CONS:   JQUERY is a heavy library to load.

  Added Jquery rails gem and updated application js file
  //= require jquery
  //= require jquery_ujs
