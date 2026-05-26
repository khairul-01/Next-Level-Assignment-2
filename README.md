# DevPulse - Backend Application, Assignment two
It's a internal track issue and feature tracker which is a collaborative platform for software teams to report bugs, suggest features, and coordinate resolution

#### Live URL: https://next-level-assignment-2-mu.vercel.app

### Feature
It's an authenticated backend server system where only verified user can access data. It has also role-based authorization system. Two roles - contributor and maintainer, each role has different permission. Such as, only maintainer can delete any issue.

## Technology stack
These following technologies are used for this backend - server side application.
- Node.js - A JavaScript runtime environment to run JavaScript on the server side, outside of a web browser.
- TypeScript - A superset of JavaScript that adds static typing and additional syntax to improve code quality, scalability, and maintainability.
- Express.js - A node.js application framework, simplifies server-side application development
- PostgreSQL - Open source object-relational database management system that combine SQL based relational capabilities with advanced object-oriented feature.
- Raw SQL - Writing and executing SQL query with ***pool.query()*** calls
- bcrypt - Password hashing function designed securely hash passwords.
- jsonwebtoken - Primarily used for JWT generation, authentication and information exchange.
- Vercel - A cloud platform that simplifies the deployment.

### Setup steps
Fist setup basic node, express, typescript and configure package.json and tsconfig.json. Then connected with neon db database and created two table *users* and *issues* with raw sql. Then setup middleware, globalError handler, types interface, authentication and authorization system with jwt token and cookies to verify user with signup and login api. And finally created 5 issue api with authorization for authenticated users.

### API endpoint list
- POST: /api/auth/signup
- POST: /api/auth/login
- POST: /api/issues
- GET: /api/issues?sort=newest
- GET: /api/issues/:id
- PATCH: /api/issues/:id
- DELETE: /api/issues/:id (maintainer only)

### Database schema
There are two relational database table, one is users table another is issues table. Two tables are references with one to many connection by user(id) of users and reporter_id of issues.