import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Example logic to check if the user is authenticated
  useEffect(() => {
    const userLoggedIn = false; // Replace this with your actual login logic
    setIsAuthenticated(userLoggedIn);
  }, []);

  if (!loaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide the header globally for all screens
        }}
      >
        {isAuthenticated ? (
          // The TabLayout will be mapped automatically under /tabs
          <Stack.Screen name="(tabs)" />
        ) : (
          // Show login screen if not authenticated
          <Stack.Screen name="LoginScreen" />
        )}
        <Stack.Screen name="SignUpScreen" />
        <Stack.Screen name="SupportScreen" />
        <Stack.Screen name="EditProfileScreen" />
        <Stack.Screen name="NotificationScreen" />
        <Stack.Screen name="ProductDetailsScreen" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
