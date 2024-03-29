# Project README

## Project High-level Description

Our project is a social media platform targeted towards students who want to connect with peers, share experiences, engage in discussions, and expand their networks. This platform offers essential socializing activities, including posting, editing, deleting, and viewing posts with images/videos, along with features like comments and likes. Users can access their uploaded posts, curated collections, follow others and engage in private chat. To enhance user engagement both within the platform and among users, we introduce innovative features such as interactive videos resembling Netflix's Black Mirror: Bandersnatch. Additionally, our video room feature allows multiple users to watch video together, furthen strengthening interactions within the community.

## A note on signing up:

We utilize Okta's services for authentication and user identification in our app. When registering, Okta sends an email verification link. Upon clicking, you're directed to Okta's page and must manually return to our site to sign in. Ideally, we'd have Okta auto-redirect to our page, but due to Okta Auth being an enterprise solution, this feature is too expensive. Note: This doesn't impact the sign-in process.

### Minimal Requirements

1. [x] Users are able to register, sign in and sign out.
2. [x] Users are able to add connections and send private messages to their connections.
3. [x] Users are able to create, update, delete and view their own posts.
4. [x] Users are able to search for posts by keywords or tags.
5. [x] Users are able to edit their profile once their accounts are created.

### Standard Requirements

1. [x] Users are able to create a collection of contents that they like.
2. [x] Users are able to attach videos to their posts.
3. [x] Share a user profile or some contents to other social media.
4. [x] Users can block contents based on tags.
5. [x] Users are able to upload interactive videos, watch them, and interact with videos by choosing customized options.

### Stretch Requirements

1. [ ] Build a recommendation engine for post recommendation.
2. [x] Users can create a room and invite their friends to watch the same video and interact with each other.

## Technology:

### Unit 1 - HTML, CSS, JS

HTML is used by leveraging the JSX. For the CSS, instead of creating separate CSS files for styling, we adopted MaterialUI,
in this way, styling adjustments can be made directly through JSX tags, or using Tailwind CSS.
For JS, JavaScript is used throughout our frontend and backend to fulfill our application needs.

### Unit 2 - React & Redux

Throughout our frontend, we heavily employed the React.js framework to develop highly modular UI components.
These components are designed to capture and manage user inputs using React hooks,
and we adhere to best practices like abstraction to minimize code redundancy and complexity.
For managing our frontend data architecture, we integrated Redux. Also, we utilize useContext react hook,
which allows us to access global data without using redux and actions, ensuring a centralized data source.

### Unit 3 - Node & Express

We leveraged the Express.js framework for our backend operations,
channeling API requests to our backend services powered by Node.js, arranging API with different identifiers,
achieving clear responsibility for each task.
This setup processes data from the frontend, saving it to our MongoDB server when required.
Also, we use S3 bucket to store user-uploaded images and videos.

### Unit 4 - MongoDB

We employed a NoSQL database via MongoDB to retain application data across sessions,
executing NoSQL queries on our backend to fetch pertinent data.
Our database houses five primary collections: 'Post', 'chats', 'comments', 'messages', and 'users'.
Each document within these collections adheres to a schema defined in our backend using mongoose.

### Unit 5 - Builds and Deployment

Our web app is hosted on Heroku. By linking the app to our GitHub repository, while setting up Continuous Deployment.
This ensures that any commits made to the code-review branch on GitHub are automatically rolled out to our app on Heroku.

<!-- ### Users are able to register, sign in and sign out:

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
5. Write front-end code to make API calls to backend to retrieve data. -->

## Above and Beyond Functionality

### AWS S3 and CloudFront

We leverage presigned URLs to securely upload images and videos directly to an AWS S3 bucket. To ensure fast and efficient access, we set up an AWS CloudFront distribution for low-latency content delivery of these media files to users.

### Socket.io

With Socket.io, we implemented real-time chat and video synchronization functionalities. These features allow users to exchange private messages and join video rooms where they can simultaneously watch videos and engage in group chats.

### Interactive Video

Our online tree editor tool, powered by the react-d3-tree library, facilitates the upload and editing of interactive videos. As users watch, they can make choices and interact with the video content in real-time.

