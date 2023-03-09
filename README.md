## Twitter Clone

This is a basic clone of Twitter to try out version 13.2 of [Next.js](https://nextjs.org/) and to learn more about the latest FE frameworks. Users can authenticate with Google to create Tweets, create replies to Tweets and search tweets.

It is deployed with [Vercel](https://vercel.com/) to https://next-js-twitter-clone-five.vercel.app

It uses:
* [Prisma](https://www.prisma.io/) for ORM
* [Railway](https://railway.app/) for hosted PostgresSQL DB
* [NextAuth](https://next-auth.js.org/) for authentication with Google
* [Tailwindcss](https://tailwindcss.com/) for CSS framework
* [Axios](https://axios-http.com/) and [React-Query](https://react-query-v3.tanstack.com/)

Todo:
* Remove React-Query and Axios for built in cache and fetch.
* Add state management
* I'm fairly new to typescript and had a few errors in the api routes which i worked around by changing back to js

# References
* https://beta.nextjs.org/docs
* https://sailboatui.com/
* https://www.youtube.com/@developedbyed