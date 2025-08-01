import { Link, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterAPI } from "../../api/auth-api";
import Toast from "react-native-toast-message";
import { GetOrigins } from "../../api/api";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [originData, setOriginData] = useState([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [origin, setOrigin] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (name.trim() === "") {
        return Alert.alert("Missing Name", "Please enter your full name.", [
          { text: "OK" },
        ]);
      }

      if (email.trim() === "") {
        return Alert.alert(
          "Missing Email",
          "Please enter your email address.",
          [{ text: "OK" }]
        );
      }

      if (password.trim() === "") {
        return Alert.alert("Missing Password", "Please enter your password.", [
          { text: "OK" },
        ]);
      }

      if (phone.trim() === "") {
        return Alert.alert(
          "Missing Phone Number",
          "Please enter your phone number.",
          [{ text: "OK" }]
        );
      }

      if (address.trim() === "") {
        return Alert.alert("Missing Address", "Please enter your address.", [
          { text: "OK" },
        ]);
      }

      if (!imageUri) {
        return Alert.alert(
          "Missing Document",
          "Please upload a valid Aadhaar image (JPG or PNG).",
          [{ text: "OK" }]
        );
      }
      if (origin?.length === 0) {
        return Alert.alert(
          "Missing Origins",
          "Please select at least one origin.",
          [{ text: "OK" }]
        );
      }
      setLoading(true);

      const myForm = new FormData();

      myForm.append("name", name);
      myForm.append("phone", phone);
      myForm.append("email", email);
      myForm.append("password", password);
      myForm.append("address", address);
      myForm.append("img", {
        uri: imageUri,
        name: `photo.jpg`,
        type: "image/jpeg",
      } as any);
      myForm.append("origins", JSON.stringify(origin));

      const result = await RegisterAPI(myForm);
      if (result?.data?.data) {
        Toast.show({
          type: "success",
          text1: "OTP Sent to Email",
          text2:
            "Check your inbox to complete account creation. If you don’t see it, check your spam folder.",
        });
        router.push({
          pathname: "/(auth)/verify",
          params: { emailText: email, from: "register" },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const ext = uri.split(".").pop()?.toLowerCase();
      if (["jpg", "jpeg", "png"].includes(ext || "")) {
        setImageUri(uri);
      } else {
        Alert.alert("Invalid Format", "Only JPG or PNG images are allowed.");
      }
    }
  };

  const fetchOrigins = async () => {
    try {
      setOriginLoading(true);

      const result = await GetOrigins();
      if (result?.data?.data) {
        setOriginData(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOriginLoading(false);
    }
  };

  useEffect(() => {
    fetchOrigins();
  }, []);

  const handleOrigin = (d: any) => {
    const origins = [...origin];

    const exists = origins.find(
      (f: any) => f.pincode === d?.pincode && f.name === d?.name
    );

    let updatedOrigins: any;
    if (exists) {
      // Remove the matching item
      updatedOrigins = origins.filter(
        (f: any) => !(f.pincode === d?.pincode && f.name === d?.name)
      );
    } else {
      // Add the new item
      updatedOrigins = [...origins, d];
    }

    setOrigin(updatedOrigins);
  };
  console.log(origin);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
      >
        <View style={AuthStyles.wrapper}>
          <Text style={AuthStyles.brand}>Create an account</Text>
          <Text style={AuthStyles.brand2}>Join the future of delivery.</Text>
          <View style={AuthStyles.toggleWrap}>
            <TouchableOpacity
              style={AuthStyles.toggleWrapLeft}
              onPress={() => router.push("/(auth)/login")}
            >
              <View>
                <Text style={AuthStyles.text}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={AuthStyles.toggleWrapRightActive}
              onPress={() => router.push("/(auth)/register")}
            >
              <View>
                <Text style={AuthStyles.textActive}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Name</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your name"
              onChangeText={(e) => setName(e)}
              value={name}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Phone</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your phone number"
              onChangeText={(e) => setPhone(e)}
              value={phone}
            />
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
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Address</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your address"
              onChangeText={(e) => setAddress(e)}
              value={address}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Origins</Text>

            <View style={AuthStyles.tags}>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  borderBottomColor: "#e4e4e4",
                  borderBottomWidth: 1,
                  height: 40,
                  marginBottom: 10,
                }}
              >
                <EvilIcons
                  name="search"
                  size={24}
                  color="#777777"
                  style={{ fontWeight: "600", marginBottom: 5 }}
                />
                <TextInput
                  value={search}
                  onChangeText={(e) => setSearch(e)}
                  placeholder="Enter origin name"
                  style={AuthStyles.tagInput}
                />
              </View>

              {originLoading ? (
                <ActivityIndicator />
              ) : originData?.filter((f: any) => f.name.includes(search))
                  ?.length === 0 ? (
                <Text style={[AuthStyles.label, { textAlign: "center" }]}>
                  No Origins Available
                </Text>
              ) : (
                originData
                  ?.filter((f: any) => f.name.includes(search))
                  ?.map((d: { name: string; pincode: string; _id: string }) => (
                    <TouchableOpacity
                      key={d?._id}
                      style={
                        origin.find(
                          (f: any) =>
                            f.pincode === d?.pincode && f.name === d.name
                        )
                          ? AuthStyles.tagOption2
                          : AuthStyles.tagOption
                      }
                      onPress={() =>
                        handleOrigin({ name: d?.name, pincode: d?.pincode })
                      }
                    >
                      <Feather name="map-pin" size={16} color="#A7774B" />
                      <View style={AuthStyles.texts}>
                        <Text style={AuthStyles.textp1}>{d?.pincode}</Text>
                        <Text>{d?.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
              )}
            </View>
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Upload Adhar Card</Text>
            <TouchableOpacity onPress={pickImages}>
              <View style={AuthStyles.uploader}>
                <Feather name="upload" size={26} color={"#002143"} />
                <Text style={AuthStyles.uploaderText}>
                  Please upload a clear image of your Aadhaar card (front side).
                  Accepted formats: JPG, PNG. Maximum 5MB.
                </Text>
              </View>
            </TouchableOpacity>
            {imageUri !== null && (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginTop: 10,
                  objectFit: "cover",
                }}
              />
            )}
          </View>

          <Link href={"/(auth)/login"} style={AuthStyles.link}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "600", fontFamily: "bold" }}>Login</Text>
          </Link>
          <TouchableOpacity onPress={handleRegister} disabled={loading}>
            <View style={AuthStyles.login}>
              <Text style={AuthStyles.textActive}>
                {loading ? <ActivityIndicator /> : "Register"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
