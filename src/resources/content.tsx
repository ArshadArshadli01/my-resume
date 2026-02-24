import { About, Home, Person, Social, IANATimeZone } from "@/types";
import { Row } from "@once-ui-system/core";
import siteData from "./resume-site-data.json";

const person: Person = {
  firstName: process.env.NEXT_PUBLIC_FIRST_NAME || siteData.person.firstName,
  lastName: process.env.NEXT_PUBLIC_LAST_NAME || siteData.person.lastName,
  name: `${process.env.NEXT_PUBLIC_FIRST_NAME || siteData.person.firstName} ${process.env.NEXT_PUBLIC_LAST_NAME || siteData.person.lastName}`,
  role: process.env.NEXT_PUBLIC_ROLE || siteData.person.role,
  avatar: siteData.person.avatar,
  email: process.env.NEXT_PUBLIC_EMAIL || siteData.person.email,
  location: (process.env.NEXT_PUBLIC_TIMEZONE || siteData.person.timezone) as IANATimeZone,
  languages: siteData.languages.items.map((l) => l.name),
};

const social: Social = siteData.social
  .filter((s) => s.show)
  .map((s) => ({
    name: s.name,
    icon: s.icon as import("@/resources/icons").IconName,
    link:
      s.name === "Email"
        ? `mailto:${process.env.NEXT_PUBLIC_EMAIL || person.email}`
        : s.link,
    essential: s.essential,
    show_pdf: false,
    show_site: s.show,
  }));

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>Backend Developer specializing in microservices and scalable systems</>
  ),
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
      I'm {person.firstName}, a backend developer with 5+ years of experience,
      specializing in Java/Spring Boot microservices, payment integrations, and
      cloud infrastructure.
    </>
  ),
};

const about: About = {
  path: "/",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${process.env.NEXT_PUBLIC_LOCATION || siteData.person.location}`,
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
    display: siteData.intro.show,
    show_pdf: false,
    show_site: siteData.intro.show,
    title: siteData.intro.title,
    description: <>{siteData.intro.description}</>,
  },
  work: {
    display: siteData.work.show,
    show_pdf: false,
    show_site: siteData.work.show,
    title: siteData.work.title,
    experiences: siteData.work.experiences.map((exp) => ({
      company: exp.company,
      timeframe: exp.timeframe,
      role: exp.role,
      achievements: exp.achievements.map((a) => <>{a}</>),
      images: [],
    })),
  },
  studies: {
    display: siteData.studies.show,
    show_pdf: false,
    show_site: siteData.studies.show,
    title: siteData.studies.title,
    institutions: siteData.studies.institutions.map((inst) => ({
      name: inst.name,
      description: <>{inst.description}</>,
    })),
  },
  technical: {
    display: siteData.technical.show,
    show_pdf: false,
    show_site: siteData.technical.show,
    title: siteData.technical.title,
    skills: siteData.technical.skills.map((skill) => ({
      title: skill.title,
      description: <>{skill.description}</>,
      tags: skill.tags,
      images: [],
    })),
  },
  languages: {
    display: siteData.languages.show,
    show_pdf: false,
    show_site: siteData.languages.show,
    title: siteData.languages.title,
    items: siteData.languages.items,
  },
  softSkills: {
    display: siteData.softSkills.show,
    show_pdf: false,
    show_site: siteData.softSkills.show,
    title: siteData.softSkills.title,
    skills: siteData.softSkills.skills,
    interests: siteData.softSkills.interests,
  },
};

export { person, social, home, about };
