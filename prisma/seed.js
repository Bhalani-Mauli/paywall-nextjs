import { PrismaClient } from "../src/app/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "Introduction to Web Development",
        description:
          "Learn the basics of HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development.",
        isPremium: false,
        isPublished: true,
        lessons: {
          create: [
            {
              title: "Getting Started with HTML",
              description:
                "Learn the fundamentals of HTML and create your first webpage.",
              order: 1,
              duration: 1200, // 20 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "CSS Styling Basics",
              description:
                "Style your HTML with CSS and make your pages look beautiful.",
              order: 2,
              duration: 1800, // 30 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "JavaScript Fundamentals",
              description:
                "Add interactivity to your websites with JavaScript.",
              order: 3,
              duration: 2400, // 40 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          ],
        },
      },
    }),

    prisma.course.create({
      data: {
        title: "Advanced React Development",
        description:
          "Master React with hooks, context, and advanced patterns. Build professional-grade applications.",
        isPremium: true,
        isPublished: true,
        lessons: {
          create: [
            {
              title: "React Hooks Deep Dive",
              description: "Master useState, useEffect, and custom hooks.",
              order: 1,
              duration: 3000, // 50 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Context API and State Management",
              description: "Learn to manage global state with Context API.",
              order: 2,
              duration: 2700, // 45 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Performance Optimization",
              description: "Optimize your React apps for better performance.",
              order: 3,
              duration: 3600, // 60 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Testing React Applications",
              description:
                "Write comprehensive tests for your React components.",
              order: 4,
              duration: 4200, // 70 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          ],
        },
      },
    }),

    prisma.course.create({
      data: {
        title: "Full-Stack TypeScript",
        description:
          "Build end-to-end applications with TypeScript, Node.js, and modern frameworks.",
        isPremium: true,
        isPublished: true,
        lessons: {
          create: [
            {
              title: "TypeScript Fundamentals",
              description: "Learn TypeScript basics and type system.",
              order: 1,
              duration: 2400, // 40 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Advanced TypeScript Types",
              description:
                "Master generics, utility types, and advanced patterns.",
              order: 2,
              duration: 3600, // 60 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Node.js with TypeScript",
              description: "Build server-side applications with TypeScript.",
              order: 3,
              duration: 4500, // 75 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Database Integration",
              description: "Connect to databases using TypeORM and Prisma.",
              order: 4,
              duration: 3900, // 65 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "API Development & Testing",
              description: "Build and test RESTful APIs with TypeScript.",
              order: 5,
              duration: 4800, // 80 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          ],
        },
      },
    }),

    prisma.course.create({
      data: {
        title: "Python for Data Science",
        description:
          "Learn Python programming for data analysis, visualization, and machine learning.",
        isPremium: true,
        isPublished: true,
        lessons: {
          create: [
            {
              title: "Python Basics for Data Science",
              description: "Essential Python concepts for data analysis.",
              order: 1,
              duration: 2100, // 35 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "NumPy and Pandas",
              description: "Data manipulation with NumPy and Pandas libraries.",
              order: 2,
              duration: 3300, // 55 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Data Visualization",
              description:
                "Create beautiful charts with Matplotlib and Seaborn.",
              order: 3,
              duration: 2700, // 45 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Machine Learning Basics",
              description:
                "Introduction to machine learning with Scikit-learn.",
              order: 4,
              duration: 4200, // 70 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          ],
        },
      },
    }),

    prisma.course.create({
      data: {
        title: "Mobile App Development with React Native",
        description:
          "Build cross-platform mobile apps using React Native and Expo.",
        isPremium: true,
        isPublished: true,
        lessons: {
          create: [
            {
              title: "React Native Setup",
              description:
                "Set up your development environment for React Native.",
              order: 1,
              duration: 1800, // 30 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Navigation and Routing",
              description: "Implement navigation in React Native apps.",
              order: 2,
              duration: 3000, // 50 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Native Device Features",
              description:
                "Access camera, location, and other device features.",
              order: 3,
              duration: 3600, // 60 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "App Store Deployment",
              description: "Deploy your app to iOS App Store and Google Play.",
              order: 4,
              duration: 2400, // 40 minutes
              isPremium: true,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          ],
        },
      },
    }),

    prisma.course.create({
      data: {
        title: "Digital Marketing Fundamentals",
        description:
          "Learn essential digital marketing strategies including SEO, social media, and content marketing.",
        isPremium: false,
        isPublished: true,
        lessons: {
          create: [
            {
              title: "Introduction to Digital Marketing",
              description:
                "Overview of digital marketing landscape and strategies.",
              order: 1,
              duration: 1500, // 25 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "SEO Basics",
              description: "Search engine optimization fundamentals.",
              order: 2,
              duration: 2100, // 35 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Social Media Marketing",
              description: "Leverage social platforms for business growth.",
              order: 3,
              duration: 1800, // 30 minutes
              isPremium: false,
              isPublished: true,
              videoUrl:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          ],
        },
      },
    }),
  ]);

  console.log("Created courses:", courses.length);
  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
