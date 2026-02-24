import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { Heading } from "./heading";
import { Section } from "./section";
import { Experience } from "./experience";
import { Education } from "./education";
import { Skill } from "./skill";
import { Language } from "./language";
import { Watermark } from "./watermark";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingHorizontal: 50,
    fontFamily: "Ubuntu",
    fontSize: 10,
    paddingBottom: 36,
  },
  twoColumn: {
    flexDirection: "row",
  },
  left: {
    flexGrow: 1,
    marginRight: 16,
    width: "50%",
  },
  right: {
    flexGrow: 1,
    width: "45%",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 24,
    left: 0,
    right: 35,
    textAlign: "right",
    color: "#64748b",
  },
});

export type SectionVisibility = {
  show_pdf: boolean;
  show_site: boolean;
};

export type ResumeData = {
  person: {
    name: string;
    role: string;
    email: string;
    location: string;
    avatar?: string;
  };
  social: {
    name: string;
    link: string;
  }[];
  intro: SectionVisibility & {
    text: string;
  };
  work: SectionVisibility & {
    items: {
      company: string;
      role: string;
      timeframe: string;
      achievements: string[];
    }[];
  };
  education: SectionVisibility & {
    items: {
      name: string;
      description: string;
    }[];
  };
  skills: SectionVisibility & {
    items: {
      title: string;
      description: string;
    }[];
  };
  languages: SectionVisibility & {
    items: {
      name: string;
      proficiency: string;
    }[];
  };
  softSkills: SectionVisibility & {
    items: string[];
  };
};

type ResumeDocumentProps = {
  resume: ResumeData;
};

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ resume }) => {
  return (
    <Document
      author={resume.person.name}
      title={`Resume — ${resume.person.name}, ${new Date().getFullYear()}`}
    >
      <Page size="A4" style={styles.page}>
        <Watermark />

        <Heading
          name={resume.person.name}
          role={resume.person.role}
          email={resume.person.email}
          location={resume.person.location}
          avatar={resume.person.avatar}
          social={resume.social}
        />

        {resume.intro.show_pdf && (
          <Section title="introduction">
            <Text>{resume.intro.text}</Text>
          </Section>
        )}

        {resume.skills.show_pdf && (
          <Section title="technical skills">
            {resume.skills.items.map((s) => (
              <Skill key={s.title} title={s.title} description={s.description} />
            ))}
          </Section>
        )}

        {resume.work.show_pdf && (
          <Section title="work experience">
            {resume.work.items.map((w) => (
              <Experience
                key={`${w.company}-${w.timeframe}`}
                company={w.company}
                role={w.role}
                timeframe={w.timeframe}
                achievements={w.achievements}
              />
            ))}
          </Section>
        )}

        {resume.education.show_pdf && (
          <Section title="education & certifications">
            {resume.education.items.map((e) => (
              <Education key={e.name} name={e.name} description={e.description} />
            ))}
          </Section>
        )}

        {(resume.languages.show_pdf || resume.softSkills.show_pdf) && (
          <View style={styles.twoColumn}>
            {resume.languages.show_pdf && (
              <View style={styles.left}>
                <Section title="languages">
                  {resume.languages.items.map((l) => (
                    <Language key={l.name} name={l.name} proficiency={l.proficiency} />
                  ))}
                </Section>
              </View>
            )}
            {resume.softSkills.show_pdf && resume.softSkills.items.length > 0 && (
              <View style={resume.languages.show_pdf ? styles.right : styles.left}>
                <Section title="soft skills & interests">
                  <Text>{resume.softSkills.items.join(", ")}</Text>
                </Section>
              </View>
            )}
          </View>
        )}

        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
};
