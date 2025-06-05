import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyles from "@/styles/home";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Zocial from "@expo/vector-icons/Zocial";

import { Image } from "expo-image";
import p1 from "../../assets/images/p1.jpg";
import { ErrorBoundary } from "@/components/ErrorBoundry";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    const greetUser = async () => {
      const today = new Date().toDateString();
      const lastGreeted = await AsyncStorage.getItem("lastGreeted");
      if (lastGreeted === today) return;

      const hour = new Date().getHours();
      let greeting = "";

      if (hour < 12) {
        greeting = "Good morning";
      } else if (hour < 17) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good evening";
      }

      const message = `${greeting}, ${
        user?.name?.split(" ")[0]
      } आपका दिन शानदार और मुस्कान से भरा हो!`;

      Speech.speak(message, {
        language: "hi-IN",
        pitch: 1,
        rate: 1,
      });

      await AsyncStorage.setItem("lastGreeted", today);
    };

    greetUser();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={HomeStyles.container}>
            <View style={HomeStyles.heading}>
              <Text style={HomeStyles.h1}>Hi, {user?.name?.split(" ")[0]}</Text>
              <Text style={HomeStyles.h2}>Welcome to BakersLine Go</Text>
              <Text style={HomeStyles.p}>
                Your day starts here! Check for new cake delivery assignments
                and start delivering happiness — fresh, fast, and with care.
              </Text>
            </View>
            <Text style={HomeStyles.overview}>Overview</Text>
            <View style={HomeStyles.boxwrap}>
              <View style={HomeStyles.box}>
                <View style={HomeStyles.line}>
                  <View style={HomeStyles.circle}>
                    <SimpleLineIcons
                      name="wallet"
                      size={14}
                      color="#fff"
                      style={{ fontWeight: "600" }}
                    />
                  </View>
                  <Text style={HomeStyles.p2}>Total Revenue</Text>
                </View>
                <Text style={HomeStyles.price}>25,000</Text>
              </View>
              <View style={HomeStyles.box}>
                <View style={HomeStyles.line}>
                  <View style={HomeStyles.circle}>
                    <Feather name="shopping-bag" size={16} color="#fff" />
                  </View>
                  <Text style={HomeStyles.p2}>Total Orders</Text>
                </View>
                <Text style={HomeStyles.price}>200</Text>
              </View>
            </View>
            <View style={HomeStyles.boxwrap}>
              <View style={HomeStyles.box}>
                <View style={HomeStyles.line}>
                  <View style={HomeStyles.circle}>
                    <MaterialIcons
                      name="local-shipping"
                      size={16}
                      color="#fff"
                    />
                  </View>
                  <Text style={HomeStyles.p2}>Orders in Transist</Text>
                </View>
                <Text style={HomeStyles.price}>25,000</Text>
              </View>
              <View style={HomeStyles.box}>
                <View style={HomeStyles.line}>
                  <View style={HomeStyles.circle}>
                    <FontAwesome5 name="rupee-sign" size={16} color="#fff" />
                  </View>
                  <Text style={HomeStyles.p2}>Total Balance Amount</Text>
                </View>
                <Text style={HomeStyles.price}>200</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={HomeStyles.overview}>Order Summery</Text>
              </View>
              {[1, 2, 3, 4, 5]?.map((d) => (
                <View style={HomeStyles.product} key={d}>
                  <Image
                    source={p1}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                    }}
                    contentFit="cover"
                  />
                  <View>
                    <Text
                      style={HomeStyles.ptext}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      Cholocate Cake
                    </Text>
                    <View style={HomeStyles.line3}>
                      <View style={HomeStyles.line2}>
                        <Fontisto name="date" size={12} color="gray" />
                        <Text style={HomeStyles.sm}>12/04/2025</Text>
                      </View>
                      <View style={HomeStyles.line2}>
                        <Zocial name="statusnet" size={12} color="gray" />
                        <Text style={HomeStyles.sm}>Complete</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            {/* <View style={HomeStyles.graph}>
            <Text
              style={{ ...HomeStyles.overview, marginTop: 0, marginBottom: 10 }}
            >
              Overall Order Progress
            </Text>
            <DashboardChart />
          </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

export default Home;
