# Kandoo

![image](https://i.imgur.com/GMPcGvB.jpg)

Welcome to the Collaborative Kanban Board App! This application is designed to help teams manage their projects and tasks using the popular Kanban board methodology. The app allows users to create boards, set up columns, and manage tasks collaboratively, making project tracking and teamwork efficient and organized.

## Features 

* <strong>User Authentication:</strong> Secure user authentication using Passport.js, enabling user account creation and login.
* <strong>Collaborative Boards:</strong> Users can create boards to represent their projects and invite team members to collaborate.
* <strong>Column Management:</strong> Within each board, users can define custom columns that represent different stages of their workflow.
* <strong>Task Tracking:</strong> Users can create tasks within columns, move tasks between columns, and update task statuses.
* <strong>Comment System:</strong> Users can add comments to tasks, facilitating communication and providing context.
* <strong>Persistence:</strong> MongoDB integration for data storage, ensuring that board configurations, tasks, and comments are saved across sessions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need to install the following dependencies to make this work: 

* Vite
* NodeJS
* DaisyUI
* ESLint
* npm (Node Package Manager)
* MongoDB


### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
$ Clone to your machine: 
git clone https://github.com/your-username/kanban-board-app.git
cd kanban-board-app

$ npm install

$ Include server port & connection in .env file
$ To start project: concurrently "cd server && npm run dev" "cd client && npm run dev"
```

## API Routes

The app provides the following API routes:

* GET /: Main route, serving basic app information.
* GET /boards: Get all boards.
* POST /boards: Create a new board.
* GET /boards/:boardId: Get details of a specific board.
* PUT /boards/:boardId: Update a specific board.
* DELETE /boards/:boardId: Delete a specific board.
* Other routes as needed for columns, tasks, and comments.

For detailed information on each route's functionalities and parameters, refer to the source code and API documentation.


## Contributors

Kandoo was built by the international development group, SnowballDevs. Contributors are as follows:

* https://github.com/mjbramich
* https://github.com/IntelliJinceTech
* https://github.com/isomer04
* https://github.com/AitchGrasso
* https://github.com/Michelle-932

## Attribution & License

Kandoo is licensed under the MIT License.