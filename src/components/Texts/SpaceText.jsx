import React from "react";
import { Text } from "..";
import styles from "./textStyle";
import { Space_Between } from "../../theme/globalStyle";

const SpaceText = (props) => {
  const { title, value, load, visible } = props;
  return (
    <>
      {!visible && (
        <Space_Between>
          <Text style={styles.promoCode} title={title} />
          <Text title={load ? "Wait..." : value} style={styles.promoCode} />
        </Space_Between>
      )}
    </>
  );
};

export default SpaceText;
