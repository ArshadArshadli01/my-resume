import { Text } from "@react-pdf/renderer";

type SkillProps = {
  title: string;
  description: string;
};

export const Skill: React.FC<SkillProps> = ({ title, description }) => {
  return (
    <Text style={{ paddingVertical: 1 }}>
      <Text style={{ fontWeight: 700 }}>{title}: </Text>
      <Text>{description}</Text>
    </Text>
  );
};
