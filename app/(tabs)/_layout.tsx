import { Tabs } from "expo-router";
import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  return (
    <Tabs
   initialRouteName="upcoming"
      screenOptions={{
        tabBarActiveTintColor: "#834B12",
        tabBarInactiveTintColor: "#504B4B",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 110,
        
        },
      }}
    >
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="shopping-search"
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="payment" size={18} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
