export type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  imageUrl: string; // points to /public
};

export const projects: Project[] = [
  {
    title: "Football Players Classifier (ML)",
    description:
      "Machine learning project to classify football entities using feature engineering and model benchmarking.",
    tags: ["ML", "Computer Vision", "Python", "Classification"],
    githubUrl: "https://github.com/Saifeldinsais/Football-detection-Machine-learning-model",
    imageUrl: "/projects/football-detector.jpg",
  },
  {
    title: "University Management System (MERN Stack)",
    description:
      "Full-stack university system with role-based dashboards and admin workflows, built with Agile practices.",
    tags: ["MERN", "Agile", "MongoDB", "Node.js", "React", "Full-Stack"],
    githubUrl: "https://github.com/Saifeldinsais/Agile---University-Management-System",
    imageUrl: "/projects/ums.jpg",
  },
  {
    title: "IoT Telemetry Protocol (Networking)",
    description:
      "Custom UDP-based protocol with discovery, heartbeat, sequencing, and reliability tracking for IoT telemetry.",
    tags: ["Networking", "IoT", "Python", "UDP", "Protocols"],
    githubUrl: "https://github.com/Michael-Maged/IoT-Telemetry-Protocol",
    imageUrl: "/projects/iot-telemetry.jpg",
  },
  {
    title: "Door Lock Security System",
    description:
      "Embedded security door lock system with access logic, state handling, and safety constraints.",
    tags: ["Embedded", "C", "Microcontrollers", "Security"],
    githubUrl: "https://github.com/ahmed-khaled04/door_lock_security_system",
    imageUrl: "/projects/door-lock.jpg",
  },
  {
    title: "Wreddit (Reddit Clone)",
    description:
      "Reddit-like platform with posts, comments, authentication, and responsive UI as a full-stack project.",
    tags: ["Full-Stack", "Web", "Auth", "React", "Node.js"],
    githubUrl: "https://github.com/Philodoescode/Wreddit",
    imageUrl: "/projects/wreddit.jpg",
  },
  {
    title: "Vehicle Rental System (MySQL + C#)",
    description:
      "Database-driven vehicle rental management system focusing on schema design, constraints, and queries.",
    tags: ["Database", "MySQL", "C#", "Backend"],
    githubUrl: "https://github.com/ysif9/vehicle-rental-system",
    imageUrl: "/projects/vehicle-rental.jpg",
  },
  {
    title: "E-commerce Website (Spring Boot + React)",
    description:
      "Modern e-commerce web app built with Spring Boot and React (Vite + TypeScript), tested using JUnit.",
    tags: ["Full-Stack", "Spring Boot", "React", "TypeScript", "JUnit", "Testing"],
    githubUrl: "https://github.com/ysif9/ecommerce-application",
    imageUrl: "/projects/ecommerce.jpg",
  },
  {
    title: "Supermarket System (Python OOP)",
    description:
      "OOP-based supermarket system with clean class design, maintainable structure, and core business workflows.",
    tags: ["Python", "OOP", "Software Design"],
    githubUrl: "https://github.com/Saifeldinsais/Python-SuperMarket-system",
    imageUrl: "/projects/supermarket.jpg",
  },
  {
    title: "Taskflow (MEAN Stack)",
    description:
      "Task management system using MEAN stack with CRUD workflows, authentication, and productivity-focused UI.",
    tags: ["MEAN", "Angular", "Node.js", "MongoDB", "Full-Stack"],
    githubUrl: "https://github.com/Saifeldinsais/MEAN-Stack-NTI-Training",
    imageUrl: "/projects/taskflow.jpg",
  },
  {
    title: "Python Lexer and Parser (C++)",
    description:
      "Lexer + parser for Python-like syntax in C++ including tokenization, grammar rules, and AST foundations.",
    tags: ["C++", "Compilers", "Parsing", "Data Structures"],
    githubUrl: "https://github.com/Saifeldinsais/lexical-analyzer-compilers-project",
    imageUrl: "/projects/lexer-parser.jpg",
  },
  {
    title: "Thermophysical Property ML Model",
    description:
      "ML regression models predicting thermophysical properties using preprocessing and feature engineering.",
    tags: ["ML", "Python", "Regression", "Feature Engineering"],
    githubUrl: "https://github.com/Saifeldinsais/Thermophysical-Property-ML-Model",
    imageUrl: "/projects/thermophysical-ml.jpg",
  },
];
