import { IconName } from "@/resources/icons";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Baku', 'Europe/Vienna').
 */
export type IANATimeZone = Extract<keyof typeof zones, string>;

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: IANATimeZone;
  languages?: string[];
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  name: string;
  icon: IconName;
  link: string;
  essential?: boolean;
  show_pdf: boolean;
  show_site: boolean;
}>;

/**
 * Base interface for page configuration.
 */
export interface BasePageConfig {
  path: `/${string}` | string;
  label: string;
  title: string;
  description: string;
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  image: `/images/${string}` | string;
  headline: React.ReactNode;
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  subline: React.ReactNode;
}

/**
 * About page configuration.
 */
export interface About extends BasePageConfig {
  tableOfContent: {
    display: boolean;
    subItems: boolean;
  };
  avatar: {
    display: boolean;
  };
  calendar: {
    display: boolean;
    link: string;
  };
  intro: {
    display: boolean;
    show_pdf: boolean;
    show_site: boolean;
    title: string;
    description: React.ReactNode;
  };
  work: {
    display: boolean;
    show_pdf: boolean;
    show_site: boolean;
    title: string;
    experiences: Array<{
      company: string;
      timeframe: string;
      role: string;
      achievements: React.ReactNode[];
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  studies: {
    display: boolean;
    show_pdf: boolean;
    show_site: boolean;
    title: string;
    institutions: Array<{
      name: string;
      description: React.ReactNode;
    }>;
  };
  technical: {
    display: boolean;
    show_pdf: boolean;
    show_site: boolean;
    title: string;
    skills: Array<{
      title: string;
      description?: React.ReactNode;
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  languages: {
    display: boolean;
    show_pdf: boolean;
    show_site: boolean;
    title: string;
    items: Array<{
      name: string;
      proficiency: string;
    }>;
  };
  softSkills: {
    display: boolean;
    show_pdf: boolean;
    show_site: boolean;
    title: string;
    skills: string[];
    interests: string[];
  };
}
