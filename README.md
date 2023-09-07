# vercel link :- https://oru-assignment.vercel.app/
# username:- test1 
# password :- test
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started with frontend

First open client, run the development server:

```bash
npm i

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## for Backend 

First open api , run ``` npm i ``` in the terminal

Second create ```.env``` file and write the below code in it
```
MONGO_URL = "write mongo url here"

JWT_SECRET="make jwt secret here" 

CLIENT_URL="http://localhost:3000/"
```
Now in api run :

```bash
npm start
# or
nodemon index.js
```
and the backend server will be started  on localhost 

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:5000/test](http://localhost:5000/test). This endpoint can be edited in `api/index.js`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
