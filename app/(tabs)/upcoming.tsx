import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingStyle from "@/styles/upcoming";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";
import { pink, primary } from "@/constants/Colors";
import av1 from "../../assets/images/av.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import p1 from "../../assets/images/p1.jpg";
import { useRouter } from "expo-router";
import OrderStyle from "@/styles/order";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const upcoming = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={UpcomingStyle.container}>
        <Text style={UpcomingStyle.heading}>Upcoming Orders</Text>
        <Text style={UpcomingStyle.dis}>
          Track your upcoming orders and stay updated.
        </Text>
        <View style={{ flexGrow: 1, marginTop: 20, marginBottom: 10 }}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TrackingCard
                item={item}
                handlepush={() => router.push("/(external)/:dsadsadsad")}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default upcoming;

export const TrackingCard: React.FC<any> = ({ item, handlepush }) => {
  return (
    <View style={UpcomingStyle.card}>
      <View style={UpcomingStyle.top}>
        <View style={UpcomingStyle.status}>
          <MaterialCommunityIcons name="chef-hat" size={14} color="#fff" />
          <Text style={UpcomingStyle.statusText}>Preparing</Text>
        </View>
        <View style={UpcomingStyle.status}>
          <Feather name="clock" size={14} color="#fff" />
          <Text style={UpcomingStyle.statusText}>11:00 am</Text>
        </View>
      </View>
      <View style={UpcomingStyle.productList}>
        <View style={UpcomingStyle.product}>
          <Image source={p1} style={UpcomingStyle.img} />
          <View style={UpcomingStyle.productTextWrap}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={UpcomingStyle.h1}
            >
              Choco Lava Cake
            </Text>
            <Text style={UpcomingStyle.h6}>+2 Menu</Text>
          </View>
        </View>
      </View>
      <View style={UpcomingStyle.bar}></View>
      <View style={{ ...UpcomingStyle.product, alignItems: "center" }}>
        <View style={UpcomingStyle.img2wrap}>
          <Image style={UpcomingStyle.img2} source={av1} />
        </View>
        <View style={UpcomingStyle.agentWrap}>
          <View>
            <Text style={UpcomingStyle.h66}>Delivery Agent</Text>
            <Text style={UpcomingStyle.h4}>Gaurav Bajpai</Text>
          </View>
          <View style={UpcomingStyle.phone}>
            <FontAwesome name="phone" size={14} color="#000" />
          </View>
        </View>
      </View>

      <View style={UpcomingStyle.last}>
        <View style={UpcomingStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={UpcomingStyle.ptext}>200</Text>
        </View>
   
        <TouchableOpacity
          style={UpcomingStyle.btn}
          onPress={() => handlepush()}
        >
          <Text style={UpcomingStyle.btnText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
