# NBA Players Index

This repository contains both the backend and frontend code for the NBA Players Index application. The application allows users to browse NBA players, view detailed information, and manage a list of favorite players.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Backend Installation](#backend-installation)
    - [Frontend Installation](#frontend-installation)
- [Running the Application](#running-the-application)
    - [Running the Backend](#running-the-backend)
    - [Running the Frontend](#running-the-frontend)
- [Notes and Improvements](#notes-and-improvements)
- [Known Issues](#known-issues)
- [License](#license)

## Introduction

The NBA Players Index is a full-stack web application that provides a comprehensive list of NBA players fetched from the [balldontlie](https://www.balldontlie.io/) API. Users can search for players, view detailed stats, and manage a favorites list.

## Features

- **Player Browsing:** View a list of NBA players with search functionality.
- **Player Details:** Click on a player to see detailed information and season stats.
- **Favorites Management:** Add or remove players from your favorites list.
- **Responsive Design:** Optimized for both desktop and mobile views.

## Technologies Used

- **Backend:**
    - Node.js
    - Express.js
    - TypeScript
- **Frontend:**
    - React
    - Redux Toolkit
    - TypeScript
- **Others:**
    - Axios for API requests
    - SCSS for styling

## Installation

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Git** installed to clone the repository.

### Backend Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd nba-players-index/backend
   ```
Install Dependencies:

    npm install

Environment Variables:

Create a .env file in the backend directory.

Add the following environment variables:

```env
PORT=3000
BALLDONTLIE_API_KEY=YOUR_API_KEY_HERE
```
Frontend Installation

Navigate to the Frontend Directory:

```bash
cd ../frontend
```
Install Dependencies:

```bash
npm install
```
Environment Variables:

For this assignment, the frontend does not require environment variables.
In a production environment, configurations like API endpoints should be managed using a .env file and the dotenv package.

## Running the Application

Running the Backend
Start the Server:

In the backend directory, run:

```bash
npm run dev
```
This will start the server in development mode using nodemon.

Server Availability:

The backend server will be running at http://localhost:3000.
Running the Frontend
Start the React App:

In the frontend directory, run:

```bash
npm start
```
Application Availability:

The frontend application will be available at http://localhost:3000.
Note: Ensure the backend server is running on a different port (configured as 3000 in the backend .env file) to avoid conflicts.

 ## Notes and Improvements
Mocked Services:

To simplify the setup and execution, I mocked the functionalities of Redis (for caching) and Postgres (for database operations) in the backend. The in-memory cache and an array for favorites simulate these services without requiring additional infrastructure.

Testing:

Due to time constraints, I didn't have the opportunity to write tests for both the backend and frontend. Given more time, I would have added unit and integration tests using Jest, Supertest, and React Testing Library to improve code reliability and catch potential bugs.

Performance Enhancements:

Implementing react-window or a similar virtualization library on the frontend would significantly improve performance when rendering long lists of players.
Utilizing dotenv for managing environment variables on the frontend would allow for easier configuration and better security practices.

Code Formatting and Linting:

I chose not to include Prettier and ESLint configurations to avoid potential issues when delivering the code as a small project. In a larger project, integrating these tools would help maintain consistent code style and catch common errors.

UI/UX Improvements:

With more time, I would refine the user interface to make it more visually appealing and user-friendly.
Implementing better error handling and loading states would enhance the overall user experience.

Backend Enhancements:

Integrating a real database like PostgreSQL for persistent data storage.
Using Redis for caching to enable distributed caching and better performance in a production environment.
Adding API documentation using tools like Swagger for better developer experience.

### Known Issues
Player Stats Retrieval:

I encountered issues retrieving player stats from the balldontlie API. Running example curl commands returned no data, which affected the stats functionality in the application.
This issue seems to be a limitation or bug in the external API, and I couldn't resolve it within the project timeframe.
