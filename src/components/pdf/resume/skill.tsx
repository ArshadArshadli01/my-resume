import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginBottom: 4, // Reduced from 12
  },
  groupName: {
    fontSize: 10, // Reduced from 12
    fontWeight: 400,
    color: "#000000",
    marginBottom: 4, // Reduced from 8
    textTransform: "uppercase",
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0, // Reduced from 6
  },
  pill: {
    backgroundColor: "#3d4c66",
    borderRadius: 3, // Reduced from 4
    paddingVertical: 2.5, // Reduced from 4
    paddingHorizontal: 5, // Reduced from 6
    marginBottom: 4, // Reduced from 6
    marginRight: 4, // Reduced from 6
  },
  pillText: {
    fontSize: 7.5, // Reduced from 8.5
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
  },
});

type SkillProps = {
  title: string;
  description: string;
};

export const Skill: React.FC<SkillProps> = ({ title, description }) => {
  const parsedSkills = description.split(",").map((s) => s.trim());

  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>{title}</Text>
      <View style={styles.pillContainer}>
        {parsedSkills.map((skill, i) => (
          <View key={i} style={styles.pill}>
            <Text style={styles.pillText}>{skill.replace(/\.$/, "")}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
