import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
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
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

interface OnboardingSlide {
  title: string;
  subtitle: string;
  description: string;
  icon: "users" | "folder" | "trending-up";
  color: string;
  secondaryColor: string;
}

const slides: OnboardingSlide[] = [
  {
    title: "Connect",
    subtitle: "with Healthcare Professionals",
    description:
      "Access qualified doctors and specialists from the comfort of your home. Schedule appointments and get medical consultations instantly.",
    icon: "users",
    color: "#6366f1",
    secondaryColor: "#818CF8",
  },
  {
    title: "Manage",
    subtitle: "Your Health Records",
    description:
      "Keep all your medical records, prescriptions, and test results organized in one secure place. Access them anytime, anywhere.",
    icon: "folder",
    color: "#8b5cf6",
    secondaryColor: "#A78BFA",
  },
  {
    title: "Track",
    subtitle: "Your Health Journey",
    description:
      "Monitor your health metrics, set medication reminders, and track your wellness progress with our smart analytics dashboard.",
    icon: "trending-up",
    color: "#ec4899",
    secondaryColor: "#F472B6",
  },
];

// Animated pagination dots component
const PaginationDots = ({
  currentIndex,
  slides,
}: {
  currentIndex: number;
  slides: OnboardingSlide[];
}) => {
  return (
    <View className="flex-row justify-center gap-3 mb-8">
      {slides.map((slide, index) => (
        <View
          key={index}
          style={{
            height: 6,
            width: currentIndex === index ? 32 : 6,
            borderRadius: 3,
            backgroundColor: currentIndex === index ? slide.color : "#d1d5db",
            opacity: currentIndex === index ? 1 : 0.5,
          }}
        />
      ))}
    </View>
  );
};

export default function OnboardingScreen() {
  const [fontsLoaded] = useAppFonts();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#0f172a" : "#f8fafc";

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);

  // Animation values
  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);

  const currentSlide = slides[currentIndex];

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // Floating animation
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // Pulse animation for background
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const animatedPulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [1, 1.15]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.1, 0.2]);
    return { transform: [{ scale }], opacity };
  });

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      router.push("/register");
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex - 1) * width,
        animated: true,
      });
    }
  };

  // Slide component
  const SlideComponent = ({
    slide,
    index,
    scrollX,
    floatAnim,
  }: {
    slide: OnboardingSlide;
    index: number;
    scrollX: ReturnType<typeof useSharedValue<number>>;
    floatAnim: ReturnType<typeof useSharedValue<number>>;
  }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const animatedSlideStyle = useAnimatedStyle(() => {
      const scale = interpolate(scrollX.value, inputRange, [0.85, 1, 0.85], "clamp");
      const opacity = interpolate(scrollX.value, inputRange, [0.4, 1, 0.4], "clamp");
      return { transform: [{ scale }], opacity };
    });

    const animatedFloatStyle = useAnimatedStyle(() => {
      return { transform: [{ translateY: floatAnim.value }] };
    });

    return (
      <View style={{ width }} className="flex-1 justify-center px-8">
        <Animated.View style={animatedSlideStyle} className="items-center">
          {/* Icon container with glow effect */}
          <Animated.View style={animatedFloatStyle} className="mb-10">
            {/* Outer glow ring */}
            <View
              style={{
                width: 180,
                height: 180,
                borderRadius: 60,
                backgroundColor: `${slide.color}15`,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Middle ring */}
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 50,
                  backgroundColor: `${slide.color}25`,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Inner container */}
                <View
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: slide.color,
                    shadowColor: slide.color,
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.4,
                    shadowRadius: 20,
                    elevation: 12,
                  }}
                >
                  <Feather name={slide.icon} size={50} color="#fff" />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Step indicator */}
          <View
            style={{
              backgroundColor: `${slide.color}20`,
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            <Text
              style={{ fontFamily: "NeueRegular", color: slide.color }}
              className="text-sm"
            >
              Step {index + 1} of {slides.length}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{ fontFamily: "NeueBold", color: slide.color }}
            className="text-5xl text-center mb-1"
          >
            {slide.title}
          </Text>
          <Text
            style={{ fontFamily: "NeueBold" }}
            className="text-2xl text-neutral-800 dark:text-neutral-100 text-center mb-5"
          >
            {slide.subtitle}
          </Text>

          {/* Description */}
          <Text
            style={{ fontFamily: "NeueRegular", lineHeight: 26 }}
            className="text-base text-neutral-500 dark:text-neutral-400 text-center px-2"
          >
            {slide.description}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View
      className="flex-1"
      onLayout={onLayoutRootView}
      style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]}
    >
      {/* Animated background decorations */}
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            top: -height * 0.12,
            right: -width * 0.25,
            width: width * 0.7,
            height: width * 0.7,
            borderRadius: width * 0.35,
            backgroundColor: currentSlide.color,
          },
        ]}
      />
      <Animated.View
        style={[
          animatedPulseStyle,
          {
            position: "absolute",
            bottom: -height * 0.08,
            left: -width * 0.2,
            width: width * 0.5,
            height: width * 0.5,
            borderRadius: width * 0.25,
            backgroundColor: currentSlide.secondaryColor,
            opacity: 0.1,
          },
        ]}
      />

      {/* Skip button */}
      <View className="absolute top-14 right-6 z-10">
        <TouchableOpacity
          onPress={() => router.push("/register")}
          activeOpacity={0.7}
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-sm text-neutral-600 dark:text-neutral-300"
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable slides */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        className="flex-1"
        contentContainerStyle={{ paddingTop: height * 0.08 }}
      >
        {slides.map((slide, index) => (
          <SlideComponent
            key={index}
            slide={slide}
            index={index}
            scrollX={scrollX}
            floatAnim={floatAnim}
          />
        ))}
      </Animated.ScrollView>

      {/* Bottom section */}
      <View className="px-8 pb-10">
        {/* Pagination dots */}
        <PaginationDots currentIndex={currentIndex} slides={slides} />

        {/* Navigation buttons */}
        <View className="flex-row gap-4">
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={goToPrevious}
              activeOpacity={0.8}
              className="flex-1"
              style={{
                borderRadius: 16,
                paddingVertical: 18,
                borderWidth: 1.5,
                borderColor: isDark
                  ? `${currentSlide.color}50`
                  : `${currentSlide.color}40`,
                backgroundColor: isDark
                  ? `${currentSlide.color}10`
                  : `${currentSlide.color}08`,
              }}
            >
              <View className="flex-row items-center justify-center gap-2">
                <Feather
                  name="arrow-left"
                  size={18}
                  color={currentSlide.color}
                />
                <Text
                  style={{ fontFamily: "NeueRegular", color: currentSlide.color }}
                  className="text-center text-lg"
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={goToNext}
            activeOpacity={0.85}
            className="flex-1"
            style={{
              backgroundColor: currentSlide.color,
              borderRadius: 16,
              paddingVertical: 18,
              shadowColor: currentSlide.color,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text
                style={{ fontFamily: "NeueRegular" }}
                className="text-center text-white text-lg"
              >
                {currentIndex === slides.length - 1 ? "Get Started" : "Continue"}
              </Text>
              <Feather
                name={currentIndex === slides.length - 1 ? "check" : "arrow-right"}
                size={18}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
