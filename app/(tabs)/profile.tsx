import ProfileStyles from "@/styles/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { pink } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();
  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            dispatch({ type: "logout" });
            Toast.show({
              type: "success",
              text1: "Logout Successful",
              text2: "You have been logged out.",
       
            });
            router.replace("/(auth)/login");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingBottom: 0 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={ProfileStyles.container}>
          <View style={ProfileStyles.heading}>
            <Text style={ProfileStyles.headingText}>Profile</Text>
            <View style={ProfileStyles.headingStatus}>
              <TouchableOpacity
                onPress={() => router.push("/(external)/edit_profile")}
              >
                <Text style={ProfileStyles.headingStatusText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ProfileStyles.profileHead}>
            <View style={ProfileStyles.profileCircle}>
              <Text style={ProfileStyles.pcText}>{user?.name[0]}</Text>
            </View>
            <Text style={ProfileStyles.pcTextHead}>{user?.name}</Text>
            <Text style={ProfileStyles.label}>
              Active Since - {new Date(user?.createdAt)?.toDateString()}
            </Text>
          </View>
          <View style={ProfileStyles.info}>
            <Text style={ProfileStyles.infoHead}>Personal Information</Text>
            <View style={ProfileStyles.form}>
              <View style={ProfileStyles.form_icon}>
                <MaterialIcons name="email" size={16} color={pink} />
                <Text>Email</Text>
              </View>

              <Text style={ProfileStyles.pText}>{user?.email}</Text>
            </View>
            <View style={ProfileStyles.form}>
              <View style={ProfileStyles.form_icon}>
                <Feather name="phone" size={16} color={pink} />
                <Text>Phone</Text>
              </View>

              <Text style={ProfileStyles.pText}>{user?.phone}</Text>
            </View>
            <View style={ProfileStyles.form}>
              <View style={ProfileStyles.form_icon}>
                <Entypo name="baidu" size={16} color={pink} />
                <Text>Adhar</Text>
              </View>
              <Text style={ProfileStyles.pText}>Approved</Text>
            </View>
          </View>

          <View style={ProfileStyles.info}>
            <Text style={ProfileStyles.infoHead}>Utilities</Text>

            <TouchableOpacity
              style={ProfileStyles.utils}
              onPress={() => router.push("/(external)/about")}
            >
              <Text style={ProfileStyles.utilsText}>About Us</Text>
              <Entypo name="chevron-thin-right" size={14} color="#474747" />
            </TouchableOpacity>
            <TouchableOpacity
              style={ProfileStyles.utils}
              onPress={() => router.push("/(external)/faq")}
            >
              <Text>FAQ</Text>
              <Entypo name="chevron-thin-right" size={14} color="#474747" />
            </TouchableOpacity>
            <TouchableOpacity
              style={ProfileStyles.utils}
              onPress={() =>
                Linking.openURL(
                  "https://legalterms.onrender.com/bakersline/bakerslinego/terms_condition"
                )
              }
            >
              <Text>Terms and Conditions</Text>
              <Entypo name="chevron-thin-right" size={14} color="#474747" />
            </TouchableOpacity>
            <TouchableOpacity
              style={ProfileStyles.utils}
              onPress={() =>
                Linking.openURL(
                  "https://www.termsfeed.com/live/4ef01c03-12b4-40e1-835f-ee8cdeb51b36"
                )
              }
            >
              <Text>Privacy Policy</Text>
              <Entypo name="chevron-thin-right" size={14} color="#474747" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={ProfileStyles.logout} onPress={handleLogout}>
            <Text style={ProfileStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
