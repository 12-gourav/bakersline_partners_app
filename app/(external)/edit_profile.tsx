import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileStyles from "@/styles/profile";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { LoadUserAPI, UserUpdateAPI } from "../../api/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AuthStyles from "@/styles/auth";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { GetOrigins } from "@/api/api";

const edit_profile = () => {
  const { user } = useSelector((state: any) => state.user);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopZip, setShopZip] = useState("");
  const [origin, setOrigin] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originData, setOriginData] = useState([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      if (name === "") {
        return Toast.show({
          type: "error",
          text1: "Name is required",
          text2: "Please enter your name",
        });
      }
      if (phone === "") {
        return Toast.show({
          type: "error",
          text1: "Phone is required",
          text2: "Please enter your phone number",
        });
      }
      if (address === "") {
        return Toast.show({
          type: "error",
          text1: "Address is required",
          text2: "Please enter your address",
        });
      }
      if (shopName === "") {
        return Toast.show({
          type: "error",
          text1: "Shop Name is required",
          text2: "Please enter your shop name",
        });
      }
      if (shopAddress === "") {
        return Toast.show({
          type: "error",
          text1: "Shop Address is required",
          text2: "Please enter your shop address",
        });
      }
      if (shopZip === "") {
        return Toast.show({
          type: "error",
          text1: "Shop Zip Code is required",
          text2: "Please enter your shop zip code",
        });
      }

      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const result = await UserUpdateAPI(
        user?._id,
        name,
        address,
        phone,
        shopName,
        shopAddress,
        shopZip,
        origin,
        token
      );
      if (result?.data?.data) {
        const res = await LoadUserAPI(token);
        if (res?.data?.data) {
          dispatch({ type: "load", payload: res?.data?.data });
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile Update Successful",
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setPhone(user?.phone);
      setAddress(user?.address);
      setShopName(user?.shop?.shopName);
      setShopAddress(user?.shop?.shopAddress);
      setShopZip(user?.shop?.shopZipCode);
      setOrigin(user?.origins);
    }
  }, [user]);

  useEffect(() => {
    const backAction = () => {
      router.push("/(tabs)/profile");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const fetchOrigins = async () => {
    try {
      setOriginLoading(true);

      const result = await GetOrigins();
      if (result?.data?.data) {
        setOriginData(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOriginLoading(false);
    }
  };

  useEffect(() => {
    fetchOrigins();
  }, []);

  const handleOrigin = (d: any) => {
    const origins = [...origin];

    const exists = origins?.find(
      (f: any) => f.pincode === d?.pincode && f.name === d?.name
    );

    let updatedOrigins: any;
    if (exists) {
      // Remove the matching item
      updatedOrigins = origins.filter(
        (f: any) => !(f.pincode === d?.pincode && f.name === d?.name)
      );
    } else {
      // Add the new item
      updatedOrigins = [...origins, d];
    }

    setOrigin(updatedOrigins);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={ProfileStyles.container}>
          <Text style={{ ...ProfileStyles.headingText, marginBottom: 20 }}>
            Update Profile
          </Text>
          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Email Address</Text>
            <TextInput
              style={ProfileStyles.input}
              editable={false}
              value={user?.email}
            />
          </View>
          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Name</Text>
            <TextInput
              style={ProfileStyles.input}
              placeholder="Enter your name"
              onChangeText={(e) => setName(e)}
              value={name}
            />
          </View>
          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Phone Number</Text>
            <TextInput
              keyboardType="number-pad"
              style={ProfileStyles.input}
              placeholder="Enter your phone number"
              onChangeText={(e) => setPhone(e)}
              value={phone}
            />
          </View>
          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Address</Text>
            <TextInput
              style={ProfileStyles.input}
              placeholder="Enter your address"
              onChangeText={(e) => setAddress(e)}
              value={address}
            />
          </View>

          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Shop Name</Text>
            <TextInput
              style={ProfileStyles.input}
              placeholder="Enter your shop name"
              onChangeText={(e) => setShopName(e)}
              value={shopName}
            />
          </View>
          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Shop Address</Text>
            <TextInput
              style={ProfileStyles.input}
              placeholder="Enter your shop address"
              onChangeText={(e) => setShopAddress(e)}
              value={shopAddress}
            />
          </View>
          <View style={ProfileStyles.formGroup}>
            <Text style={ProfileStyles.labelz}>Shop Zip Code</Text>
            <TextInput
              style={ProfileStyles.input}
              placeholder="Enter your shop zip code"
              onChangeText={(e) => setShopZip(e)}
              value={shopZip}
            />
          </View>

          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Origins</Text>

            <View style={AuthStyles.tags}>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  borderBottomColor: "#e4e4e4",
                  borderBottomWidth: 1,
                  height: 40,
                  marginBottom: 10,
                }}
              >
                <EvilIcons
                  name="search"
                  size={24}
                  color="#777777"
                  style={{ fontWeight: "600", marginBottom: 5 }}
                />
                <TextInput
                  value={search}
                  onChangeText={(e) => setSearch(e)}
                  placeholder="Enter origin name"
                  style={AuthStyles.tagInput}
                />
              </View>

              {originLoading ? (
                <ActivityIndicator />
              ) : originData?.filter((f: any) => f.name.includes(search))
                  ?.length === 0 ? (
                <Text style={[AuthStyles.label, { textAlign: "center" }]}>
                  No Origins Available
                </Text>
              ) : (
                originData
                  ?.filter((f: any) => f.name.includes(search))
                  ?.map((d: { name: string; pincode: string; _id: string }) => (
                    <TouchableOpacity
                      key={d?._id}
                      style={
                        origin?.find(
                          (f: any) =>
                            f.pincode === d?.pincode && f.name === d.name
                        )
                          ? AuthStyles.tagOption2
                          : AuthStyles.tagOption
                      }
                      onPress={() =>
                        handleOrigin({ name: d?.name, pincode: d?.pincode })
                      }
                    >
                      <Feather name="map-pin" size={16} color="#A7774B" />
                      <View style={AuthStyles.texts}>
                        <Text style={AuthStyles.textp1}>{d?.pincode}</Text>
                        <Text>{d?.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
              )}
            </View>
          </View>

          <TouchableOpacity
            style={ProfileStyles.login}
            disabled={loading}
            onPress={handleUpdate}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "bold",
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              {loading ? <ActivityIndicator /> : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default edit_profile;
