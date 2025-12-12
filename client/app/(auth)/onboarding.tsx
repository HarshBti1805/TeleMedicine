import React, { useEffect, useCallback, useState } from "react";
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
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { IconSymbol } from "@/components/ui/icon-symbol";

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get("window");

interface OnboardingSlide {
  title: string;
  description: string;
  icon: string;
  gradient: [string, string];
}

const slides: OnboardingSlide[] = [
  {
    title: "Connect with Healthcare Professionals",
    description:
      "Access qualified doctors and specialists from the comfort of your home. Schedule appointments and get medical consultations instantly.",
    icon: "person.2.fill",
    gradient: ["#6366f1", "#8b5cf6"],
  },
  {
    title: "Manage Your Health Records",
    description:
      "Keep all your medical records, prescriptions, and test results organized in one secure place. Access them anytime, anywhere.",
    icon: "doc.text.fill",
    gradient: ["#8b5cf6", "#ec4899"],
  },
  {
    title: "Track Your Health Journey",
    description:
      "Monitor your health metrics, set medication reminders, and track your wellness progress with our smart analytics dashboard.",
    icon: "chart.line.uptrend.xyaxis",
    gradient: ["#ec4899", "#f59e0b"],
  },
];

// Pagination dots component
const PaginationDots = ({
  slides,
  scrollX,
  primaryColor,
  width,
}: {
  slides: OnboardingSlide[];
  scrollX: ReturnType<typeof useSharedValue<number>>;
  primaryColor: string;
  width: number;
}) => {
  return (
    <View className="absolute top-20 left-0 right-0 flex-row justify-center gap-2">
      {slides.map((_, index) => {
        return (
          <PaginationDot
            key={index}
            index={index}
            scrollX={scrollX}
            primaryColor={primaryColor}
            width={width}
          />
        );
      })}
    </View>
  );
};

// Individual pagination dot component
const PaginationDot = ({
  index,
  scrollX,
  primaryColor,
  width,
}: {
  index: number;
  scrollX: ReturnType<typeof useSharedValue<number>>;
  primaryColor: string;
  width: number;
}) => {
  const dotAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const widthValue = interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
      "clamp"
    );
    const opacityValue = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      "clamp"
    );
    return {
      width: widthValue,
      opacity: opacityValue,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: primaryColor,
        },
        dotAnimatedStyle,
      ]}
    />
  );
};

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useAppFonts();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const primaryColor = isDark ? "#818CF8" : "#6366F1";

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);

  // Animation values
  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // Floating animation
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.quad) })
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
    const scale = interpolate(pulseAnim.value, [0, 1], [1, 1.1]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.3, 0.5]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      navigation.navigate("register" as never);
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

  // Slide component to properly use hooks
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
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1, 0.8],
        "clamp"
      );
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        "clamp"
      );
      return {
        transform: [{ scale }],
        opacity,
      };
    });

    const animatedFloatStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: floatAnim.value }],
      };
    });

    return (
      <View style={{ width }} className="flex-1 justify-center px-8">
        <Animated.View style={animatedSlideStyle} className="items-center">
          {/* Icon container */}
          <Animated.View
            style={[
              animatedFloatStyle,
              {
                shadowColor: slide.gradient[0],
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.5,
                shadowRadius: 30,
                elevation: 20,
              },
            ]}
            className="mb-12"
          >
            <LinearGradient
              colors={slide.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 140,
                height: 140,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconSymbol size={70} color="#fff" name={slide.icon as any} />
            </LinearGradient>
          </Animated.View>

          {/* Title */}
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-4xl font-bold text-neutral-900 dark:text-white text-center mb-6 leading-tight"
          >
            {slide.title}
          </Text>

          {/* Description */}
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-lg text-neutral-600 dark:text-neutral-300 text-center leading-7 px-4"
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

      {/* Skip button */}
      <View className="absolute top-12 right-6 z-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("register" as never)}
          activeOpacity={0.7}
        >
          <Text
            style={{ fontFamily: "NeueRegular" }}
            className="text-base text-neutral-600 dark:text-neutral-300"
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

      {/* Pagination dots */}
      <PaginationDots
        slides={slides}
        scrollX={scrollX}
        primaryColor={primaryColor}
        width={width}
      />

      {/* Navigation buttons */}
      <View className="absolute bottom-12 left-0 right-0 px-8">
        <View className="flex-row gap-4">
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={goToPrevious}
              activeOpacity={0.8}
              className="flex-1"
            >
              <BlurView
                intensity={isDark ? 40 : 60}
                tint={isDark ? "dark" : "light"}
                style={{
                  borderRadius: 20,
                  paddingVertical: 16,
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
                  Back
                </Text>
              </BlurView>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={goToNext}
            activeOpacity={0.8}
            className={currentIndex > 0 ? "flex-1" : "flex-1"}
          >
            <LinearGradient
              colors={isDark ? ["#4f46e5", "#4338ca"] : ["#6366f1", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                paddingVertical: 16,
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
                {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
