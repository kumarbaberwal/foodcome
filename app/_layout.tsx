import useAuthStore from "@/store/auth.store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  })

  useEffect(() => {
    if (error) throw error;
    // Hide the splash screen once the fonts are loaded
    // and there are no errors.
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [])

  if (isLoading || !fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <Stack screenOptions={{
      headerShown: false,
    }} />
  );
}
