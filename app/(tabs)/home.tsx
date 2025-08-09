import {
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyles from "@/styles/home";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ErrorBoundary } from "@/components/ErrorBoundry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { getAnalyticsAPI } from "@/api/api";
import * as Notifications from "expo-notifications";
import { greetUser, registerForPushNotificationsAsync } from "../../utils/util";
import OrderSummary from "@/components/OrderSummary";

Notifications.setNotificationHandler({
  handleNotification:
    async (): Promise<Notifications.NotificationBehavior> => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
});

const Home = () => {
  const { user } = useSelector((state: any) => state.user);
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const result = await getAnalyticsAPI(token);
      if (result && result?.data?.data?.summary) {
        setState(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    greetUser(user);
  }, []);

  useEffect(() => {
    if (!user?.id || !user?.name) return;

    registerForPushNotificationsAsync(user.id, user.name)
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => console.log("Push registration error:", error));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [user]);



  return (
    <ErrorBoundary>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false} >
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
                <Text style={HomeStyles.price}>{state?.totalRevenue||0}</Text>
              </View>
              <View style={HomeStyles.box}>
                <View style={HomeStyles.line}>
                  <View style={HomeStyles.circle}>
                    <Feather name="shopping-bag" size={16} color="#fff" />
                  </View>
                  <Text style={HomeStyles.p2}>Total Orders</Text>
                </View>
                <Text style={HomeStyles.price}>{state?.totalOrders||0}</Text>
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
                <Text style={HomeStyles.price}>{state?.totalDispatchOrders||0}</Text>
              </View>
              <View style={HomeStyles.box}>
                <View style={HomeStyles.line}>
                  <View style={HomeStyles.circle}>
                    <FontAwesome5 name="rupee-sign" size={16} color="#fff" />
                  </View>
                  <Text style={HomeStyles.p2}>Total Balance Amount</Text>
                </View>
                <Text style={HomeStyles.price}>{state?.totalPendingAmount||0}</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={HomeStyles.overview}>Order Summery</Text>
              </View>
              {
                loading ? <View style={{
                  width:"100%",
                  height:250,
                  backgroundColor:"#f5f5f4",
                  borderRadius:10
                }}/>: <OrderSummary state={state} />
              }
             
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

export default Home;
