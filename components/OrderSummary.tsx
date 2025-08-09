import { View, Text } from "react-native";
import React from "react";
import HomeStyles from "@/styles/home";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Image } from "expo-image";
import Zocial from "@expo/vector-icons/Zocial";
import NoData from "./NoData";

const OrderSummary: React.FC<any> = ({ state }) => {

if(state?.summary?.length===0){
    return <NoData message="No Order Summary Exist"/>
}


  return state?.summary?.map((d: any, i: number) => (
    <View style={HomeStyles.product} key={i}>
      <Image
        source={d.product[0].img[0].url?.replace(
              "http://",
              "https://"
            )}
        style={{
          width: 50,
          height: 50,
          borderRadius: 5,
        }}
        contentFit="cover"
      />
      <View>
        <Text style={HomeStyles.ptext} numberOfLines={1} ellipsizeMode="tail">
          {d?.product[0].name}{" "}
        </Text>
        <View style={HomeStyles.line3}>
          <View style={HomeStyles.line2}>
            <Fontisto name="date" size={12} color="gray" />
            <Text style={HomeStyles.sm}>
              {new Date(d?.createdAt)?.toLocaleDateString()}
            </Text>
          </View>
          <View style={HomeStyles.line2}>
            <Zocial name="statusnet" size={12} color="gray" />
            <Text style={HomeStyles.sm}>{d?.orderStatus}</Text>
          </View>
        </View>
      </View>
    </View>
  ));
};

export default OrderSummary;
