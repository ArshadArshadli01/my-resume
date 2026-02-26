import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  headerWrapper: {
    paddingLeft: 0, // Reset padding after removing border
  },
  title: {
    fontSize: 11.5, // Degree/School
    color: "#1e293b",
    fontWeight: 700,
  },
  description: {
    marginTop: 1,
    fontSize: 9, // Time/Location
    color: "#4b908f",
    fontStyle: "italic",
    lineHeight: 1.3,
  },
});

type EducationProps = {
  name: string;
  description: string;
};

export const Education: React.FC<EducationProps> = ({ name, description }) => {
  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};
