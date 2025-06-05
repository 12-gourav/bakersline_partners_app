import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onBoardingStyle from "@/styles/onboarding";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import screenImage from "../../assets/images/screen2.png";

const screen1 = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={onBoardingStyle.container}>
        <Image
          source={screenImage}
          style={onBoardingStyle.image}
          contentFit="contain"
        />
        <Text style={onBoardingStyle.heading}>Receive Orders Instantly</Text>
        <Text style={onBoardingStyle.text}>
          Stay notified in real time when a customer places an order. Accept,
          prepare, and fulfill without delays—ensuring your bakery never misses
          a beat.
        </Text>
        <View style={onBoardingStyle.dotWrap}>
          <View style={onBoardingStyle.activeDot}></View>
          <View style={onBoardingStyle.dot}></View>
          <View style={onBoardingStyle.dot}></View>
        </View>
        <TouchableOpacity
          style={onBoardingStyle.next}
          onPress={() => router.push("/(onboarding)/screen2")}
        >
          <View>
            <Text style={onBoardingStyle.nextText}>Go to Pickups</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default screen1;