### OKTA SDK Authentication and Authorization

We've integrated OKTA SDK for robust frontend authentication and backend authorization. If not logged in, users are redirected to Okta's login page, regardless of their current page. All backend APIs are protected: only those with valid access tokens can interact with the API endpoints.

### Infinite Scrolling and Lazy loading

Through React's useMemo hook and memo components, we minimized unnecessary re-renders, enhancing performance. Our main page is optimized for user experience: rather than loading all posts at once, it uses infinite scrolling, loading more content as the user scrolls down.

### Dark Mode

To enhance the user experience throughout the day, our app automatically switches between light and dark modes based on the mode detected from the user's device, ensuring an optimal experience at all times.

### Optimized user experience

We utilized tooltips and snackbars to guide users to play with our websites. We also provide a "copy to clipboard" button for users to share a video roomId more conveniently.

## Next Steps

### Recommendation Engine

Develop a recommendation engine for our app to suggest tailored content for each user. The personalized content will be based on posts the user has interacted with, as well as those they have liked and commented on. To construct this recommendation engine, we will utilize an existing recommendation framework and customize it to better fit our app.

### Better Search Algorithm

Currently, our search function retrieves text from the search bar and checks for exact keyword matches in posts. We've recognized that this approach may overlook related posts. Consequently, we intend to enhance our search algorithm from mere substring matching to a more sophisticated fuzzy search.

### Accessibility

We're committed to enhancing KnowNet's accessibility, allowing a broader audience to engage with our knowledge-sharing platform. Soon, we'll implement semantic HTML for better screen reader guidance and offer descriptive alt-text for images. Multimedia will be accompanied by video captions and audio transcripts. Our focus will also be on clear form labeling, frequent screen reader testing, accommodating color-blind users, and optimizing touch target sizes for mobile. Our goal is to achieve WCAG 2.1 Level AA compliance and actively seek user feedback regarding accessibility.

## List of Contributions:

### Yihang He (h7y2b)
Here are the list of features I led: OKTA SDK Integration(frontend authentication and backend authorization), Post creation/viewing, Video Room, Interactive Video. I also participated in optimizing, testing,  debugging and helping my teammates.

### Hanze Wang (o7c8d)
I implemented all the functionalities in the comment board. A user could add comments, like comments and reply to comments under every post. Also, I enabled that a user could go to other users’ pages, follow or unfollow them, check their information, and send a direct message to them. Additionally, I helped my teammates to improve their UI by using Mui and fixed some bugs like updating all the posts data in MongoDb after the user updated their information.

### Yingquan Wang (d7u2x)
I implemented and designed the following features: The layout of post preview cards. The "like" and "cancel like" function for posts with corresponding redux components. The mongoose schema of comments, users, and posts. All the features related to "tags" for our application, including adding tags, searching posts based on tags, blocking posts with tags. I also helped my teammates with debugging, optimizing, and improving user experience.

### Kunyi Wang (t5h6p)
List of my implemented and designed features: The mainpage which utilizes the preview card of posts, search bar and also functionality bars. Other than that, I help my teammates deal with issues when integrating the frontend and the backend, such as deleting posts，synchronizing user information and post contents. At the end of the project, I help with my teammates to test the functionalities and debug.

### Chendong Luo (t5a3b)
Here is the list of features for which I took the leadership: Real-time socket chat center (including both frontend and backend implementation), user data schema, user APIs (including user creation, user fetching, and user information editing), and following and follower APIs with corresponding Redux. Other than that, I also participated in creating a UI prototype for the user profile page and continuously improving UI, debugging, testing, and helping my teammates fix issues.


## Prototypes

1. Sign-in Page:
   ![sign-in Page](https://user-images.githubusercontent.com/99515001/258669743-ca17a245-0358-435a-ba96-8ab7bf6aefc0.png)
2. Post-viewing page
   ![Post-viewing page](https://user-images.githubusercontent.com/99515001/258669750-e2dc043f-e1c5-45f2-9d49-129910ea2a07.png)
