import { Text, View, Link, Image, StyleSheet } from "@react-pdf/renderer";
import { Icon } from "./icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#313C4E",
    marginBottom: 5,
    alignItems: "center",
    position: "relative",
    maxHeight: 250,
    width: "100%",
  },
  leftColumn: {
    flex: 1.2,
    paddingRight: 10,
  },
  centerColumn: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: "#4b908f",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#334155",
  },
  subTitle: {
    fontSize: 12,
    marginTop: 2,
    color: "#4b908f",
    fontWeight: 700,
  },
  introText: {
    fontSize: 8.5,
    marginTop: 10,
    color: "#334155",
    lineHeight: 1.3,
    maxWidth: "95%",
  },
  infoContainer: {
    flexDirection: "column",
    gap: 6,
    alignItems: "flex-end",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactText: {
    fontSize: 10,
    color: "#313C4E",
  },
  link: {
    textDecoration: "none",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 100 / 2,
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
  phone?: string;
  avatar?: string;
  social?: SocialLink[];
  intro?: string;
};

const getSocialIcon = (name: string): any => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("linkedin")) return "linkedin";
  if (lowerName.includes("github")) return "github";
  return "link";
};

export const Heading: React.FC<HeadingProps> = ({
  name,
  role,
  email,
  location,
  phone,
  avatar,
  social = [],
  intro,
}) => {
  return (
    <View style={styles.container}>

      {/* Left Column: Name, Role, Intro */}
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{name}</Text>
        {role ? <Text style={styles.subTitle}>{role}</Text> : null}
        {intro && <Text style={styles.introText}>{intro}</Text>}
      </View>

      {/* Center Column: Avatar */}
      {avatar ? (
        <View style={styles.centerColumn}>
          <View style={styles.imageWrapper}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              style={styles.image}
              src={avatar.startsWith("data:") ? { uri: avatar } : avatar}
            />
          </View>
        </View>
      ) : (
        <View style={styles.centerColumn} />
      )}

      {/* Right Column: Contact Info */}
      <View style={styles.rightColumn}>
        <View style={styles.infoContainer}>
          {email ? (
            <Link src={`mailto:${email}`} style={styles.link}>
              <View style={styles.contactRow}>
                <Text style={styles.contactText}>{email}</Text>
                <Icon size={12} name="email" color="#313C4E" />
              </View>
            </Link>
          ) : null}

          {phone ? (
            <Link src={`tel:${phone.replace(/\s+/g, "")}`} style={styles.link}>
              <View style={styles.contactRow}>
                <Text style={styles.contactText}>{phone}</Text>
                <Icon size={12} name="phone" color="#313C4E" />
              </View>
            </Link>
          ) : null}

          {location ? (
            <View style={styles.contactRow}>
              <Text style={styles.contactText}>{location}</Text>
              <Icon size={12} name="location" color="#313C4E" />
            </View>
          ) : null}

          {social.map((item) => (
            <Link key={item.name} src={item.link} style={styles.link}>
              <View style={styles.contactRow}>
                <Text style={styles.contactText}>{item.name}</Text>
                <Icon size={12} name={getSocialIcon(item.name)} color="#313C4E" />
              </View>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
};
