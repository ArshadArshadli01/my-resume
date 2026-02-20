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
        With 5 years of experience as a developer, including over 4 years specifically focused on
        backend development, I specialize in building RESTful microservices, integrating payment
        gateways, and optimizing databases. I have hands-on experience with Java/Spring Boot, Redis
        caching, Docker/Kubernetes, and Linux/VPS environments. I am a responsible, attentive
        professional who is open to innovations and resilient in handling complex challenges.
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
            Developed and maintained RESTful microservices using Spring Boot and Hibernate, while
            participating in production monitoring and incident resolution.
          </>,
          <>
            Implemented Redis Cache to increase performance and optimize response times for
            frequently accessed data.
          </>,
          <>
            Set up an email OTP notification system, ensuring OTPs are securely stored in Redis.
            Applied Redis Queue for asynchronous email dispatching under high server loads.
          </>,
          <>
            Designed an image upload service utilizing MinIO and S3 buckets, alongside an e-commerce
            payment BFF (Backend for Frontend).
          </>,
          <>
            Integrated multiple payment providers to ensure smooth, secure, and stable financial
            transactions. Configured Telegram notifications to track pending payments.
          </>,
          <>
            Managed secure secret configurations across services by successfully integrating Vault.
            Designed and optimized relational databases for MySQL and PostgreSQL.
          </>,
          <>
            Deployed and orchestrated services using Git, Linux, Docker, Kubernetes, and VPS.
            Contributed to frontend development using Vue.js, Nuxt.js, JavaScript, and Bootstrap.
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
            endpoints by building an adapter with Spring Boot and OpenFeign, transforming XML into
            JSON using Jackson and JAXB.
          </>,
          <>
            Developed REST APIs to receive customer requests and map them accurately to ABB
            microservices. Created dynamic request templates (collateral-info.xml, close.xml,
            modify.xml) for SOAP services.
          </>,
          <>
            Utilized MapStruct for clean object mapping between XML responses and domain models.
            Documented APIs with Swagger/OpenAPI and used Microcks for API testing.
          </>,
          <>
            Job Portal Project: Designed a file upload microservice using Spring Boot and
            S3-compatible MinIO with Kafka/RabbitMQ message-driven communication.
          </>,
          <>
            Implemented robust error handling, retry mechanisms, and metadata tracking. Configured
            public and private access using MinIO's APIs with comprehensive unit/integration tests.
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
            Led full-stack development to build scalable and high-performance web applications.
            Designed and consumed RESTful APIs with emphasis on speed and clean architecture.
          </>,
          <>
            Executed payment gateway integrations to facilitate secure and reliable transactions.
            Integrated Redis Cache to optimize system resource usage.
          </>,
          <>
            Utilized Java Spring Boot, Hibernate, PHP (Laravel), and Vue.js/Nuxt.js across both
            frontend and backend. Deployed containerized applications using Docker on Linux/VPS.
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
            Vue.js/Nuxt.js. Developed RESTful APIs to enhance data exchange between services.
          </>,
          <>
            Managed data flows and optimized structures using MySQL and PhpMyAdmin. Deployed
            websites to Linux VPS environments with hands-on server troubleshooting.
          </>,
          <>
            Tracked bugs via GitHub and collaborated in an Agile framework with weekly stand-ups.
            Maintained responsive, accessible UIs using HTML5, SASS, JavaScript, and Git.
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
          <>01/2024 - 06/2024 | Baku, Azerbaijan — Graduated with Distinction (Technest)</>
        ),
      },
      {
        name: "Azerbaijan Technical University",
        description: (
          <>09/2021 - 06/2023 | Master's in System Programming</>
        ),
      },
      {
        name: "Baku Engineering University",
        description: (
          <>09/2017 - 06/2021 | Bachelor's in Computer Engineering</>
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
            Java SE, Java EE, Spring Framework, Spring Boot, Hibernate, JSP, Servlet, Thymeleaf,
            JPA, JDBC, PHP, Laravel.
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
            PostgreSQL, MySQL, MS SQL Server, Oracle, MongoDB, Redis, Liquibase, Flyway.
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
        title: "DevOps & Cloud Infrastructure",
        description: (
          <>
            Docker, Kubernetes, Linux, VPS, AWS S3, MinIO, DigitalOcean, Heroku.
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
        title: "Tools & Architecture",
        description: (
          <>
            Git, GitHub, GitLab, Postman, Swagger, Kibana, Grafana, ELK Stack, Vault.
            OOP, SOLID Principles, Design Patterns, RESTful APIs, Microservices, Agile Methodology.
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
    skills: ["Project management", "Teamwork", "Effective communication"],
    interests: ["Learning new software and tools", "Playing video games"],
  },
};

export { person, social, home, about };
