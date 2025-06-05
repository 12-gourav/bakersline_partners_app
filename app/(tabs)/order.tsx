import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { primary } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import ProductImage from "../../assets/images/p1.jpg";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import FilterModal from "@/components/modals/FilterModal";
import Toast from "react-native-toast-message";

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
    console.log("kkkk")
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

        <View style={{ flexGrow: 1, marginTop: 20, marginBottom: 10 }}>
          <FlatList
            data={["complete", "cancel", "rto", "complete"]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackingCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
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
    <View style={OrderStyle.card}>
      <View style={OrderStyle.top}>
        <View style={OrderStyle.bar}>
          <Text style={OrderStyle.h1} numberOfLines={1} ellipsizeMode="tail">
            Chocolate Cake Near boby guest house lalganj raebra
          </Text>
          <Text style={OrderStyle.date}>12 Jun Wed 12:00 AM</Text>
        </View>
        <Image
          style={OrderStyle.img}
          source={ProductImage}
          contentFit="cover"
        />
      </View>
      <View style={OrderStyle.address}>
        <View style={OrderStyle.pin}>
          <Ionicons name="storefront-outline" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            Near boby guest house lalganj raebralei 229206 Near boby guest
          </Text>
        </View>
      </View>
      <View style={{ ...OrderStyle.address, marginTop: 30 }}>
        <View style={OrderStyle.pin2}>
          <Feather name="map-pin" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            Near boby guest house lalganj raebralei 229206
          </Text>
        </View>
      </View>
      <View style={OrderStyle.line}></View>
      <View style={OrderStyle.last}>
        <View style={OrderStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={OrderStyle.ptext}>200</Text>
        </View>
        <View
          style={
            item === "complete"
              ? OrderStyle.complete
              : item === "cancel"
              ? OrderStyle.cancel
              : OrderStyle.rto
          }
        >
          <Text
            style={
              item === "complete"
                ? OrderStyle.completeText
                : item === "cancel"
                ? OrderStyle.cancelText
                : OrderStyle.rtoText
            }
          >
            {item === "complete"
              ? "Complete"
              : item === "cancel"
              ? "Cancel"
              : "RTO"}
          </Text>
        </View>
        <TouchableOpacity
          style={{ ...OrderStyle.wrapText, gap: 5 }}
          onPress={() => router.push("/(external)/:dsadsadsad")}
        >
          <Text style={OrderStyle.ptext}>See More</Text>
          <AntDesign name="arrowright" size={14} color={primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
