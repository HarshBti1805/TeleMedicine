import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { useAppFonts } from "@/utils/fonts";
import * as SplashScreen from "expo-splash-screen";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useAppFonts();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const primaryColor = isDark ? "#818CF8" : "#6366F1";

  // Animation values
  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);
  const waveAnim = useSharedValue(0);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // Floating animation
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // Pulse animation
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Wave animation
    waveAnim.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedFloatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatAnim.value }],
    };
  });

  const animatedPulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [1, 1.15]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.4, 0.7]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const animatedWaveStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      waveAnim.value,
      [0, 1],
      [-width * 0.3, width * 0.3]
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      className="flex-1"
      onLayout={onLayoutRootView}
      style={StyleSheet.absoluteFill}
    >
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

      {/* Animated background elements */}
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: 200,
            backgroundColor: isDark ? "#4f46e5" : "#818cf8",
          },
        ]}
      />
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            bottom: -50,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: isDark ? "#818cf8" : "#4f46e5",
          },
        ]}
      />

      {/* Wave decoration */}
      <Animated.View
        style={[
          animatedWaveStyle,
          {
            position: "absolute",
            bottom: height * 0.15,
            width: width * 1.5,
            height: 100,
            backgroundColor: isDark
              ? "rgba(129, 140, 248, 0.1)"
              : "rgba(99, 102, 241, 0.1)",
            borderRadius: 50,
          },
        ]}
      />

      <View className="flex-1 justify-center px-6">
        {/* Logo section */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={[animatedFloatStyle]}
          className="items-center mb-12"
        >
          <View
            style={{
              shadowColor: primaryColor,
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.6,
              shadowRadius: 30,
              elevation: 20,
              backgroundColor: isDark
                ? "rgba(129, 140, 248, 0.3)"
                : "rgba(99, 102, 241, 0.2)",
            }}
            className="w-32 h-32 rounded-3xl justify-center items-center mb-6"
          >
            <AntDesign name="cloud" size={80} color={primaryColor} />
          </View>
        </Animated.View>

        {/* Welcome text */}
        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4 text-center"
          >
            Welcome to
          </Text>
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight mb-6 text-center"
          >
            TellerHub
          </Text>
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-lg text-neutral-600 dark:text-neutral-300 text-center px-4 leading-6"
          >
            Your trusted companion for seamless telemedicine experiences.
            Connect with healthcare professionals from anywhere, anytime.
          </Text>
        </Animated.View>

        {/* Action buttons */}
        <Animated.View
          entering={FadeInUp.delay(600).springify()}
          className="mt-12 gap-4"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("onboarding" as never)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isDark ? ["#4f46e5", "#4338ca"] : ["#6366f1", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                paddingVertical: 18,
                shadowColor: "#4f46e5",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Text
                style={{ fontFamily: "NeueRegular" }}
                className="text-center text-white text-lg font-semibold"
              >
                Get Started
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("register" as never)}
            activeOpacity={0.8}
          >
            <BlurView
              intensity={isDark ? 40 : 60}
              tint={isDark ? "dark" : "light"}
              style={{
                borderRadius: 20,
                paddingVertical: 18,
                borderWidth: 1,
                borderColor: isDark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)",
              }}
            >
              <Text
                style={{ fontFamily: "NeueRegular" }}
                className="text-center text-neutral-900 dark:text-white text-lg font-semibold"
              >
                Skip to Register
              </Text>
            </BlurView>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
