import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailStyle from "@/styles/detail";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import { pink } from "@/constants/Colors";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { DispatchOrderAPI, GetOrdersDetails } from "@/api/api";
import ImageView from "react-native-image-viewing";
import Loader from "@/components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderDetails = () => {
  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [dLoading, setDLoading] = useState(false);
  const { id } = useLocalSearchParams();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const result = await GetOrdersDetails(id);
      if (result?.data?.data) {
        setState(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openMap = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(
      address
    )}&travelmode=driving`;

    return Linking.openURL(mapsUrl);
  };

  const dispatchOrder = async () => {
    try {
      if (otp === "")
        return Toast.show({
          type: "error",
          text1: "OTP is required",
          text2: "Please enter your otp code",
        });

      setDLoading(true);
      const token = await AsyncStorage.getItem("token");
      const result = await DispatchOrderAPI(state?._id, otp, token);
      if (result?.data?.data) {
        setOtp("");
        fetchRecords();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Order Dispatch Successful",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Fail",
          text2: "OTP is incorrect",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [id]);

  if (loading) {
    return <Loader />;
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
      >
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
              <Text style={DetailStyle.text}>{state?.customer?.name}</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Email</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:${state?.customer?.name}`)
                }
              >
                <Text style={DetailStyle.link}>{state?.customer?.email}</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Phone Number</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${state?.customer?.phone}`)}
              >
                <Text style={DetailStyle.link}>
                  +91 {state?.customer?.phone}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <FontAwesome name="home" size={18} color={pink} />
                <Text style={DetailStyle.label}>Delivery Address</Text>
              </View>

              <Text style={DetailStyle.text}>
                {state?.shippingAddress?.address}
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

              <TouchableOpacity
                onPress={() => openMap(state?.shippingAddress?.address)}
              >
                <Text style={DetailStyle.link}>https://google/mapslink</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Order Details</Text>

            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <Fontisto name="date" size={15} color={pink} />
                <Text style={DetailStyle.label}>Delivery Date</Text>
              </View>

              <Text style={DetailStyle.text}>
                {new Date(state?.orderDate).toDateString()}
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={16}
                  color={pink}
                />
                <Text style={DetailStyle.label}>Delivery Time</Text>
              </View>

              <Text style={DetailStyle.text}>
                {" "}
                {new Date(state?.orderTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Order Status</Text>
              <Text
                style={
                  state.orderStatus === "ASSIGN"
                    ? DetailStyle.ASSIGN
                    : state.orderStatus === "DISPATCH"
                    ? DetailStyle.DISPATCH
                    : state.orderStatus === "COMPLETE"
                    ? DetailStyle.COMPLETE
                    : DetailStyle.CANCEL
                }
              >
                {state?.orderStatus}
              </Text>
            </View>
            {state?.orderNote && (
              <View style={DetailStyle.note}>
                <Text style={DetailStyle.nh}>Order Note for Cake</Text>
                <Text style={DetailStyle.np}>{state.orderNote}</Text>
              </View>
            )}

            {state?.product?.map((d: any, i: number) => (
              <OrderCard key={i} data={d} />
            ))}
            <View style={DetailStyle.total}>
              <Text style={DetailStyle.totalText}>
                Total Payable Amount: {state?.totalAmount} Rs
              </Text>
              <Text style={DetailStyle.totalText}>
                After Deduction: {state?.supplier?.supplierAmount} Rs
              </Text>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>
              Delivery Agent Details
            </Text>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Name</Text>
              <Text style={DetailStyle.text}>{state?.deliveryAgent?.name}</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Email</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:${state?.deliveryAgent?.name}`)
                }
              >
                <Text style={DetailStyle.link}>
                  {state?.deliveryAgent?.email}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Phone Number</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${state?.deliveryAgent?.phone}`)
                }
              >
                <Text style={DetailStyle.link}>
                  +91 {state?.deliveryAgent?.phone}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {state.orderStatus === "ASSIGN" && (
            <View style={DetailStyle.formwrap}>
              <Text style={DetailStyle.formwrap_text}>Order Verification</Text>

              <View style={DetailStyle.formgroup}>
                <Text style={DetailStyle.li}>
                  1. Please ask the delivery agent for the 6-digit OTP when they
                  arrive to collect the parcel.
                </Text>
                <Text style={DetailStyle.li}>
                  2. Enter the OTP below to verify their identity.
                </Text>
                <Text style={DetailStyle.li}>
                  3. Once verified, you must hand over the parcel to the
                  delivery agent, and the order status will be updated to
                </Text>

                <Text style={DetailStyle.label}>OTP</Text>

                <TextInput
                  keyboardType="numeric"
                  maxLength={6}
                  style={DetailStyle.input}
                  placeholder="Enter OTP here"
                  onChangeText={(e) => setOtp(e)}
                  value={otp}
                />
              </View>

              <TouchableOpacity
                style={DetailStyle.submit}
                onPress={dispatchOrder}
                disabled={dLoading}
              >
                {dLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "bold",
                      fontWeight: "500",
                    }}
                  >
                    Dispatch
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const OrderCard: React.FC<{ data: any }> = ({ data }) => {
  const [visible, setIsVisible] = useState(false);
  return (
    <View style={DetailStyle.card}>
      <View style={DetailStyle.imagewrap}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image
            source={data?.img[0]?.url}
            contentFit="cover"
            style={DetailStyle.cardImg}
          />
        </TouchableOpacity>

        <Text style={DetailStyle.price}>Sub Total: {data?.subtotal} Rs</Text>
      </View>
      <View style={DetailStyle.content}>
        <Text style={DetailStyle.name}>{data?.name}</Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text style={DetailStyle.label}>Quantity: {data?.quantity}</Text>
          <Text style={DetailStyle.label}>
            Variant Type: {data?.variant?.variantTitle}
          </Text>
        </View>

        <Text style={DetailStyle.label}>Price: {data?.variant?.price} Rs</Text>
        <Text style={DetailStyle.label}>
          Discount: {data?.variant?.discount * data?.quantity} Rs
        </Text>
        {data?.fareDetails?.length > 0 && (
          <View>
            <Text style={DetailStyle.label}>Additional Fare Items:</Text>
            {data?.fareDetails?.map((f: any, i: number) => (
              <Text key={i + 132} style={DetailStyle.label3}>
                {i + 1}. {f.title} ({f?.amount} Rs)
              </Text>
            ))}
          </View>
        )}
      </View>
      <ImageView
        images={data?.img?.map((l1: any) => ({ uri: l1.url }))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};
