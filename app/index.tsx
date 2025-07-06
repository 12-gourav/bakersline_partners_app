import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadUserAPI } from "../api/auth-api";
import { useDispatch } from "react-redux";

const STORAGE_KEYS = {
  TOKEN: "token",
  ONBOARDING: "onboarding",
};

const Index = () => {
  const [loading, setLoading] = useState(true); // default loading = true
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const onboarding = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING);

        if (!onboarding) {
          // 🟣 Show onboarding if not done
          router.replace("/(onboarding)/screen1");
          return;
        }

        // 🟢 Onboarding exists — now check login
        const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);

        if (token) {
          const result = await LoadUserAPI(token);
          if (result?.data?.data) {
            dispatch({ type: "load", payload: result?.data?.data });
            router.replace("/(tabs)/upcoming");
          } else {
            router.replace("/(auth)/login");
          }
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.log("Startup error:", error);
        router.replace("/(auth)/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return null; // Will never render this — user is redirected
};

export default Index;
