import { primary } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUs = () => {
  const router = useRouter()


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
<SafeAreaView style={styles.safeArea}>
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.heading}>About Bakersline Partners</Text>

    <Text style={styles.paragraph}>
      Welcome to <Text style={styles.bold}>Bakersline Partners</Text> — the
      official app for bakeries and suppliers to connect with the{" "}
      <Link style={styles.link} href={"https://bakersline.in/"}>Bakersline</Link>{" "}
      marketplace. Our mission is to help you seamlessly receive, manage, and
      fulfill customer orders with speed and reliability.
    </Text>

    <Text style={styles.paragraph}>
      Bakersline allows customers to browse, customize, and place orders for
      cakes, pastries, bread, and other baked goods from their favorite local
      shops. With this app, you can connect your bakery directly to the
      Bakersline platform and start receiving orders instantly.
    </Text>

    <Text style={styles.paragraph}>With Bakersline Partners, you can:</Text>
    <View style={styles.list}>
      <Text style={styles.listItem}>• Receive new customer orders in real time</Text>
      <Text style={styles.listItem}>• View and manage order details</Text>
      <Text style={styles.listItem}>• Update order status from preparation to dispatch</Text>
      <Text style={styles.listItem}>• Track payments and revenue</Text>
      <Text style={styles.listItem}>• Access order history and performance insights</Text>
    </View>

    <Text style={styles.paragraph}>
      We are committed to supporting our partners with an intuitive, efficient,
      and professional platform — so you can focus on what you do best:
      creating delicious baked goods for happy customers.
    </Text>

    <Text style={styles.paragraph}>
      Thank you for choosing Bakersline Partners. Let’s grow your bakery and
      deliver happiness together!
    </Text>
  </ScrollView>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: primary,
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    lineHeight: 24,
    marginBottom: 15,
    textAlign:"justify"
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
  },
  list: {
    marginLeft: 10,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
});

export default AboutUs;
