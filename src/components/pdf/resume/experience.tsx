import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headerWrapper: {
    paddingLeft: 0, // Reset padding after removing border
    marginBottom: 4,
  },
  title: {
    fontSize: 12, // Increased for clarity
    fontWeight: 700,
    color: "#000000", // Deep black
  },
  companyRow: {
    flexDirection: "column",
    marginTop: 2,
  },
  company: {
    fontSize: 9, // Slightly smaller
    fontWeight: 400,
    color: "#475569",
    marginTop: 1,
  },
  timeLocRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  timeframe: {
    fontSize: 8.5,
    fontStyle: "italic",
    color: "#4b908f", // Teal
  },
  achievementsHead: {
    fontSize: 8.5,
    fontStyle: "italic",
    color: "#4b908f",
    marginBottom: 3,
    marginLeft: 18, // Indent to align with text
  },
  list: {
    marginTop: 0,
    marginLeft: 18, // Indent list
  },
  listItem: {
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bulletPoint: {
    width: 3.5,
    height: 3.5,
    borderRadius: 3.5 / 2,
    backgroundColor: "#4b908f", // Teal dots
    marginTop: 2.5,
    marginRight: 6,
  },
  listText: {
    fontSize: 8.5,
    color: "#334155",
    flex: 1,
    lineHeight: 1.3,
  },
});

type ExperienceProps = {
  company: string;
  role: string;
  timeframe: string;
  achievements: string[];
};

export const Experience: React.FC<ExperienceProps> = ({
  company,
  role,
  timeframe,
  achievements,
}) => {
  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>{role}</Text>
        <Text style={styles.company}>{company}</Text>
        <View style={styles.timeLocRow}>
          <Text style={styles.timeframe}>{timeframe}</Text>
        </View>
      </View>

      <Text style={styles.achievementsHead}>Achievements/Tasks</Text>
      <View style={styles.list}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
