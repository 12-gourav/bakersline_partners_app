import {
  Link,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import { Image } from "expo-image";
import OTPInput from "@/components/OTPInput";
import lockImage from "../../assets/images/lock.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VerifyUserAPI } from "../../api/auth-api";
import Toast from "react-native-toast-message";

const Verify = () => {
  const { emailText } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVerify = async () => {
    try {
      if (otp?.length !== 6) {
        return Toast.show({
          type: "error",
          text1: "OTP is required",
          text2: "Please enter your OTP number",
        });
      }

      setLoading(true);

      const result = await VerifyUserAPI(emailText, otp);
      if (result?.data?.data) {
        Alert.alert(
          "Account Registered Successfully", // Title
          "Your account is under verification. You will receive an email once it is activated. You can then log in using your registered credentials.", // Message
          [{ text: "OK", onPress: () => router.push("/(auth)/login") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
      >
        <View style={AuthStyles.wrapper}>
          <Text style={AuthStyles.brand}>🔐 Verify Your Email</Text>
          <Text style={AuthStyles.brand2}>
            We’ve sent a One-Time Password (OTP) to your email. Please check
            your inbox to continue. If you don’t see the email, be sure to check
            your Spam or Junk folder as well.
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
              value={String(emailText)}
              editable={false}
            />
          </View>

          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>OTP</Text>
            <OTPInput setOtp={setOtp} />
          </View>

          <Link href={"/(auth)/register"} style={AuthStyles.link}>
            Back to register page?
          </Link>

          <TouchableOpacity onPress={handleVerify} disabled={loading}>
            <View style={AuthStyles.login}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={AuthStyles.textActive}>Submit</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Verify;
