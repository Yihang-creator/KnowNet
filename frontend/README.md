# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set Up React Project locally

create ".env.local" file under frontend folder, fill in the file with the following in this confluence doc https://project455.atlassian.net/wiki/spaces/~637faa232acfad92d7b15b07/pages/2326529/.env.local

## Start local mock server

run this command `npm run json-server` under `frontend` folder. You can start the mock server behind any port by changing 8080 to the port you want.
You can modify the mock data for your own use.
public video test data can be accessed via https://gist.github.com/jsturgis/3b19447b304616f18657

json-server automatically provides http endpoints for each resource defined in db.json

GET /posts: returns a list of all posts.
GET /posts/{id}: returns the post with the specified ID.
POST /posts: creates a new post.
PUT /posts/{id}: updates the post with the specified ID.
PATCH /posts/{id}: partially updates the post with the specified ID.
DELETE /posts/{id}: deletes the post with the specified ID.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
