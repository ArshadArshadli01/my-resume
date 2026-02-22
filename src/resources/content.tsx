import { About, Home, Person, Social } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: process.env.NEXT_PUBLIC_FIRST_NAME || "Arshad",
  lastName: process.env.NEXT_PUBLIC_LAST_NAME || "Arshadli",
  name: `${process.env.NEXT_PUBLIC_FIRST_NAME || "Arshad"} ${process.env.NEXT_PUBLIC_LAST_NAME || "Arshadli"}`,
  role: process.env.NEXT_PUBLIC_ROLE || "Backend Developer",
  avatar: "/images/avatar-1.jpg",
  email: process.env.NEXT_PUBLIC_EMAIL || "arshad.arshadli02@gmail.com",
  location: (process.env.NEXT_PUBLIC_TIMEZONE || "Asia/Baku") as import("@/types").IANATimeZone,
  languages: ["Azerbaijani", "English", "Turkish"],
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/ArshadArshadli01",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/in/arshadarshadli",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${process.env.NEXT_PUBLIC_EMAIL || person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Backend Developer specializing in microservices and scalable systems</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Portfolio</strong>
      </Row>
    ),
    href: "/",
  },
  subline: (
    <>
      I'm {person.firstName}, a backend developer with 5+ years of experience, specializing in Java/Spring Boot microservices,
      payment integrations, and cloud infrastructure.
    </>
  ),
};

