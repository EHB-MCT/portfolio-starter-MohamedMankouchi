# Portfolio Starter Mohamed Mankouchi

I have developed an application that enables users to generate user data for brainstorming name ideas. The platform facilitates real-time data transfers, allowing users to observe active participants, track individuals leaving the session, and witness users adding, modifying, or deleting information in real-time.


### Prerequisities


In order to run this container you'll need docker desktop installed.

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Usage


To run the container use this command
```shell
docker-compose up --build
```


#### Environment Variables

* `POSTGRES_DB` - Defines the database that applications and services will interact with.
* `POSTGRES_PASSWORD` - Defines the password for authenticating with a PostgreSQL database server
* `POSTGRES_USER` - Defines the user account applications and services will use when connecting to the PostgreSQL server.
* `POSTGRES_HOST_AUTH_METHOD` - Specifies PostgreSQL host authentication method
* `NODE_ENV` - Defines the Node.js environment mode. Use it to indicate the operating environment, such as development or production


## Built With

* node:16
* version: 3.9
* React
* Docker
* React-Bootstrap
* Jest
* Supertest
* Express

## Authors

* **Mohamed Mankouchi** 


## User API Documentation

This endpoint allows you to retrieve a list of all users.
```shell
GET /users
```

This endpoint allows you to retrieve a specific user by their username.

```shell
GET /users/:username
```

This endpoint allows you to delete a specific user by their username.

```shell
DELETE /users/:username
```

This endpoint allows you to create a new user.
```shell
POST /users
```

This endpoint allows you to update the details of a specific user by their username.

```shell
PUT /users/:username
```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Sources
* Courses (Jan Everaert)
* https://www.youtube.com/watch?v=HG6yIjZapSA
* https://www.youtube.com/watch?v=FX1CrG5n2ys
* https://www.youtube.com/watch?v=YS35VHsbS-0&t=333s
* https://www.youtube.com/watch?v=J5GP1WNKyeo&t=560s
* https://chat.openai.com/share/6b37c514-1a74-48e1-999d-7d0977f98465
