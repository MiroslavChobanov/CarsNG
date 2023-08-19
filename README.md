<b>Project Overview:</b>

The Car Sales Application is a full-stack web application developed using ASP.NET for the backend and Angular for the frontend. The application provides a platform for registered users to buy and sell cars. Users can create accounts, list their cars for sale, view other listings, and interact with the platform to manage their own listings.

<b>Project Architecture:</b>

Backend (ASP.NET):

ASP.NET Core: The backend is built using ASP.NET Core, a versatile and cross-platform framework for building web applications.
Database: The application uses a relational database (MS SQL Server) to store user and car data. The database is created using the code-first approach, which allows the model classes to define the database schema.
Entity Framework Core: Entity Framework Core is used as the Object-Relational Mapping (ORM) tool to manage interactions with the database.
Controllers: ASP.NET Controllers handle incoming requests, process data, and return appropriate responses. The application has controllers for user authentication, car listing, and user-related actions.
Authentication and Authorization: Authentication and authorization are implemented using JWT (JSON Web Tokens) to secure endpoints and manage user sessions.
Dependency Injection: Dependency injection is utilized to manage the application's services and promote modularity.

Frontend (Angular):

Angular Framework: The frontend is developed using Angular, a powerful JavaScript framework for building dynamic web applications.
Components: Angular components define the UI elements and logic for different parts of the application, such as the car listing page, user profile, and authentication forms.
Services: Angular services handle communication with the backend API, including fetching and submitting data. Services are used to manage user authentication, car operations, and data retrieval.
Routing: Angular's built-in router is used to enable navigation between different components and views within the application.
Guards: Route guards are implemented to control access to specific routes based on user authentication status. For example, only logged-in users can access certain pages.

<b>Key Features:</b>

User Authentication and Authorization:

Users can register and log in securely.
JWT tokens are generated upon successful login and used for subsequent requests.
Access to certain routes and actions is restricted to authenticated users.

Car Listing and Management:

Registered users can create, edit, and delete car listings.
Each car listing includes details such as make, model, price, mileage, and more.
Users can view their own car listings and perform CRUD operations on them.

Viewing Listings:

All users can view a list of available car listings on the home page.
Detailed information about each car, including specifications and contact details, is displayed.

<b>Deployment and Technologies:</b>

The application can be deployed to a web server capable of hosting ASP.NET Core and serving Angular applications.
The application uses Microsoft SQL Server as the database, Entity Framework Core for data management, Angular for the frontend, and ASP.NET Core for the backend.

<b>Conclusion:</b>

The Car Sales Application is a comprehensive platform for buying and selling cars, providing users with a seamless experience for listing, managing, and browsing car listings. By leveraging ASP.NET Core and Angular, the project delivers a modern, responsive, and user-friendly web application that meets the needs of car enthusiasts and sellers alike.
