import { Link, usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import { Image } from "expo-image";
import OTPInput from "@/components/OTPInput";
import lockImg from "../../assets/images/lock.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const path = usePathname();
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/(auth)/login")
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
              source={lockImg}
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
              editable={false}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>New Password</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your new password"
              onChangeText={(e) => setEmail(e)}
              value={email}
              secureTextEntry
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Coinfirm Password</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your confirm password"
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>OTP</Text>
            <OTPInput setOtp={setOtp} />
          </View>

          <Link href={"/(auth)/forgot"} style={AuthStyles.link}>
            Back to forgot page?
          </Link>

          <TouchableOpacity onPress={handleLogin}>
            <View style={AuthStyles.login}>
              <Text style={AuthStyles.textActive}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Forgot;
