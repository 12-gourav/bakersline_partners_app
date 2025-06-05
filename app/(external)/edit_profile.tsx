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

const edit_profile = () => {
  const { user } = useSelector((state: any) => state.user);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
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

      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const result = await UserUpdateAPI(
        user?._id,
        name,
        address,
        phone,
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
