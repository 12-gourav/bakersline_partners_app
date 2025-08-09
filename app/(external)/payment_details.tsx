import { View, Text, FlatList, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { primary } from "@/constants/Colors";
import { useSelector } from "react-redux";
import {  useRouter } from "expo-router";

const payment_details = () => {
  const { payment } = useSelector((state: any) => state.payment);
const router = useRouter()


  useEffect(() => {
    const backAction = () => {
      router.push("/(tabs)/payments");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);






  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={OrderStyle.container}>
        <Text style={OrderStyle.heading}>Earnings & Payments</Text>
        <Text style={OrderStyle.dis}>
          View detailed records of all your payments and transactions.
        </Text>
        <View style={{ height: "88%" }}>
          <FlatList
            data={payment?.payments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackingCard item={item} />}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: 20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default payment_details;

export const TrackingCard: React.FC<any> = ({ item }) => {
  const { payment } = useSelector((state: any) => state.payment);
  const router = useRouter();

  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.payment_card_top}>
        <View>
          <Text style={OrderStyle.payment_card_text}>Invoice Date</Text>
          <Text style={OrderStyle.payment_card_date}>
            {new Date(payment?.date).toDateString()}
          </Text>
        </View>
      </View>
      <View style={OrderStyle.payment_description}>
        <Text style={OrderStyle.payment_description_text}>
          Order Id:{" "}
          <Text style={{ fontFamily: "bold", fontWeight: 600 }}>
            {item?.orderId}
          </Text>
        </Text>
        <Text style={OrderStyle.payment_description_text}>
          View Order Details:{" "}
          <TouchableOpacity
            onPress={() => router.push(`/(external)/${item?.orderId}`)}
          >
            <Text
              style={{ fontFamily: "bold", fontWeight: 600, color: primary }}
            >
              Click Here
            </Text>
          </TouchableOpacity>
        </Text>
        <Text style={OrderStyle.payment_description_text}>
          Payment Method:{" "}
          <Text style={{ fontFamily: "bold", fontWeight: 600 }}>
            Google Pay
          </Text>
        </Text>
      </View>

      <View style={OrderStyle.payment_card_line}>
        <View>
          <Text style={OrderStyle.payment_card_text}>Payment Status</Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 6,
            }}
          >
            <View>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color={primary}
              />
            </View>
            <Text>{item?.paymentStatus}</Text>
          </View>
        </View>

        <View>
          <Text style={OrderStyle.payment_card_text}>Amount</Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 6,
            }}
          >
            <FontAwesome5
              name="money-bill-wave-alt"
              size={16}
              color="#4db453"
            />
            <Text
              style={{
                fontWeight: "600",
                fontFamily: "bold",
                fontSize: 14,
                marginLeft: 5,
              }}
            >
              {item?.paymentAmount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
