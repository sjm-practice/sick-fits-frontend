# Advanced-React

Coding along with Wes Bos' [Advanced React Tutorial.](https://advancedreact.com/)

## Tech Stack
* Front end framework: React, Next.js (ssr, routing), Styled Components
* Front end GraphQL client: React Apollo, Apollo Client
* Back end GraphQL Server: GraphQL Yoga (express, apollo-server)
* Back end GraphQL Database: Prisma

## Notes
* Video 14 - Items Creation and Prisma Yoga Flow, is a good reference for setting up new data items (graphql and database)
  - **datamodel.graphql:** file we create / maintain to define data model for prisma db
    + run deploy after making any changes
  - **prisma.graphql:** a file generated by prisma, is retrieved by the post deploy hook when datamodel.graphql is deployed to prisma (see package.json deploy script)
    + describes the prisma API for this data
  - **schema.graphql:** file we create / maintain to define the public facing API
* GraphQL workflow
  - create mutation or query in schema.graphql
  - create the resolver in Mutation.js or Query.js
  - define gql mutation or query in component
* using cookie to store logged in user (JWT - json web token) instead of local storage, because that better supports SSR
* in Signup component, Form component method is set to post, which prevents the password from showing up in the url in error conditions (default method is get, which would)
* Apollo - Optimistic Response: Apollo provides an optimistic response feature, which allows the developer to provide an expected response from the server mutation
  - this causes the update method to be called twice. once immediately, using the value in optimisticResponse for payload. then called a second time, when the actual server response is received (which uses the actual payload value)

## Cool Packages / Components
* Downshift
* Stripe / StripeCheckout
* lodash debounce
* format-dns -does date formatting, similar to moment.js plus some other stuff (treeshaking?)
  
## Deployment Notes
* Three things to deploy
  * Primsa Server [Mysql]
  * Yoga Server [node backend: Mutation & Query Resolvers]
  * React App [node / next.js, frontend]

#### Deployment Steps
* set up prisma server first
  * start at app.prisma.io (add server)
    * takes you through steps and logging in to Heroku
    * choose Postgres for DB
  * once set up, then deploy prisma to heroku using deploy:heroku script
* set up yoga server (this is our node backend)
  * create and deploy to heroku (used heroku cli - see video #66)
    * need to add .env values to heroku, via app settings
  * deploy to now
    * install npm now global
    * use now cli to deploy (very simple, see now docs how to use a .env file)
      * https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/
* TROUBLESHOOTING
  * ran in to a cors issue (between heroku front end and back end)
    * make sure the FRONTEND_URL config setting does not have the '/' on the end

## Course Topics

### Introduction and Setup
1. Editor Setup and Starter Files Installation
2. Sick Fits and the Tech Stack Behind It
3. An Intro to Next.js, Tooling and Routing
4. Custom _app.js Layout

### CSS and Styled Components
5. An Intro to Styled Components
6. Themes and Layout with Styled Components
7. Global Styling and Typography with Styled Components
8. Visualizing Route Changes
9. Fixing Styled Components Flicker on Server Render

### Server Side GraphQL
10. An intro to GraphQL
11. Getting Setup with Prisma
12. Getting our GraphQL Yoga Server Running
13. Our first Query and Mutation
14. Items Creation and Prisma Yoga Flow

### Client Side GraphQL
15. Setting Up Apollo Client with React
16. React Meets GraphQL
17. Creating Items with Mutations
18. Uploading Images
19. Updating Items with Queries and Mutations
20. Deleting Items
21. Displaying Single Items
22. Pagination
23. Pagination and Cache Invalidation

### Accounts, Authentication and Permissions
24. User Signup and Permission Flow
25. User Signup in React
26. Currently Logged In User with Middleware and Render Props
27. Sign in Form and Custom Error Handling
28. Sign Out Button
29. Backend Password Reset Flow
30. Frontend Password Reset Flow
31. Sending Email
32. Data Relationships
33. Creating a Gated Sign In Component
34. Permissions Management
35. Updating Permissions in Local State
36. Updating Permissions on the Server
37. Locking Down DeleteItem Permissions

### Shopping Cart
38. Creating our cart in React
39. Apollo Local State Queries and Mutations
40. Server Side Add To Cart
41. Displaying Cart Items and Totals
42. Removing Cart Items
43. Optimistic Response && Cache Updates with Apollo
44. Animating our Cart Count Component
45. Dealing with Deleted Items in CartItems

### Advanced UI and Code Quality
46. Cleaning Up This Render Prop Mess
47. Search Dropdown Autocomplete
48. Autocomplete with Downshift

### Credit Card Checkout
49. Credit Card Processing with Stripe Checkout
50. Charging Cards on the Server Side
51. Saving Orders to the Database
52. Displaying Single Orders
53. Orders Page

### Testing
54. Testing with Jest and Enzyme Introduction
55. Unit Testing 101
56. Mocking 101
57. First Tests and Shallow Rendering
58. Snapshot Testing
59. Testing and Mocking Apollo Queries
60. More Apollo Query Testing
61. Testing Pagination
62. Testing Mutations
63. More Apollo Client Mutation Testing
64. Testing our Cart
65. Testing Order Components

### Deployment
66. Deploying a Prisma Server to Heroku
67. Deploying Yoga Server to Heroku or Now
68. Deploying Frontend to Heroku and Now
