"use client";

import { Fade, Flex, Row } from "@once-ui-system/core";

import { display } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s" />
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s">
              {display.themeSwitcher && (
                <ThemeToggle />
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center" />
      </Row>
    </>
  );
};
