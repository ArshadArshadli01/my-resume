import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  name: {
    fontSize: 9.5,
    fontWeight: 700,
    color: "#1e293b",
  },
  proficiency: {
    fontSize: 8.5,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 1,
  },
});

type LanguageProps = {
  name: string;
  proficiency: string;
};

export const Language: React.FC<LanguageProps> = ({ name, proficiency }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.proficiency}>{proficiency}</Text>
    </View>
  );
};
