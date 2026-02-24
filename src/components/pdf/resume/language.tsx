import { Text } from "@react-pdf/renderer";

type LanguageProps = {
  name: string;
  proficiency: string;
};

export const Language: React.FC<LanguageProps> = ({ name, proficiency }) => {
  return (
    <Text style={{ paddingVertical: 1 }}>
      <Text style={{ fontWeight: 700 }}>{name}: </Text>
      <Text>{proficiency}</Text>
    </Text>
  );
};
