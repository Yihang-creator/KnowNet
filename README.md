# Project README

## Project Description

Our project is a social platform targeted towards students who want to connect with peers, share experiences, engage in discussions, and expand their networks. This platform will facilitate essential human activities of socializing and information exchange by providing features such as posting, editing, deleting, and viewing content, as well as enabling comments, and supporting user reactions.

The platform will store various types of data, including posts containing text, images, and videos, comments on these posts, and user profile information. Users can interact with this data in several ways - they can create, edit, and delete their posts, leave likes on others' posts, and send direct messages to other users. 

Additional features such as various channels (post groups) and user groups, a marketplace, shared video-viewing rooms, interactive videos can be integrated into the platform given sufficient time and resources. 

## Project Task Requirements:

### Minimal Requirements

1. Users are able to register, sign in and sign out.
2. Users are able to add connections and send private messages to their connections.
3. Users are able to create, update, delete and view their posts.
4. Users are able to search for posts by keywords or tags.
5. Users are able to edit their profile once their accounts are created.

### Standard Requirements

1. Users are able to create a collection of contents that they like.
2. Users are able to attach videos to their posts.
3. Share a user profile or some contents to other social media.
4. Users can block contents based on tags.
5. Users can create channels and select which channels a post belongs to. These channels will act as unique spaces for users to share and discuss content related to specific topics.

### Stretch Requirements

1. Build a recommendation engine for post recommendation.
2. Users can create a room and invite their friends to watch the same video and interact with each other.

## Task Breakdown:

### Users are able to register, sign in and sign out:

1. Use Mongoose to link MongoDB with backend objects and create a MongoDB database in MongoDB Atlas.
2. Build a sign-in webpage.
3. Integrate Okta SDK for authentication to allow users to sign up with email/phone/account+password, login, log out.
4. Deploy our front-end, back-end to a deployment platform (e.g., Vercel, Render, Cyclic, Railway, Deta, fly.io, Nextify).
5. Establish the general structure of front-end and backend project.

### Users are able to create, update, delete and view their posts:

1. Design schema of users (and potentially post, tag) (include a list of friends' id as a field in the user schema) and link schemas with MongoDB instances.
2. Develop a user-friendly UX and UI for post management.
3. Develop CRUD API endpoints for post management.
4. Generate test data for posts.
5. Write front-end code to make API calls to backend to retrieve data.
