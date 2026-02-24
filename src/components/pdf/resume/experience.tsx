import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Icon, IconText } from "./icons";

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 700,
  },
  row: {
    flexDirection: "row",
  },
  infoContainer: {
    justifyContent: "space-between",
    marginTop: 4,
    alignItems: "center",
  },
  company: {
    fontSize: 12,
    fontWeight: 700,
    color: "#7c3aed",
  },
  list: {
    marginTop: 4,
  },
  listItem: {
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  listText: {
    marginLeft: 4,
    flex: 1,
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
    <View style={{ marginBottom: 6 }} wrap={false}>
      <Text style={styles.title}>{role}</Text>
      <View style={[styles.infoContainer, styles.row]}>
        <Text style={styles.company}>{company}</Text>
        <IconText icon="calendar" text={timeframe} />
      </View>
      <View style={styles.list}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Icon name="dot" size={10} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