const about: About = {
  path: "/",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${process.env.NEXT_PUBLIC_LOCATION || "Baku, Azerbaijan"}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Backend Developer with 5 years of software development experience, including 4+ years
        specializing in backend architecture. Proven expertise in building scalable RESTful
        microservices, optimizing databases, and integrating complex payment gateways. Proficient in
        Java/Spring Boot, Redis, Docker/Kubernetes, and Linux/VPS environments. Adaptable and
        detail-oriented professional driven to solve complex technical challenges.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Greenpay MMC",
        timeframe: "11/2024 - Present",
        role: "Middle Backend Developer",
        achievements: [
          <>
            Developed and maintained RESTful microservices using Spring Boot and Hibernate; actively
            participated in production monitoring and incident resolution.
          </>,
          <>
            Implemented Redis Cache to significantly optimize response times and enhance performance
            for frequently accessed data.
          </>,
          <>
            Set up a secure email OTP notification system utilizing Redis-based storage. Applied
            Redis Queue for asynchronous email dispatching, ensuring system stability under high
            server loads.
          </>,
          <>
            Designed an image upload service using MinIO and S3 buckets, alongside an e-commerce
            payment BFF (Backend for Frontend).
          </>,
          <>
            Configured Telegram notifications for real-time tracking of pending payments. Integrated
            multiple payment providers to ensure smooth, secure, and reliable financial transactions.
          </>,
          <>
            Managed secure secret configurations across microservices by successfully integrating
            HashiCorp Vault. Designed and optimized MySQL and PostgreSQL databases to improve overall
            query efficiency.
          </>,
          <>
            Deployed and orchestrated services across Git, Linux, Docker, Kubernetes, and VPS
            environments. Contributed to frontend development utilizing Vue.js, Nuxt.js, JavaScript,
            and Bootstrap.
          </>,
          <>
            Maintained and integrated legacy services using PHP, Laravel (MVC), and ORM systems.
          </>,
        ],
        images: [],
      },
      {
        company: "ABB & ABB Innovation",
        timeframe: "06/2024 - 08/2024",
        role: "Backend Developer",
        achievements: [
          <>
            Mortgage Operation Project: Migrated legacy SOAP-based services to modern RESTful
            endpoints using Spring Boot and OpenFeign, transforming XML into JSON via Jackson and
            JAXB.
          </>,
          <>
            Developed a routing REST API to accurately receive and map customer requests to the
            appropriate ABB microservices. Created dynamic request templates (e.g.,
            collateral-info.xml, close.xml) for flexible interaction with SOAP services.
          </>,
          <>
            Utilized MapStruct for clean, boilerplate-free object mapping between XML responses and
            domain models. Documented APIs with Swagger/OpenAPI and simulated API performance using
            Microcks.
          </>,
          <>
            Collaborated within an Agile framework, utilizing Jira for sprint planning and task
            tracking.
          </>,
          <>
            Job Portal Project: Designed a scalable file upload microservice utilizing Spring Boot
            and S3-compatible MinIO.
          </>,
          <>
            Integrated the upload service with external systems via REST APIs and message-driven
            communication (Kafka/RabbitMQ). Implemented robust error handling, retry mechanisms, and
            metadata tracking (name, size, format, upload status).
          </>,
          <>
            Configured public and private access via MinIO's APIs, ensuring reliability through
            comprehensive unit and integration testing.
          </>,
        ],
        images: [],
      },
      {
        company: "Alfasoft MMC",
        timeframe: "10/2023 - 10/2024",
        role: "Full Stack Developer",
        achievements: [
          <>
            Led full-stack development efforts to build scalable, high-performance web applications.
            Designed and consumed cleanly architected RESTful APIs with an emphasis on speed.
          </>,
          <>
            Executed secure and reliable payment gateway integrations to facilitate seamless
            transactions. Utilized Java Spring Boot, Hibernate, PHP (Laravel), and Vue.js/Nuxt.js
            for comprehensive backend and frontend tasks.
          </>,
          <>
            Deployed containerized applications via Docker on Linux and VPS production environments.
            Integrated Redis Cache to optimize system resource utilization and accelerate data
            access.
          </>,
          <>
            Administered and optimized MySQL and PostgreSQL databases. Ensured mobile-first,
            responsive UI designs utilizing HTML5, CSS3, Sass, Bootstrap, and jQuery.
          </>,
          <>
            Collaborated effectively in a team-based workflow using Git for version control.
          </>,
        ],
        images: [],
      },
      {
        company: "Digital Silk Road MMC",
        timeframe: "11/2020 - 11/2023",
        role: "Full Stack Developer",
        achievements: [
          <>
            Contributed to full-stack web projects utilizing Java Spring Boot, PHP (Laravel), and
            Vue.js/Nuxt.js. Developed RESTful APIs to streamline data exchange between frontend and
            backend architectures.
          </>,
          <>
            Managed data flows and optimized database structures using MySQL and PhpMyAdmin. Deployed
            applications to Linux VPS environments, performing regular server troubleshooting and
            maintenance.
          </>,
          <>
            Tracked bugs via GitHub and collaborated efficiently within an Agile framework,
            participating in weekly stand-ups. Maintained responsive and accessible user interfaces
            utilizing HTML5, SASS, JavaScript, and Git.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education & Certifications",
    institutions: [
      {
        name: "ABB Tech Academy — Backend-6 (Java) Honors",
        description: (
          <>01/2024 - 06/2024 | Baku, Azerbaijan — Graduated with Distinction</>
        ),
      },
      {
        name: "Azerbaijan Technical University",
        description: (
          <>09/2021 - 06/2023 | M.S. in System Programming</>
        ),
      },
      {
        name: "Baku Engineering University",
        description: (
          <>09/2017 - 06/2021 | B.S. in Computer Engineering</>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages & Frameworks",
        description: (
          <>
            Java (SE/EE), Spring (Boot, Framework), Hibernate, JPA, PHP, Laravel.
          </>
        ),
        tags: [
          { name: "Java", icon: "java" },
          { name: "Spring Boot", icon: "spring" },
          { name: "PHP", icon: "php" },
          { name: "Laravel", icon: "laravel" },
        ],
        images: [],
      },
      {
        title: "Databases & Caching",
        description: (
          <>
            PostgreSQL, MySQL, Oracle, MongoDB, Redis, Liquibase, Flyway.
          </>
        ),
        tags: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "Redis", icon: "redis" },
          { name: "MongoDB", icon: "mongodb" },
        ],
        images: [],
      },
      {
        title: "DevOps & Cloud",
        description: (
          <>
            Docker, Kubernetes, Linux, AWS S3, MinIO, VPS (DigitalOcean, Heroku).
          </>
        ),
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Linux", icon: "linux" },
        ],
        images: [],
      },
      {
        title: "Architecture & Tools",
        description: (
          <>
            RESTful APIs, Microservices, OOP, SOLID, Git, Postman, Swagger, ELK Stack, Grafana,
            Vault.
          </>
        ),
        tags: [
          { name: "Git", icon: "github" },
          { name: "Swagger", icon: "swagger" },
        ],
        images: [],
      },
    ],
  },
  languages: {
    display: true,
    title: "Languages",
    items: [
      {
        name: "Azerbaijani",
        proficiency: "Native / Bilingual Proficiency (C2)",
      },
      {
        name: "English",
        proficiency: "Professional Working Proficiency (B1 Intermediate)",
      },
      {
        name: "Turkish",
        proficiency: "Professional Working Proficiency (B2 Upper-Intermediate)",
      },
    ],
  },
  softSkills: {
    display: true,
    title: "Soft Skills & Interests",
    skills: ["Agile Project Management", "Teamwork", "Exploring new technologies"],
    interests: ["Self-hosting", "Gaming"],
  },
};

export { person, social, home, about };
