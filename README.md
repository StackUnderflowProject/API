# API 🌐

This project is an api for server that manipulates MongoDb database that stores football, handball and user data.

## Getting started 📋

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Download Node.js & npm (if you haven't yet)

1. Go to: https://nodejs.org/en/download/prebuilt-installer
2. Then proceed to select a version of Node.js, we use v20.12.2 but any later stable version should work aswell.
3. Select your operating system and your cpu architecture (most common in nowadays computers is x64).
4. Click on download button and your download should start
5. After successful download you should be prompted by your program installer and just follow his recommended steps.

to check if the Node.js is successfully configured on your device you can open terminal and write `node --version`, if correctly configured it should respond with your current node version.

npm is already included with Node.js

### Clone the project's reposiratory

1. Open terminal and move to the location of the directory you want this project to be accessed from, for example this step could look like this:  
   `cd "C:\\Users\User\Documents"` (for Windows)  
   `cd ~/Documents` (for Linux/MacOS)
2. Then clone this project, with command:  
   `git clone "https://github.com/StackUnderflowProject/API.git"` (if git isn't recognized you should install git first)

### Install all of the required dependencies

1. Move into the directory of your local copy of the project:
   `cd API`
2. Install the dependencies (this step should take some time):
   `npm install`

## How to run the server? 🤔

To start the server on localhost is pretty staightforward, move into the directory of your local copy of the project and simply run this command:
`npm run dev`  
if the command fails make sure that nothing is running on ports 3000 and 3001, since the server wants to run on those ports

Even with all these steps the project won't work since enviroment variables (secret codes) aren't shared on github, so in order to get them you should contact one of the creators.

## Usage 💡

All of the sports data is tightly connected to the scraper project, that scrapes the information about matches, teams and more, from the internet. You should checkout the project here: https://github.com/StackUnderflowProject/Scraper

Server is listening on the address http://localhost:3000 and that's where all request should be made. Checkout the files in routes directory for every viable request.

Some requests will need an user authentification, so make sure you are logged in with a valid user before you make such requests.

To login you should send login info of a registered account to http://localhost:3000/users/login, which will then return the jwt token, which you then use inside of **Bearer** in the **'Authorization'** header.  
**_jwt token expires after 1h!_**

There are also admin users, that have the power to modify every aspect of the server and its database through their requsts. To become an admin or to get more information, contact one of the admins (creators are admins by default).

## Endpoints 🚀

### Football matches ⚽

| method | path                                                                      | required login | description                                                                                             |
| :----: | ------------------------------------------------------------------------- | :------------: | ------------------------------------------------------------------------------------------------------- |
|  GET   | /footballMatch<code>/</code>                                              |       ✖️       | returns all of the football matches                                                                     |
|  GET   | /footballMatch<code>/countBySeason/:season</code>                         |       ✖️       | returns the number of football matches in certain season                                                |
|  GET   | /footballMatch<code>/filterByLocation/:longitude/:latitude/:radius</code> |       ✖️       | returns football matches that are in radious distance from the point provided by longitude and latitude |
|  GET   | /footballMatch<code>/filterByDateRange/:startDate/:endDate</code>         |       ✖️       | returns football matches that have its date inbetween start and end date                                |
|  GET   | /footballMatch<code>/filterBySeasonAndTeam/:season/:team</code>           |       ✖️       | returns football matches that have the specified season and team                                        |
|  GET   | /footballMatch<code>/filterByTeam/:teamId</code>                          |       ✖️       | returns football matches in which the specified team played in                                          |
|  GET   | /footballMatch<code>/filterByStadium/:stadium</code>                      |       ✖️       | returns football matches, that were on the specified stadium                                            |
|  GET   | /footballMatch<code>/filterBySeason/:season</code>                        |       ✖️       | returns football matches that were played in specified season                                           |
|  GET   | /footballMatch<code>/filterByDate/:date</code>                            |       ✖️       | returns football matches that were played on specified date                                             |
|  GET   | /footballMatch<code>/:id</code>                                           |       ✖️       | returns a football match by specified id                                                                |
|  POST  | /footballMatch<code>/</code>                                              |       ✔️       | creates a new football match                                                                            |
|  PUT   | /footballMatch<code>/:id</code>                                           |       ✔️       | updates a football match with provided information                                                      |
| DELETE | /footballMatch<code>/:id</code>                                           |       ✔️       | deletes a football match with the specified id                                                          |

---

### Football stadiums 🏟️

| method | path                                                                                             | required login | description                                                                                                                                 |
| :----: | ------------------------------------------------------------------------------------------------ | :------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
|  GET   | /footballStadium<code>/</code>                                                                   |       ✖️       | returns all of the football stadiums                                                                                                        |
|  GET   | /footballStadium<br><code>/filterBySeasonAndLocation/:season/:longitude/:latitude/:radius</code> |       ✖️       | returns footballs stadiums that are in the specifed season and aswell in radious distance from the point provided by longitude and latitude |
|  GET   | /footballStadium<code>/filterByLocation/:longitude/:latitude/:radius</code>                      |       ✖️       | returns footballs stadiums that are in radious distance from the point provided by longitude and latitude                                   |
|  GET   | /footballStadium<code>/filterBySeason/:season</code>                                             |       ✖️       | returns football stadiums that were being in use for matches in specified season                                                            |
|  GET   | /footballStadium<code>/getByTeam/:id</code>                                                      |       ✖️       | returns football stadiums that belongs to specified team                                                                                    |
|  GET   | /footballStadium<code>/:id</code>                                                                |       ✖️       | returns a football stadium by specified id                                                                                                  |
|  POST  | /footballStadium<code>/</code>                                                                   |       ✔️       | creates a new football stadium match                                                                                                        |
|  PUT   | /footballStadium<code>/:id</code>                                                                |       ✔️       | updates a football stadium with provided information                                                                                        |
| DELETE | /footballStadium<code>/:id</code>                                                                |       ✔️       | deletes a football stadium with the specified id                                                                                            |

---

### Football standings 🏆

| method | path                                                               | required login | description                                                          |
| :----: | ------------------------------------------------------------------ | :------------: | -------------------------------------------------------------------- |
|  GET   | /footballStanding<code>/</code>                                    |       ✖️       | returns all of the football standings through seasons                |
|  GET   | /footballStanding<code>/filterBySeasonAndTeam/:season/:team</code> |       ✖️       | returns football standings for specified season and team             |
|  GET   | /footballStanding<code>/filterByTeamName/:teamName</code>          |       ✖️       | returns football standings for a specified team name through seasons |
|  GET   | /footballStanding<code>/filterByTeam/:team</code>                  |       ✖️       | returns football standings for a specified team id through seasons   |
|  GET   | /footballStanding<code>/:id</code>                                 |       ✖️       | returns a football standing by specified id                          |
|  POST  | /footballStanding<code>/</code>                                    |       ✔️       | creates a new football standing match                                |
|  PUT   | /footballStanding<code>/:id</code>                                 |       ✔️       | updates a football standing with provided information                |
| DELETE | /footballStanding<code>/:id</code>                                 |       ✔️       | deletes a football standing with the specified id                    |

---

### Football teams 👕

| method | path                                              | required login | description                                        |
| :----: | ------------------------------------------------- | :------------: | -------------------------------------------------- |
|  GET   | /footballTeam<code>/</code>                       |       ✖️       | returns all of the football teams through seasons  |
|  GET   | /footballTeam<code>/name</code>                   |       ✖️       | returns football teams names                       |
|  GET   | /footballTeam<code>/name/:season</code>           |       ✖️       | returns football teams names in a specified season |
|  GET   | /footballTeam<code>/filterBySeason/:season</code> |       ✖️       | returns football teams for a specified specified   |
|  GET   | /footballTeam<code>/:id</code>                    |       ✖️       | returns a football team by specified id            |
|  POST  | /footballTeam<code>/</code>                       |       ✔️       | creates a new football team match                  |
|  PUT   | /footballTeam<code>/:id</code>                    |       ✔️       | updates a football team with provided information  |
| DELETE | /footballTeam<code>/:id</code>                    |       ✔️       | deletes a football team with the specified id      |

---

### Handball matches ⚽

| method | path                                                                      | required login | description                                                                                             |
| :----: | ------------------------------------------------------------------------- | :------------: | ------------------------------------------------------------------------------------------------------- |
|  GET   | /handballMatch<code>/</code>                                              |       ✖️       | returns all of the handball matches                                                                     |
|  GET   | /handballMatch<code>/countBySeason/:season</code>                         |       ✖️       | returns the number of handball matches in certain season                                                |
|  GET   | /handballMatch<code>/filterByLocation/:longitude/:latitude/:radius</code> |       ✖️       | returns handball matches that are in radious distance from the point provided by longitude and latitude |
|  GET   | /handballMatch<code>/filterByDateRange/:startDate/:endDate</code>         |       ✖️       | returns handball matches that have its date inbetween start and end date                                |
|  GET   | /handballMatch<code>/filterBySeasonAndTeam/:season/:team</code>           |       ✖️       | returns handball matches that have the specified season and team                                        |
|  GET   | /handballMatch<code>/filterByTeam/:teamId</code>                          |       ✖️       | returns handball matches in which the specified team played in                                          |
|  GET   | /handballMatch<code>/filterByStadium/:stadium</code>                      |       ✖️       | returns handball matches, that were on the specified stadium                                            |
|  GET   | /handballMatch<code>/filterBySeason/:season</code>                        |       ✖️       | returns handball matches that were played in specified season                                           |
|  GET   | /handballMatch<code>/filterByDate/:date</code>                            |       ✖️       | returns handball matches that were played on specified date                                             |
|  GET   | /handballMatch<code>/:id</code>                                           |       ✖️       | returns a handball match by specified id                                                                |
|  POST  | /handballMatch<code>/</code>                                              |       ✔️       | creates a new handball match                                                                            |
|  PUT   | /handballMatch<code>/:id</code>                                           |       ✔️       | updates a handball match with provided information                                                      |
| DELETE | /handballMatch<code>/:id</code>                                           |       ✔️       | deletes a handball match with the specified id                                                          |

---

### Handball stadiums 🏟️

| method | path                                                                                             | required login | description                                                                                                                                 |
| :----: | ------------------------------------------------------------------------------------------------ | :------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
|  GET   | /handballStadium<code>/</code>                                                                   |       ✖️       | returns all of the handball stadiums                                                                                                        |
|  GET   | /handballStadium<br><code>/filterBySeasonAndLocation/:season/:longitude/:latitude/:radius</code> |       ✖️       | returns handballs stadiums that are in the specifed season and aswell in radious distance from the point provided by longitude and latitude |
|  GET   | /handballStadium<code>/filterByLocation/:longitude/:latitude/:radius</code>                      |       ✖️       | returns handballs stadiums that are in radious distance from the point provided by longitude and latitude                                   |
|  GET   | /handballStadium<code>/filterBySeason/:season</code>                                             |       ✖️       | returns handball stadiums that were being in use for matches in specified season                                                            |
|  GET   | /handballStadium<code>/getByTeam/:id</code>                                                      |       ✖️       | returns handball stadiums that belongs to specified team                                                                                    |
|  GET   | /handballStadium<code>/:id</code>                                                                |       ✖️       | returns a handball stadium by specified id                                                                                                  |
|  POST  | /handballStadium<code>/</code>                                                                   |       ✔️       | creates a new handball stadium match                                                                                                        |
|  PUT   | /handballStadium<code>/:id</code>                                                                |       ✔️       | updates a handball stadium with provided information                                                                                        |
| DELETE | /handballStadium<code>/:id</code>                                                                |       ✔️       | deletes a handball stadium with the specified id                                                                                            |

---

### Handball standings 🏆

| method | path                                                               | required login | description                                                          |
| :----: | ------------------------------------------------------------------ | :------------: | -------------------------------------------------------------------- |
|  GET   | /handballStanding<code>/</code>                                    |       ✖️       | returns all of the handball standings through seasons                |
|  GET   | /handballStanding<code>/filterBySeasonAndTeam/:season/:team</code> |       ✖️       | returns handball standings for specified season and team             |
|  GET   | /handballStanding<code>/filterByTeamName/:teamName</code>          |       ✖️       | returns handball standings for a specified team name through seasons |
|  GET   | /handballStanding<code>/filterByTeam/:team</code>                  |       ✖️       | returns handball standings for a specified team id through seasons   |
|  GET   | /handballStanding<code>/:id</code>                                 |       ✖️       | returns a handball standing by specified id                          |
|  POST  | /handballStanding<code>/</code>                                    |       ✔️       | creates a new handball standing match                                |
|  PUT   | /handballStanding<code>/:id</code>                                 |       ✔️       | updates a handball standing with provided information                |
| DELETE | /handballStanding<code>/:id</code>                                 |       ✔️       | deletes a handball standing with the specified id                    |

---

### Handball teams 👕

| method | path                                              | required login | description                                        |
| :----: | ------------------------------------------------- | :------------: | -------------------------------------------------- |
|  GET   | /handballTeam<code>/</code>                       |       ✖️       | returns all of the handball teams through seasons  |
|  GET   | /handballTeam<code>/name</code>                   |       ✖️       | returns handball teams names                       |
|  GET   | /handballTeam<code>/name/:season</code>           |       ✖️       | returns handball teams names in a specified season |
|  GET   | /handballTeam<code>/filterBySeason/:season</code> |       ✖️       | returns handball teams for a specified specified   |
|  GET   | /handballTeam<code>/:id</code>                    |       ✖️       | returns a handball team by specified id            |
|  POST  | /handballTeam<code>/</code>                       |       ✔️       | creates a new handball team match                  |
|  PUT   | /handballTeam<code>/:id</code>                    |       ✔️       | updates a handball team with provided information  |
| DELETE | /handballTeam<code>/:id</code>                    |       ✔️       | deletes a handball team with the specified id      |

---

### Events 📃

| method | path                                                               | required login | description                                                                       |
| :----: | ------------------------------------------------------------------ | :------------: | --------------------------------------------------------------------------------- |
|  GET   | /events<code>/</code>                                              |       ✖️       | returns all of the events matches                                                 |
|  GET   | /events<code>/follow/:eventId</code>                               |       ✖️       | sets the following of the event in a toggle like fashion                          |
|  GET   | /events<code>/upcoming</code>                                      |       ✖️       | returns events that didn't happen yet                                             |
|  GET   | /events<code>/filterByHost/:hostId</code>                          |       ✖️       | returns events that are hosted by specified user (host)                           |
|  GET   | /events<code>/filterByLocation/:longitude/:latitude/:radius</code> |       ✖️       | returns events that in radious of the point with specified longitude and latitude |
|  GET   | /events<code>/filterByActivity/:activityName</code>                |       ✖️       | returns events with specified activity                                            |
|  GET   | /events<code>/filterByDate</code>                                  |       ✖️       | returns events that have specified date                                           |
|  GET   | /events<code>/:id</code>                                           |       ✖️       | returns an event by specified id                                                  |
|  POST  | /events<code>/</code>                                              |       ✔️       | creates a new event match                                                         |
|  PUT   | /events<code>/:id</code>                                           |       ✔️       | updates an event with provided information                                        |
| DELETE | /events<code>/:id</code>                                           |       ✔️       | deletes an event with the specified id                                            |

---

### Users 👤

| method | path                               | required login | description                                      |
| :----: | ---------------------------------- | :------------: | ------------------------------------------------ |
|  GET   | /users<code>/</code>               |       ✖️       | returns all of the users                         |
|  GET   | /users<code>/show/:id</code>       |       ✖️       | returns a user with specified id                 |
|  POST  | /users<code>/register</code>       |       ✖️       | creates a new user with provided information     |
|  POST  | /users<code>/login</code>          |       ✖️       | logs in the user and returns user with jwt token |
|  PUT   | /users<code>/profilePicture</code> |       ✔️       | sets the profile picture of the user             |
|  PUT   | /users<code>/update/:id</code>     |       ✔️       | updates a user with provided information         |
| DELETE | /users<code>/:id</code>            |       ✔️       | deletes a user with the specified id             |

---

### Admins 👷

| method | path                            | required login | required admin | description                                                                      |
| :----: | ------------------------------- | :------------: | :------------: | -------------------------------------------------------------------------------- |
|  GET   | /admins<code>/</code>           |       ✖️       |       ✔️       | returns all of the ids of users that are admins                                  |
|  GET   | /admins<code>/isAdmin</code>    |       ✖️       |       ✖️       | checks if the currently logged user is admin                                     |
|  POST  | /admins<code>/add/:id</code>    |       ✖️       |       ✔️       | adds a user specified by id to admins                                            |
|  GET   | /admins<code>/openGates</code>  |       ✖️       |       ✔️       | opens admin gates, when gates are opened every new user that registers is admin  |
|  GET   | /admins<code>/closeGates</code> |       ✔️       |       ✔️       | closes admin gates, when gates are opened every new user that registers is admin |
| DELETE | /admins<code>/remove/:id</code> |       ✔️       |       ✔️       | deletes a user with the specified id from admin list                             |

---

_This project started in April, 2024 by Tadej Teršek, Matija Pajenk and David Lipavec._
