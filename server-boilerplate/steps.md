1. tsconfig generator.
   -> npx tsconfig.json.
2. Update all packages or our server.
   -> yarn upgrade-interactive --latest
3. Update ormconfig.json with postgreSQL config.
   -> Create a jwt-auth database in postgreSQL
4. Install server's packages (Express, Apollo, GraphQL).
   -> yarn add express apollo-server-express graphql
   4.1. we add server's packages dev dependency
   -> yarn add -D @types/node @types/graphql
   -> yarn add -D @types/express yarn add @types/graphql
5. Install typeGraphQL to not develop duplicated stuff.
   -> yarn add type-graphql
6. Install bcrypt to encrypt the password when the user get regsitered.
   -> yarn add bcryptjs
   -> yarn add -D @types/bcryptjs
7. Install library that we can create and validate JWT's.
   -> yarn add jsonwebtoken
   -> yarn add -D @types/jsonwebtoken

8. Install package to handle enviorement varieble.
   -> yarn add dotenv
9. Install package to handle cookies.
   -> yarn add cookie-parser
   -> yarn add -D @types/cookie-parser
