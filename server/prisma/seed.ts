import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
/// <reference types="node" />
declare const process: {
  exit(code?: number): never;
};
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Nettoyer la base de données
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.roadmapStep.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.challengeAttempt.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleaned');

  // Créer des utilisateurs de test
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'johndoe',
      password: hashedPassword,
      fullName: 'John Doe',
      bio: 'Passionate developer and lifelong learner',
      xp: 1250,
      level: 5,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      username: 'janesmit',
      password: hashedPassword,
      fullName: 'Jane Smith',
      bio: 'Frontend enthusiast',
      xp: 850,
      level: 3,
    },
  });

  console.log('✅ Users created');

  // Créer des cours
  const htmlCourse = await prisma.course.create({
    data: {
      title: 'HTML Fundamentals',
      description: 'Learn the basics of HTML and web structure',
      language: 'html',
      difficulty: 'beginner',
      xpReward: 500,
      order: 1,
      isPublished: true,
    },
  });

  const jsCourse = await prisma.course.create({
    data: {
      title: 'JavaScript Basics',
      description: 'Master the fundamentals of JavaScript',
      language: 'javascript',
      difficulty: 'beginner',
      xpReward: 750,
      order: 2,
      isPublished: true,
    },
  });

  const pythonCourse = await prisma.course.create({
    data: {
      title: 'Python for Beginners',
      description: 'Start your programming journey with Python',
      language: 'python',
      difficulty: 'beginner',
      xpReward: 800,
      order: 3,
      isPublished: true,
    },
  });

  console.log('✅ Courses created');

  // Créer des leçons pour HTML
  await prisma.lesson.createMany({
    data: [
      {
        courseId: htmlCourse.id,
        title: 'Introduction to HTML',
        description: 'Learn what HTML is and why it matters',
        content: '# Introduction to HTML\n\nHTML (HyperText Markup Language) is the standard markup language for creating web pages...',
        code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>',
        solution: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n    <p>Welcome to HTML!</p>\n  </body>\n</html>',
        hints: ['Start with DOCTYPE', 'Don\'t forget to close tags', 'Use semantic HTML'],
        xpReward: 50,
        order: 1,
      },
      {
        courseId: htmlCourse.id,
        title: 'HTML Tags and Elements',
        description: 'Understand the basic HTML tags',
        content: '# HTML Tags\n\nHTML uses tags to structure content. Tags usually come in pairs...',
        code: '<h1></h1>\n<p></p>\n<a href=""></a>',
        solution: '<h1>My Heading</h1>\n<p>My paragraph</p>\n<a href="https://example.com">Link</a>',
        hints: ['Headings go from h1 to h6', 'Paragraphs use <p> tags', 'Links need href attribute'],
        xpReward: 50,
        order: 2,
      },
    ],
  });

  // Créer des leçons pour JavaScript
  await prisma.lesson.createMany({
    data: [
      {
        courseId: jsCourse.id,
        title: 'Variables and Data Types',
        description: 'Learn about JavaScript variables',
        content: '# Variables in JavaScript\n\nVariables are containers for storing data values...',
        code: 'let name = "";\nconst age = 0;\nvar city = "";',
        solution: 'let name = "John";\nconst age = 25;\nvar city = "Paris";',
        hints: ['Use let for variables that change', 'Use const for constants', 'Choose descriptive names'],
        xpReward: 75,
        order: 1,
      },
      {
        courseId: jsCourse.id,
        title: 'Functions',
        description: 'Master JavaScript functions',
        content: '# Functions\n\nFunctions are reusable blocks of code...',
        code: 'function greet() {\n  // Your code here\n}',
        solution: 'function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));',
        hints: ['Functions can take parameters', 'Use return to output values', 'Call the function to execute it'],
        xpReward: 75,
        order: 2,
      },
    ],
  });

  console.log('✅ Lessons created');

  // Créer des achievements
  await prisma.achievement.createMany({
    data: [
      {
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎯',
        xpRequired: 50,
        category: 'beginner',
      },
      {
        title: 'Fast Learner',
        description: 'Complete 5 lessons in one day',
        icon: '⚡',
        xpRequired: 250,
        category: 'speed',
      },
      {
        title: 'Code Master',
        description: 'Reach 1000 XP',
        icon: '👑',
        xpRequired: 1000,
        category: 'milestone',
      },
      {
        title: 'Challenge Champion',
        description: 'Complete 10 challenges',
        icon: '🏆',
        xpRequired: 500,
        category: 'challenge',
      },
    ],
  });

  console.log('✅ Achievements created');

  // Créer des challenges
  await prisma.challenge.createMany({
    data: [
      {
        title: 'FizzBuzz',
        description: 'Write a program that prints numbers 1-100, but for multiples of 3 print "Fizz" and for multiples of 5 print "Buzz"',
        difficulty: 'easy',
        language: 'javascript',
        testCases: {
          inputs: [1, 3, 5, 15],
          outputs: [1, 'Fizz', 'Buzz', 'FizzBuzz'],
        },
        xpReward: 100,
        timeLimit: 300,
      },
      {
        title: 'Palindrome Checker',
        description: 'Create a function that checks if a string is a palindrome',
        difficulty: 'easy',
        language: 'javascript',
        testCases: {
          inputs: ['racecar', 'hello', 'madam'],
          outputs: [true, false, true],
        },
        xpReward: 150,
        timeLimit: 300,
      },
    ],
  });

  console.log('✅ Challenges created');

  // Créer un roadmap exemple
  const roadmap = await prisma.roadmap.create({
    data: {
      userId: user1.id,
      title: 'Frontend Developer Roadmap',
      description: 'Complete path to becoming a frontend developer',
      category: 'frontend',
      isPublic: true,
      likes: 42,
      views: 150,
      data: {
        nodes: [
          { id: '1', label: 'HTML & CSS', position: { x: 100, y: 100 } },
          { id: '2', label: 'JavaScript', position: { x: 250, y: 100 } },
          { id: '3', label: 'React', position: { x: 400, y: 100 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3' },
        ],
      },
    },
  });

  // Créer des étapes pour le roadmap
  await prisma.roadmapStep.createMany({
    data: [
      {
        roadmapId: roadmap.id,
        title: 'Learn HTML Basics',
        description: 'Master the fundamentals of HTML',
        order: 1,
        completed: true,
        resources: {
          links: ['https://developer.mozilla.org/en-US/docs/Web/HTML'],
          videos: ['https://youtube.com/watch?v=example'],
        },
      },
      {
        roadmapId: roadmap.id,
        title: 'Learn CSS',
        description: 'Style your web pages with CSS',
        order: 2,
        completed: false,
        resources: {
          links: ['https://css-tricks.com'],
          videos: [],
        },
      },
    ],
  });

  console.log('✅ Roadmap created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1); // sans import, Node comprend
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
