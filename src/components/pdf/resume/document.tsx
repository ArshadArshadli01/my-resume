import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { Heading } from "./heading";
import { Section } from "./section";
import { Experience } from "./experience";
import { Education } from "./education";
import { Skill } from "./skill";
import { Language } from "./language";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30, // Reduced from 40
    paddingHorizontal: 35, // Reduced from 40
    fontFamily: "Ubuntu",
    fontSize: 10,
    paddingBottom: 30,
  },
  twoColumnContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  leftColumn: {
    width: "65%", // Slightly wider left column
    paddingRight: 15,
  },
  rightColumn: {
    width: "35%", // Slightly narrower right column
    paddingLeft: 15,
    borderLeftWidth: 0,
    borderLeftColor: "#e2e8f0",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 9, // Smaller page number
    bottom: 20,
    left: 0,
    right: 35,
    textAlign: "right",
    color: "#94a3b8",
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
    phone?: string;
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
        <Heading
          name={resume.person.name}
          role={resume.person.role}
          email={resume.person.email}
          location={resume.person.location}
          phone={resume.person.phone}
          avatar={resume.person.avatar}
          social={resume.social}
          intro={resume.intro.show_pdf ? resume.intro.text : undefined}
        />

        <View style={styles.twoColumnContainer}>
          {/* LEFT COLUMN: Experience & Education */}
          <View style={styles.leftColumn}>
            {resume.work.show_pdf && (
              <Section title="WORK EXPERIENCE">
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
              <Section title="EDUCATION">
                {resume.education.items.map((e) => (
                  <Education key={e.name} name={e.name} description={e.description} />
                ))}
              </Section>
            )}
          </View>

          {/* RIGHT COLUMN: Skills, Languages, Soft Skills */}
          <View style={styles.rightColumn}>
            {resume.skills.show_pdf && (
              <Section title="SKILLS">
                {resume.skills.items.map((s) => (
                  <Skill key={s.title} title={s.title} description={s.description} />
                ))}
              </Section>
            )}

            {resume.languages.show_pdf && (
              <Section title="LANGUAGES">
                {resume.languages.items.map((l) => (
                  <Language key={l.name} name={l.name} proficiency={l.proficiency} />
                ))}
              </Section>
            )}

            {resume.softSkills.show_pdf && resume.softSkills.items.length > 0 && (
              <Section title="INTERESTS">
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 2 }}>
                  {resume.softSkills.items.map((s) => (
                    <View key={s} style={{
                      paddingVertical: 2.5,
                      paddingHorizontal: 6,
                      borderWidth: 1,
                      borderColor: "#cbd5e1",
                      borderRadius: 3,
                      marginBottom: 3
                    }}>
                      <Text style={{ fontSize: 8, color: "#475569" }}>{s}</Text>
                    </View>
                  ))}
                </View>
              </Section>
            )}
          </View>
        </View>

        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </Page>
    </Document>
  );
};
