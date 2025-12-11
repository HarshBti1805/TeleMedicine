import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol";

const FEATURES = [
  {
    id: 1,
    title: "Fast Transactions",
    icon: "paperplane.fill",
    desc: "Send and receive money instantly with our secure payment system.",
  },
  {
    id: 2,
    title: "Smart Analytics",
    icon: "chart.bar.fill",
    desc: "Track your spending and get insights into your financial habits.",
  },
  {
    id: 3,
    title: "Secure Banking",
    icon: "lock.shield.fill",
    desc: "Bank-level security to keep your money and data safe.",
  },
];

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const primaryColor = isDark ? "#818CF8" : "#6366F1";

  // --- Animations ---
  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);

  useEffect(() => {
    // Continuous floating animation for header icon
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // Pulse animation for background elements
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const animatedFloatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatAnim.value }],
    };
  });

  const animatedPulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [1, 1.05]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.3, 0.6]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View className="flex-1">
      {/* Dynamic Background Gradient */}
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

      {/* Ambient Background Blobs */}
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            top: -50,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: 200,
            backgroundColor: isDark ? "#4f46e5" : "#818cf8",
            opacity: 0.2,
          },
        ]}
      />
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            bottom: -50,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: isDark ? "#818cf8" : "#4f46e5",
            opacity: 0.15,
          },
        ]}
      />

      <ParallaxScrollView
        headerBackgroundColor={{
          light: "#f8fafc",
          dark: "#0f172a",
        }}
        headerImage={
          <View className="flex-1 justify-center items-center relative overflow-hidden">
            <LinearGradient
              colors={
                isDark ? ["#312e81", "transparent"] : ["#c7d2fe", "transparent"]
              }
              style={StyleSheet.absoluteFill}
            />

            {/* Abstract shapes */}
            <Animated.View
              entering={FadeInUp.duration(1000).springify()}
              style={{
                position: "absolute",
                top: "10%",
                right: "10%",
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.4)",
              }}
            />

            {/* Main Icon */}
            <Animated.View
              style={[animatedFloatStyle]}
              entering={FadeInDown.delay(300).springify()}
              className="z-10 items-center justify-center"
            >
              <View
                style={{
                  shadowColor: primaryColor,
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <IconSymbol
                  size={120}
                  color={isDark ? "#fff" : "#4338ca"}
                  name="house.fill"
                />
              </View>
            </Animated.View>
          </View>
        }
      >
        <View className="flex-1 px-5 pb-20 gap-8 mt-4">
          {/* Hero Section */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="gap-2"
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter">
                TellerHub
              </Text>
              <HelloWave />
            </View>
            <Text className="text-lg text-neutral-600 dark:text-neutral-300 font-medium leading-6">
              Next-gen banking with a touch of glass.
            </Text>
          </Animated.View>

          {/* Features List */}
          <View className="gap-4">
            <Animated.View entering={FadeInDown.delay(500)}>
              <Text className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Features
              </Text>
            </Animated.View>

            {FEATURES.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(600 + index * 100).springify()}
              >
                <Pressable
                  style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  })}
                >
                  <BlurView
                    intensity={isDark ? 40 : 60}
                    tint={isDark ? "dark" : "light"}
                    style={{
                      overflow: "hidden",
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <View className="flex-row p-5 items-center gap-4">
                      <View
                        className={`w-14 h-14 rounded-2xl justify-center items-center ${isDark ? "bg-indigo-500/20" : "bg-indigo-100"}`}
                      >
                        <IconSymbol
                          size={26}
                          color={primaryColor}
                          name={item.icon as any}
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-lg font-bold text-neutral-900 dark:text-white">
                          {item.title}
                        </Text>
                        <Text className="text-sm text-neutral-600 dark:text-neutral-300 leading-5 mt-1">
                          {item.desc}
                        </Text>
                      </View>
                      <IconSymbol
                        size={20}
                        color={isDark ? "#6b7280" : "#9ca3af"}
                        name="chevron.right"
                      />
                    </View>
                  </BlurView>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* CTA Card */}
          <Animated.View entering={FadeInUp.delay(1000).springify()}>
            <Pressable
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <LinearGradient
                colors={
                  isDark ? ["#4f46e5", "#4338ca"] : ["#6366f1", "#4f46e5"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 24,
                  padding: 2,
                  shadowColor: "#4f46e5",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 8,
                }}
              >
                <View className="p-6 flex-row items-center justify-between">
                  <View className="flex-1 gap-1">
                    <Text className="text-xl font-bold text-white">
                      Go Premium
                    </Text>
                    <Text className="text-indigo-100 font-medium">
                      Unlock limitless possibilities.
                    </Text>
                  </View>
                  <View className="w-10 h-10 rounded-full bg-white/20 justify-center items-center">
                    <IconSymbol size={20} color="#fff" name="arrow.right" />
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}
