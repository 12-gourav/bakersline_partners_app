import React from "react";
import img from "../assets/images/nodata.png";
import { Image, Text, View } from "react-native";

type NoDataProps = {
  message: string;
};

const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 250, height: 250, objectFit: "cover" }}
        source={img}
      />
      <Text
        style={{
          fontFamily: "bold",
          color: "#484848",
          includeFontPadding: false,
          fontWeight: "500",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default NoData;
