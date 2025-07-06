import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Faq = () => {
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
        <Text style={styles.heading}>Frequently Asked Questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.question}>1. What is Bakersline Go?</Text>
          <Text style={styles.answer}>
            Bakersline Go is the official delivery partner app for Bakersline, where delivery agents can receive, manage, and complete bakery order deliveries assigned by the admin.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>2. How do I receive orders?</Text>
          <Text style={styles.answer}>
            Orders are assigned by the Bakersline admin. Once an order is assigned to you, it will appear in your “Upcoming Orders” section within the app.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>3. What do I do after picking up an order?</Text>
          <Text style={styles.answer}>
            After picking up the order from the bakery, follow the delivery address provided. You can use the app’s navigation feature to get directions. Once delivered, mark the order as “Completed.”
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>4. Where can I see my completed orders?</Text>
          <Text style={styles.answer}>
            All completed deliveries can be found in the “Orders” tab for your reference.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>5. How do I update my profile details?</Text>
          <Text style={styles.answer}>
            Go to the “Profile” section and tap on “Edit Profile” to update your personal details such as name, phone number, and address.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>6. Who do I contact for support?</Text>
          <Text style={styles.answer}>
            If you face any issues or have questions, please reach out to your admin or contact Bakersline support through the official website:{" "}
            <Text style={styles.link}>www.bakersline.com</Text>.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>7. Can I reject an order?</Text>
          <Text style={styles.answer}>
            If you are unable to complete a delivery, please inform the admin immediately so the order can be reassigned to another delivery agent.
          </Text>
        </View>
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
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#002143",
  },
  answer: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    textAlign:"justify"
  },
  link: {
    color: "#007bff",
  },
});

export default Faq;
