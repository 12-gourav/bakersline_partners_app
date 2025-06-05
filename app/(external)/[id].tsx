import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailStyle from "@/styles/detail";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

import { InfoText, InfoText2, pink } from "@/constants/Colors";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import deliveryStatuses from "@/constants/Status";
import p1 from "../../assets/images/p1.jpg"

const OrderDetails = () => {
  const [otp, setOtp] = useState<string>();
  const [status, setStatus] = useState("");

  const openMap = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(
      address
    )}&travelmode=driving`;

    return Linking.openURL(mapsUrl);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <ScrollView>
        <View style={DetailStyle.container}>
          <View>
            <Text style={DetailStyle.heading}>Order Details</Text>
            <Text style={DetailStyle.dis}>
              Here’s everything about your order — from items to delivery
              progress!
            </Text>
          </View>

          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Customer Details</Text>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Name</Text>
              <Text style={DetailStyle.text}>Gaurav Bajpai</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Email</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${"email"}`)}
              >
                <Text style={DetailStyle.link}>gouravbajpai@gmail.com</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Phone Number</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:11213213`)}>
                <Text style={DetailStyle.link}>+91 7355228160</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <FontAwesome name="home" size={18} color={pink} />
                <Text style={DetailStyle.label}>Drop Address</Text>
              </View>

              <Text style={DetailStyle.text}>
                Near boby guest house lalganj raebralei 229206, uttarpradesh
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={18}
                  color={pink}
                />
                <Text style={DetailStyle.label}>Open Street Map</Text>
              </View>

              <TouchableOpacity onPress={() => openMap("address1")}>
                <Text style={DetailStyle.link}>https://google/mapslink</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Order Details</Text>

            {[1, 2, 3, 4]?.map((d) => (
              <OrderCard key={d} />
            ))}
            <View style={DetailStyle.total}>
              <Text style={DetailStyle.totalText}>
                Total Payable Amount: 4000
              </Text>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Store Details</Text>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Store Name</Text>
              <Text style={DetailStyle.text}>Gaurav Bajpai</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Store Email</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${"email"}`)}
              >
                <Text style={DetailStyle.link}>gouravbajpai@gmail.com</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Phone Number</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:11213213`)}>
                <Text style={DetailStyle.link}>+91 7355228160</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <Entypo name="shop" size={18} color={pink} />

                <Text style={DetailStyle.label}>Pickup Address</Text>
              </View>

              <Text style={DetailStyle.text}>
                Near boby guest house lalganj raebralei 229206, uttarpradesh
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={18}
                  color={pink}
                />
                <Text style={DetailStyle.label}>Open Street Map</Text>
              </View>

              <TouchableOpacity onPress={() => openMap("address1")}>
                <Text style={DetailStyle.link}>https://google/mapslink</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Order Verification</Text>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <TouchableOpacity onPress={() => Alert.alert("Info", InfoText)}>
                  <AntDesign name="infocirlceo" size={16} color={pink} />
                </TouchableOpacity>

                <Text style={DetailStyle.label}>Pickup Verification OTP</Text>
              </View>

              <Text style={DetailStyle.otp}>1-2-3-4-5-6</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <TouchableOpacity
                  onPress={() => Alert.alert("Info", InfoText2)}
                >
                  <AntDesign name="infocirlceo" size={16} color={pink} />
                </TouchableOpacity>
                <Text style={DetailStyle.label}>Drop Verification OTP</Text>
              </View>
              <TextInput
           keyboardType="numeric"
              maxLength={6} // Optional: limit length
                style={DetailStyle.input}
                placeholder="Enter OTP here"
              />
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={{ ...DetailStyle.label, marginBottom: 15 }}>
                Update Order Status
              </Text>

              {deliveryStatuses?.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  style={status===d?.title ? DetailStyle.statusCardActive: DetailStyle.statusCard}
                  onPress={() => setStatus(status === d?.title ? "" : d?.title)}
                >
                  <Text style={status === d?.title ? DetailStyle.titleActive: DetailStyle.title}>{d?.title}</Text>
                  <Text style={status === d?.title ? DetailStyle.label2Active: DetailStyle.label2}>{d?.description}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={DetailStyle.submit}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "bold",
                  fontWeight: "500",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const OrderCard = () => {
  return (
    <View style={DetailStyle.card}>
      <View style={DetailStyle.imagewrap}>
        <Image
          source={p1}
          contentFit="cover"
          style={DetailStyle.cardImg}
        />
        <Text style={DetailStyle.price}>Sub Total: 880</Text>
      </View>
      <View style={DetailStyle.content}>
        <Text style={DetailStyle.name}>Choco Lava Cake</Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text style={DetailStyle.label}>Quantity: 2</Text>
          <Text style={DetailStyle.label}>Price:440</Text>
        </View>

        <Text style={DetailStyle.label}>Sub Total: 880</Text>
        <Text style={DetailStyle.label}>Additional Fare Items Count: 3</Text>
      </View>
    </View>
  );
};
