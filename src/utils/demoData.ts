
export type Project = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: "big" | "mini" | "minor";
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  frameworks: string[];
  tools: string[];
  startDate: string;
  endDate: string;
  collaborators: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  date: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with product listing, cart, checkout, and admin dashboard.",
    fullDescription: "This comprehensive e-commerce solution includes features such as product catalog with advanced filtering, user accounts, shopping carts, secure checkout with Stripe integration, order history, product reviews, and a full admin dashboard for inventory management. Built with performance and scalability in mind, the platform handles thousands of products with minimal load times.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800",
    category: "big",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/ecommerce-platform",
    technologies: ["JavaScript", "Node.js", "MongoDB", "Redis"],
    frameworks: ["React", "Express", "Redux", "Material-UI"],
    tools: ["AWS", "Docker", "Webpack", "Jest"],
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    collaborators: ["Jane Doe", "John Smith"],
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing projects and skills.",
    fullDescription: "This portfolio website was built to showcase my projects, skills, and experience. It features a clean, modern design with smooth animations and a responsive layout. The site includes sections for about me, projects, skills, and contact information. Built with React and styled with Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    category: "mini",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/portfolio",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    frameworks: ["React", "Tailwind CSS"],
    tools: ["Vite", "Figma", "Netlify"],
    startDate: "2023-04-01",
    endDate: "2023-04-15",
    collaborators: [],
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A Kanban-style task management application for teams.",
    fullDescription: "This task management application helps teams organize their work using a Kanban-style board. Users can create boards, add lists, and create tasks with descriptions, due dates, and assignees. The app includes features like drag-and-drop functionality, task filtering, and user authentication. Real-time updates are enabled through Socket.io.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    category: "big",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/task-app",
    technologies: ["TypeScript", "Node.js", "MongoDB", "Socket.io"],
    frameworks: ["React", "Express", "Tailwind CSS"],
    tools: ["Heroku", "GitHub Actions", "Jest", "Cypress"],
    startDate: "2022-09-15",
    endDate: "2023-01-10",
    collaborators: ["Alex Johnson"],
  },
  {
    id: "4",
    title: "Weather App",
    description: "A weather application that provides forecasts and weather data.",
    fullDescription: "This weather application provides current weather data and forecasts for locations worldwide. Users can search for locations, save favorites, and view detailed weather information including temperature, humidity, wind speed, and precipitation forecasts. The app fetches data from OpenWeatherMap API and features a clean, intuitive interface.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    category: "minor",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/weather-app",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    frameworks: ["React"],
    tools: ["Vercel", "OpenWeatherMap API"],
    startDate: "2023-02-01",
    endDate: "2023-02-15",
    collaborators: [],
  },
  {
    id: "5",
    title: "Social Media Dashboard",
    description: "A dashboard for monitoring and managing social media accounts.",
    fullDescription: "This social media dashboard allows users to monitor and manage multiple social media accounts from a single interface. Features include post scheduling, analytics tracking, engagement monitoring, and content calendar management. The dashboard connects to various social media APIs and presents data in an easy-to-understand visual format.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
    category: "big",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/social-dashboard",
    technologies: ["JavaScript", "Python", "PostgreSQL"],
    frameworks: ["React", "Express", "Django", "Chakra UI"],
    tools: ["AWS", "Docker", "Jenkins", "Tableau"],
    startDate: "2022-07-01",
    endDate: "2022-12-15",
    collaborators: ["Maria Garcia", "Sam Green"],
  },
  {
    id: "6",
    title: "Recipe Finder",
    description: "An application that helps users find recipes based on ingredients.",
    fullDescription: "This recipe finder app helps users discover recipes based on ingredients they already have. Users can input available ingredients and the app suggests recipes that can be made, with options to filter by cuisine, dietary restrictions, and prep time. The app includes features like saving favorite recipes, meal planning, and nutritional information.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800",
    category: "mini",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/recipe-finder",
    technologies: ["JavaScript", "Node.js", "MongoDB"],
    frameworks: ["React", "Express"],
    tools: ["Heroku", "Spoonacular API"],
    startDate: "2023-03-01",
    endDate: "2023-03-20",
    collaborators: [],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    summary: "A beginner's guide to setting up a React project with TypeScript.",
    content: `<p>React and TypeScript are a powerful combination for building robust web applications. In this post, I'll guide you through setting up a new project using Create React App with TypeScript support.</p>

<h2>Why TypeScript?</h2>
<p>TypeScript adds static typing to JavaScript, which helps catch errors during development rather than at runtime. This can significantly improve code quality and make maintenance easier, especially for larger projects.</p>

<h2>Setting Up Your Project</h2>
<p>First, make sure you have Node.js installed, then run the following command:</p>

<pre><code>npx create-react-app my-app --template typescript</code></pre>

<p>This will create a new React project with TypeScript configuration already set up.</p>

<h2>Creating Your First Component</h2>
<p>Let's create a simple component with proper TypeScript typing:</p>

<pre><code>// src/components/Greeting.tsx
import React from 'react';

type GreetingProps = {
  name: string;
  count?: number;
};

const Greeting: React.FC<GreetingProps> = ({ name, count = 0 }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You have visited {count} times.</p>
    </div>
  );
};

export default Greeting;</code></pre>

<p>In this component, we've defined a type for our props, making it clear what data the component expects to receive.</p>

<h2>Conclusion</h2>
<p>TypeScript might seem like extra work at first, but the benefits of catching errors early and having better IDE support make it well worth the effort. Give it a try in your next React project!</p>`,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    author: "Jane Developer",
    date: "2023-05-15",
    tags: ["React", "TypeScript", "Web Development"],
    comments: [
      {
        id: "c1",
        author: "React Fan",
        content: "Great introduction to TypeScript with React! I've been meaning to try this combination.",
        date: "2023-05-16",
      },
      {
        id: "c2",
        author: "TypeScript Expert",
        content: "Nice post! I'd also recommend mentioning strict mode and how it provides additional benefits.",
        date: "2023-05-17",
      },
    ],
  },
  {
    id: "2",
    title: "Building a RESTful API with Node.js and Express",
    summary: "Learn how to create a complete RESTful API using Node.js and Express.",
    content: `<p>In this tutorial, we'll build a RESTful API using Node.js and Express. This API will serve as a backend for a simple task management application.</p>

<h2>Setting Up the Project</h2>
<p>First, let's create a new directory for our project and initialize it:</p>

<pre><code>mkdir task-api
cd task-api
npm init -y
npm install express mongoose cors dotenv</code></pre>

<h2>Creating the Server</h2>
<p>Let's create our main server file:</p>

<pre><code>// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});</code></pre>

<h2>Defining the Task Model</h2>
<p>Now, let's create our Task model using Mongoose:</p>

<pre><code>// src/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Task title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);</code></pre>

<h2>Implementing the API Routes</h2>
<p>Finally, let's create the routes for our API:</p>

<pre><code>// src/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a task
router.post('/', async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional routes for GET by ID, PUT, DELETE...

module.exports = router;</code></pre>

<h2>Conclusion</h2>
<p>We've created a basic RESTful API using Node.js and Express. You can extend this API with additional features like authentication, validation, and more complex relationships between resources.</p>`,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    author: "John Backend",
    date: "2023-06-02",
    tags: ["Node.js", "Express", "API", "Backend"],
    comments: [
      {
        id: "c3",
        author: "API Enthusiast",
        content: "This is exactly what I was looking for! Clear and concise instructions.",
        date: "2023-06-03",
      },
    ],
  },
];

