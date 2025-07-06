import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingStyle from "@/styles/upcoming";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";
import { primary } from "@/constants/Colors";
import av1 from "../../assets/images/av.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import p1 from "../../assets/images/p1.jpg";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GetUpcomingOrders } from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoData from "@/components/NoData";
import Loader from "@/components/Loader";

const upcoming = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRecoprds = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      const result = await GetUpcomingOrders(token);
      if (result?.data?.data) {
        setState(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecoprds();
  }, []);

  if(loading){
    return <Loader/>
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={UpcomingStyle.container}>
        <Text style={UpcomingStyle.heading}>Upcoming Orders</Text>
        <Text style={UpcomingStyle.dis}>
          Track your upcoming orders and stay updated.
        </Text>
        <View style={{ flexGrow: 1, marginTop: 20, marginBottom: 10 }}>
          {state?.length === 0 && loading === false ? (
            <NoData message="No Upcoming Orders" />
          ) : (
            <FlatList
              data={state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TrackingCard
                  item={item}
                  handlepush={(id: string) => router.push(`/(external)/${id}`)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
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
          <Text style={UpcomingStyle.statusText}>
            {new Date(item?.orderDate).toDateString()}
          </Text>
        </View>
        <View style={UpcomingStyle.status}>
          <Feather name="clock" size={14} color="#fff" />
          <Text style={UpcomingStyle.statusText}>
            {new Date(item?.orderTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </View>
      </View>
      <View style={UpcomingStyle.productList}>
        <View style={UpcomingStyle.product}>
          <Image
            source={item?.product[0]?.img[0]?.url}
            style={UpcomingStyle.img}
          />
          <View style={UpcomingStyle.productTextWrap}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={UpcomingStyle.h1}
            >
              {item?.product[0]?.name}
            </Text>
            <Text style={UpcomingStyle.h6}>+{item?.product?.length} Items</Text>
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
            <Text style={UpcomingStyle.h4}>{item?.agent?.name}</Text>
          </View>
          <View style={UpcomingStyle.phone}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`tel:${item?.agent?.phone}`)
              }
            >
              <FontAwesome name="phone" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={UpcomingStyle.last}>
        <View style={UpcomingStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={UpcomingStyle.ptext}>
            {item?.supplier?.supplierAmount}
          </Text>
        </View>

        <TouchableOpacity
          style={UpcomingStyle.btn}
          onPress={() => handlepush(item?._id)}
        >
          <Text style={UpcomingStyle.btnText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
