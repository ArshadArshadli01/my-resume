import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  title: {
    fontSize: 12,
    color: "#7c3aed",
    fontWeight: 700,
  },
  description: {
    marginTop: 2,
    fontStyle: "italic",
  },
});

type EducationProps = {
  name: string;
  description: string;
};

export const Education: React.FC<EducationProps> = ({ name, description }) => {
  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