export const personalInfo = {
  name: "Isaac Kojo Okordie Essoun",
  title: "Full Stack Developer",
  bio: "I'm a dedicated full stack developer with around 3 years of experience building responsive and efficient web applications. With a strong passion for technology and storytelling through film, I blend logic and creativity in every project I undertake.",
  about: {
    personal: "I hail from Gomoa Dahom in the Central Region of Ghana. When I'm not coding, I enjoy immersing myself in movies and exploring new technologies.",
    education: "I studied Elective Science at Saint Brother Andre Senior High School and went on to earn a Bachelor's degree in Education (Mathematics and ICT for JHS) from KNUST.",
    workExperience: "I served as an IT Coordinator at Goshen Tasty Bread for two years, followed by a year at AT as an analyst and project manager, where I led data-driven initiatives and managed software projects from concept to deployment."
  },
  family: "I'm part of a big family with 6 siblings — 3 girls and 3 boys. Currently single, but taken.",
  social: "Though I keep a low profile, I enjoy staying connected with the tech world and continue to grow through online communities and coding platforms.",
  location: "Accra, Ghana",
  email: "isaacessoun109@gmail.com",
  phone: ["0243185973", "0504403914", "0264963137"],
  socialLinks: {
    github: "https://github.com/isaac-dev", // dummy
    linkedin: "https://www.linkedin.com/in/isaac-essoun", // dummy
    twitter: "https://twitter.com/isaac_codes", // dummy
  },
  skills: [
    { name: "JavaScript", level: 60 },
    { name: "React", level: 65 },
    { name: "Node.js", level: 60 },
    { name: "MongoDB", level: 60 },
    { name: "TypeScript", level: 30 },
    { name: "Express", level: 25 },
    { name: "HTML/CSS", level: 75 },
    { name: "Python", level: 60 },
    { name: "SQL", level: 50 },
    { name: "Git", level: 70 },
  ],
};
