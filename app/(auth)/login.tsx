import { Link, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginAPI } from "../../api/auth-api";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const Login = () => {
  const { isValid } = useSelector((state: any) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim()) {
      return Toast.show({
        type: "error",
        text1: "Email is required",
        text2: "Please enter your email address",
      });
    }
    if (!password.trim()) {
      return Toast.show({
        type: "error",
        text1: "Password is required",
        text2: "Please enter your password",
      });
    }

    try {
      setLoading(true);
      const result = await LoginAPI(email, password);

      if (result?.data?.data) {
        await AsyncStorage.setItem("token", result?.data?.data?.token);
        dispatch({ type: "login", payload: result?.data?.data });
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
        });
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      router.push("/(tabs)/home");
    }
  }, [isValid]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={AuthStyles.wrapper}>
          <Text style={AuthStyles.brand}>Delivering the Future.</Text>
          <Text style={AuthStyles.brand2}>Your packages. Our promise.</Text>
          <View style={AuthStyles.toggleWrap}>
            <TouchableOpacity
              style={AuthStyles.toggleWrapLeftActive}
              onPress={() => router.push("/(auth)/login")}
            >
              <View>
                <Text style={AuthStyles.textActive}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={AuthStyles.toggleWrapRight}
              onPress={() => router.push("/(auth)/register")}
            >
              <View>
                <Text style={AuthStyles.text}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Email Address</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your email address"
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Password</Text>
            <TextInput
              style={AuthStyles.input}
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={(e) => setPassword(e)}
              value={password}
            />
          </View>

          <Link href={"/(auth)/forgot"} style={AuthStyles.link}>
            Forgot Password?
          </Link>

          <Link href={"/(auth)/register"} style={AuthStyles.link}>
            Don't have an account?{" "}
            <Text style={{ fontWeight: "600", fontFamily: "bold" }}>
              Create Account
            </Text>
          </Link>
          <TouchableOpacity onPress={handleLogin} disabled={loading}>
            <View style={AuthStyles.login}>
              {loading ? (
                <ActivityIndicator color={"#fff"} />
              ) : (
                <Text style={AuthStyles.textActive}>Login</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
