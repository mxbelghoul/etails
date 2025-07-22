# Event Management Platform

This is a full-stack web application that allows users to publish, browse, and manage events.

## Features

- User registration and login
- User dashboard to add, edit, or delete events
- Events have a title, description, date, time, location, and images
- Events are organized into categories
- Main page with featured events, recent events, and search/filter functionality
- Admin panel to manage categories and approve events

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Installation

1. Clone the repository
2. Install server dependencies: `cd server && npm install`
3. Install client dependencies: `cd client && npm install`
4. Create a `.env` file in the `server` directory with the following variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JSON Web Token secret
5. Start the server: `cd server && npm start`
6. Start the client: `cd client && npm start`

## Running the App Locally

To run the app locally, you will need to have Node.js and MongoDB installed.

1. Start the server: `cd server && npm start`
2. Start the client: `cd client && npm start`
3. Open your browser and navigate to `http://localhost:3000`

## Testing

The backend tests are not currently running. This is a known issue that needs to be addressed. To run the tests, navigate to the `server` directory and run `npm test`.
