import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="person.badge.plus.fill" color={color} />
            <AntDesign name="login" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="key.fill" color={color} />
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
