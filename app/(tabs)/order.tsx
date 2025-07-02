import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import Feather from "@expo/vector-icons/Feather";
import { primary } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import ProductImage from "../../assets/images/p1.jpg";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import FilterModal from "@/components/modals/FilterModal";
import Toast from "react-native-toast-message";
import UpcomingStyle from "@/styles/upcoming";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import av1 from "../../assets/images/av.png";

const StatusData = ["complete", "rto", "cancel", "progress", "pending"];

const order = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  const [filter, setFilter] = useState({ start: "", end: "", status: "" });
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

  const handleSearch = () => {
    console.log("kkkk");
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={OrderStyle.container}>
        <Text style={OrderStyle.heading}>Order History</Text>
        <Text style={OrderStyle.dis}>
          View and manage all your past and upcoming orders in one place.
        </Text>
        <SearchBarWithFilter
          query={query}
          setQuery={setQuery}
          setIsvisible={setIsvisible}
          handleSearch={handleSearch}
        />
        <View style={{ height: "88%" }}>
          <FlatList
            data={["complete", "cancel", "rto", "complete"]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackingCard item={item} />}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: 20 }}
          />
        </View>

        {isVisible && (
          <FilterModal
            isVisible={isVisible}
            setIsVisible={setIsvisible}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            status={status}
            setStatus={setStatus}
            setFilter={setFilter}
            filter={filter}
            data={StatusData}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default order;

export const TrackingCard: React.FC<any> = ({ item }) => {
  const router = useRouter();
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
          <Image source={ProductImage} style={UpcomingStyle.img} />
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

        <TouchableOpacity style={UpcomingStyle.btn}>
          <Text style={UpcomingStyle.btnText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
