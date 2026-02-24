import { Text, View, Link, Image, StyleSheet } from "@react-pdf/renderer";
import { IconText } from "./icons";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingBottom: 16,
    flexDirection: "row",
  },
  textContainer: {
    flexGrow: 1,
    maxWidth: "80%",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 2,
    color: "#7c46e1",
    fontWeight: 700,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
    gap: 12,
  },
  link: {
    textDecoration: "none",
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    top: -20,
    width: 90,
    height: 90,
  },
  image: {
    borderRadius: 99999,
  },
});

type SocialLink = {
  name: string;
  link: string;
};

type HeadingProps = {
  name: string;
  role: string;
  email: string;
  location: string;
  avatar?: string;
  social?: SocialLink[];
};

export const Heading: React.FC<HeadingProps> = ({
  name,
  role,
  email,
  location,
  avatar,
  social = [],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        {role ? <Text style={styles.subTitle}>{role}</Text> : null}
        <View style={styles.infoContainer}>
          {email ? (
            <Link src={`mailto:${email}`} style={styles.link}>
              <IconText icon="at" text={email} />
            </Link>
          ) : null}
          {location ? <IconText icon="location" text={location} /> : null}
          {social.map((item) => (
            <Link key={item.name} src={item.link} style={styles.link}>
              <IconText icon="link" text={item.name} />
            </Link>
          ))}
        </View>
      </View>
      {avatar && (
        <View style={styles.imageContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={styles.image}
            src={avatar.startsWith("data:") ? { uri: avatar } : avatar}
          />
        </View>
      )}
    </View>
  );
};
