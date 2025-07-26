import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import FilterModal from "../../components/modals/FilterModal";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { primary } from "@/constants/Colors";

const StatusData = ["paid", "unpaid"];

const payment_details = () => {
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const [filter, setFilter] = useState({ start: "", end: "", status: "" });
  const [query, setQuery] = useState<string>("");
  const [start, setStart] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const [end, setEnd] = useState(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    return now;
  });

  const [status, setStatus] = useState("");

  const handleSearch = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={OrderStyle.container}>
        <Text style={OrderStyle.heading}>Earnings & Payments</Text>
        <Text style={OrderStyle.dis}>
          View detailed records of all your payments and transactions.
        </Text>
        <View style={{ height: "88%" }}>
          <FlatList
            data={["complete", "cancel", "complete", "complete"]}
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
  const date = new Date();
  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.payment_card_top}>
        <View>
          <Text style={OrderStyle.payment_card_text}>Invoice Date</Text>
          <Text style={OrderStyle.payment_card_date}>
            {date.toDateString()}
          </Text>
        </View>
      </View>
      <View style={OrderStyle.payment_description}>
        <Text style={OrderStyle.payment_description_text}>
          Order Id:{" "}
          <Text style={{ fontFamily: "bold", fontWeight: 600 }}>BIC1234</Text>
        </Text>
        <Text style={OrderStyle.payment_description_text}>
          View Order Details:{" "}
          <Text style={{ fontFamily: "bold", fontWeight: 600, color: primary }}>
            Click Here
          </Text>
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
            <Text>Paid</Text>
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
              600
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
