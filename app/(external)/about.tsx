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
        <Text style={styles.heading}>About Bakersline Go</Text>
        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.bold}>Bakersline Go</Text> — the
          official delivery partner app for the Bakersline platform. Our mission
          is to ensure timely and reliable delivery of freshly baked goods
          directly from bakeries to our customers' doorsteps.
        </Text>

        <Text style={styles.paragraph}>
          Bakersline (our main platform at{" "}
          <Link style={styles.link} href={"https://bakersline.in/"}>bakersline.com</Link>) allows customers
          to browse, customize, and place orders for cakes, pastries, bread, and
          more from their favorite local bakeries. Once an order is confirmed,
          the admin assigns it to a delivery agent — and that's where{" "}
          <Text style={styles.bold}>you</Text> come in.
        </Text>

        <Text style={styles.paragraph}>
          Using Bakersline Go, delivery partners can:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• View assigned orders</Text>
          <Text style={styles.listItem}>• Track order details and status</Text>
          <Text style={styles.listItem}>• Navigate to delivery locations</Text>
          <Text style={styles.listItem}>• Mark deliveries as completed</Text>
          <Text style={styles.listItem}>• View delivery history and payments</Text>
        </View>

        <Text style={styles.paragraph}>
          We value our delivery partners and strive to provide a smooth,
          efficient, and user-friendly experience through Bakersline Go.
        </Text>

        <Text style={styles.paragraph}>
          Thank you for being a part of the Bakersline family and helping us
          deliver happiness — one baked good at a time!
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
    color: "#FF0059",
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
