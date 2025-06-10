import React from "react";
import { Text } from "..";
import Tips from "react-native-walkthrough-tooltip";

const Tootlip = (props) => {
  const { visible, children, onClose, text } = props;
  return (
    <Tips
      isVisible={visible}
      content={<Text title={text} />}
      placement="top"
      onClose={onClose}
    >
      {children}
    </Tips>
  );
};

export default Tootlip;
