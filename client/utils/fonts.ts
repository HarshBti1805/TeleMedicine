import { useFonts } from "expo-font";

/**
 * Global font configuration for the app
 * This centralizes all font loading to avoid duplication across components
 */
export const fontConfig = {
  SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  BroadWay: require("../assets/fonts/Broadway.ttf"),
  Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  NeueRegular: require("../assets/fonts/NeueMachina-Regular.otf"),
  NeueBold: require("../assets/fonts/NeueMachina-Ultrabold.otf"),
  Gotham: require("../assets/fonts/Gotham.ttf"),
  CenturyGothic: require("../assets/fonts/CenturyGothic.ttf"),
};

/**
 * Hook to load all fonts
 * @returns [fontsLoaded] - boolean indicating if fonts are loaded
 */
export const useAppFonts = () => {
  return useFonts(fontConfig);
};

/**
 * Font family names for use in style props
 */
export const Fonts = {
  SpaceMono: "SpaceMono",
  BroadWay: "BroadWay",
  Poppins: "Poppins",
  NeueRegular: "NeueRegular",
  NeueBold: "NeueBold",
  Gotham: "Gotham",
  CenturyGothic: "CenturyGothic",
} as const;
