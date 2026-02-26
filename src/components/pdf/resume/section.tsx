import { StyleSheet, Text, View } from "@react-pdf/renderer";

type SectionProps = React.PropsWithChildren & {
  title: string;
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: 9, // Smaller for better hierarchy
    color: "#64748b", // Lighter slate for contrast
    marginBottom: 6,
    letterSpacing: 1.5,
  },
});

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};
