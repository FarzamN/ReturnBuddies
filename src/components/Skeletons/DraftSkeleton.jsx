import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { colors } from "../../theme/colors";
import { Row } from "../../theme/globalStyle";

const DraftSkeleton = ({ height }) => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      borderRadius={16}
      highlightColor={colors.purple}
      backgroundColor={colors.white}
      marginTop={10}
    >
      <SkeletonPlaceholder.Item marginTop={15}>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={30} height={30} />
          <SkeletonPlaceholder.Item width={70} marginLeft={10} height={30} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={10} width="100%" height={70} />
        <SkeletonPlaceholder.Item marginTop={10} width="100%" height={70} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default DraftSkeleton;
