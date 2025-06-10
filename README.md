# Paywall Nextjs

This repo is a nextjs repo which is a udemy like learning site for learning purpose. I am using nextjs 15. You can check branch and proper commit history. This project uses prisma and sqlite.

**Features:**

- Login/Signup
- Home page
- Dashboard page
- Courses page
- Course details page
- Payment model.
- Subscription page

**Backend Apis**

- /auth/login
- /auth/signup
- /auth/logout
- /api/courses
- /api/courses/[id]
- /api/progress/course
- /api/subscription/upgrade
- /api/user/profile

## Getting Started

- Install the dependencies `npm install`
- Run the code : `npm run dev`
- To build run : `npm run build`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Future improvements

- Add unit test cases and e2e test cases
- Create API for course progress and lesson progress. (currently using mock, as this is not the highlight i have developed in in the hack mode.)
- Have content served from backend a video from s3 url.
- Using prisma with dev mode on sqlite , ideally we can use real database and not commit dev files with data.
- Integrate real payment gateway like stripe. (currently it's mock.)
- Deployment on vercel or on AWS
- Improve code quality.

# Prisma

- To init prisma for the very first time I have used `npx prisma init --datasource-provider sqlite`
- I have also added `DATABASE_URL="file:./dev.db"` in .env file
- I have create sql lite database by running `npx prisma migrate dev --name init`

**Whenever you change something in schema.prisma**
Please run:
`npx prisma migrate dev --name add-user-table` (change reason as needed)
`npx prisma db push` (to apply migration to database)

**Feed data into database**

- I have created seed.js file to add data to database so that for development purpose we can use it.
  `yarn seed-dev` or `npm run seed-dev`

**Reset database and seed data**

- `npx prisma migrate reset` (this will recreate schema so data will be lost.)
