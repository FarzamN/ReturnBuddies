import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { colors } from "../../theme/colors";

const DraftSkeleton = ({ height }) => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      borderRadius={16}
      highlightColor={colors.purple}
      backgroundColor={colors.white}
    >
      <SkeletonPlaceholder.Item marginTop={10}>
        <SkeletonPlaceholder.Item width="100%" height={height} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default DraftSkeleton;
