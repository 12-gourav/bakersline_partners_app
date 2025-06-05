import { Link, usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import { Image } from "expo-image";
import lockImage from "../../assets/images/lock.png";
import Toast from "react-native-toast-message";
import { ForgotAPI } from "@/api/auth-api";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleForgot = async () => {
    try {
      if (email === "")
        return Toast.show({
          type: "error",
          text1: "Email is required",
          text2: "Please enter your email address",
        });
      setLoading(true);

      const result = await ForgotAPI(email);
      if (result?.data?.data) {
        Alert.alert(
          "OTP Sent",
          "Your email has been sent an OTP to set your password. If you don't find it, please check your inbox and spam folder.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        router.push({
          pathname: "/(auth)/forgot_verify",
          params: { emailText: email, from: "forgot" },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={AuthStyles.wrapper}>
          <Text style={AuthStyles.brand}>Forgot Your Password?</Text>
          <Text style={AuthStyles.brand2}>
            Don’t worry, we’ll help you reset it. Enter your email to receive
            password reset instructions.
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={lockImage}
              style={{ width: 150, height: 150 }}
              contentFit="contain"
            />
          </View>

          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Email Address</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your register email address"
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>

          <Link href={"/(auth)/login"} style={AuthStyles.link}>
            Back to login page?
          </Link>

          <TouchableOpacity onPress={handleForgot}>
            <View style={AuthStyles.login}>
              <Text style={AuthStyles.textActive}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forgot;
