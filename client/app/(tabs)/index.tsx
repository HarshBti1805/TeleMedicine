import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
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

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol";

// Data for iteration
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
        withTiming(-12, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Pulse animation for background elements
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedFloatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatAnim.value }],
    };
  });

  const animatedPulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [1, 1.1]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.3, 0.5]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const animatedPulseStyle2 = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [1, 1.15]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.3, 0.5]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View className="flex-1 bg-indigo-50/30 dark:bg-neutral-950">
      {/* Enhanced ambient background blobs */}
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            top: 40,
            left: -128,
            width: 320,
            height: 320,
            borderRadius: 160,
            backgroundColor: isDark
              ? "rgba(99, 102, 241, 0.15)"
              : "rgba(99, 102, 241, 0.2)",
          },
        ]}
      />
      <Animated.View
        style={[
          animatedPulseStyle2,
          {
            position: "absolute",
            bottom: 80,
            right: -128,
            width: 384,
            height: 384,
            borderRadius: 192,
            backgroundColor: isDark
              ? "rgba(168, 85, 247, 0.15)"
              : "rgba(168, 85, 247, 0.2)",
          },
        ]}
      />
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 288,
          height: 288,
          borderRadius: 144,
          backgroundColor: isDark
            ? "rgba(139, 92, 246, 0.1)"
            : "rgba(196, 181, 253, 0.1)",
          transform: [{ translateX: -144 }, { translateY: -144 }],
        }}
      />

      <ParallaxScrollView
        headerBackgroundColor={{
          light: primaryColor,
          dark: "#0A0E27",
        }}
        headerImage={
          <View className="flex-1 justify-center items-center relative overflow-hidden">
            {/* Enhanced abstract background shapes */}
            <Animated.View
              entering={FadeInUp.duration(1200)}
              style={{
                position: "absolute",
                width: 320,
                height: 320,
                borderRadius: 160,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                top: -128,
                right: -80,
              }}
            />
            <Animated.View
              entering={FadeInUp.duration(1200).delay(300)}
              style={{
                position: "absolute",
                width: 224,
                height: 224,
                borderRadius: 112,
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                bottom: 32,
                left: 32,
              }}
            />
            <Animated.View
              entering={FadeInUp.duration(1200).delay(600)}
              style={{
                position: "absolute",
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                top: "50%",
                left: -48,
                transform: [{ translateY: -80 }],
              }}
            />

            {/* Main Header Icon with enhanced floating animation */}
            <Animated.View
              style={[animatedFloatStyle]}
              entering={FadeInDown.delay(400).springify().damping(15)}
              className="z-10"
            >
              <View className="relative">
                {/* Glow effect behind icon */}
                <View
                  style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    top: -50,
                    left: -50,
                  }}
                />
                <IconSymbol
                  size={100}
                  color="rgba(255,255,255,0.98)"
                  name="house.fill"
                />
              </View>
            </Animated.View>
          </View>
        }
      >
        <View className="flex-1 px-6 pb-12 gap-10 mt-6">
          {/* Enhanced Hero Section */}
          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(12)}
            className="gap-3"
          >
            <View className="flex-row items-center gap-3 flex-wrap">
              <Text className="text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                TellerHub
              </Text>
              <HelloWave />
            </View>
            <Text className="text-xl text-neutral-700 dark:text-neutral-200 leading-7 font-medium max-w-[90%]">
              Financial freedom in your pocket. Manage, invest, and grow your
              wealth effortlessly.
            </Text>
          </Animated.View>

          {/* Enhanced Feature Cards Section */}
          <View className="gap-6">
            <Animated.View entering={FadeInDown.delay(600)}>
              <Text className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Features
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Everything you need for modern banking
              </Text>
            </Animated.View>

            <View className="gap-5">
              {FEATURES.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(700 + index * 120)
                    .springify()
                    .damping(14)}
                >
                  <Pressable
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    })}
                  >
                    <View className="flex-row p-6 rounded-3xl items-center gap-5 bg-white/80 dark:bg-neutral-800/80 border border-white/90 dark:border-neutral-700/60 shadow-lg">
                      {/* Enhanced Icon Container */}
                      <View className="w-16 h-16 rounded-2xl justify-center items-center bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-700/40 shadow-sm">
                        <IconSymbol
                          size={28}
                          color={primaryColor}
                          name={item.icon as any}
                        />
                      </View>

                      {/* Enhanced Content */}
                      <View className="flex-1 gap-1.5">
                        <Text className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                          {item.title}
                        </Text>
                        <Text className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-6">
                          {item.desc}
                        </Text>
                      </View>

                      {/* Subtle arrow indicator */}
                      <View className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700/50 justify-center items-center">
                        <IconSymbol
                          size={16}
                          color={isDark ? "#9CA3AF" : "#6B7280"}
                          name="chevron.right"
                        />
                      </View>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Enhanced Modern CTA Card */}
          <Animated.View
            entering={FadeInUp.delay(1200).springify().damping(12)}
          >
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.95 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <View
                className="relative overflow-hidden rounded-3xl"
                style={{
                  backgroundColor: isDark ? "#4F46E5" : "#6366F1",
                }}
              >
                {/* Decorative pattern overlay */}
                <View style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 128,
                      height: 128,
                      borderRadius: 64,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: 160,
                      height: 160,
                      borderRadius: 80,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </View>

                {/* Content */}
                <View className="relative flex-row p-7 items-center justify-between">
                  <View className="flex-1 gap-2">
                    <Text className="text-2xl font-bold text-white tracking-tight">
                      Upgrade to Pro
                    </Text>
                    <Text className="text-base text-indigo-50/95 font-medium leading-5">
                      Unlock exclusive cards, higher limits, and premium
                      features today.
                    </Text>
                  </View>
                  <View className="ml-4 w-14 h-14 rounded-full bg-white/25 border border-white/30 justify-center items-center shadow-lg">
                    <IconSymbol size={24} color="#fff" name="chevron.right" />
                  </View>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}
