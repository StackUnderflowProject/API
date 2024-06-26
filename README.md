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

---

_This project started in April, 2024 by Tadej Teršek, Matija Pajenk and David Lipavec._
