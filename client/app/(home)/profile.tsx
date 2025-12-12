import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "@/utils/fonts";
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

export default function ProfileScreen() {
  const [fontsLoaded] = useAppFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View className="flex-1" onLayout={onLayoutRootView}>
      <LinearGradient
        colors={
          isDark
            ? ["#0f172a", "#1e1b4b", "#312e81"]
            : ["#f8fafc", "#e0e7ff", "#c7d2fe"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 60,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center">
          <Text
            style={{ fontFamily: "NeueBold" }}
            className="text-3xl text-neutral-900 dark:text-white mb-4"
          >
            Profile
          </Text>
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-base text-neutral-600 dark:text-neutral-400 text-center"
          >
            This screen will be implemented soon
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
