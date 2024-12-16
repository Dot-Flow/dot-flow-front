// app/_layout.tsx
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import 'react-native-reanimated';
import * as Font from 'expo-font';

import {useColorScheme} from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync(); // keep the splash screen visible

export default function StackLayout() {
  const colorScheme = useColorScheme();

  // 1. Load custom fonts
  const [fontsLoaded] = Font.useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // 2. Artificial delay or other async tasks
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // For demonstration, wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  // 3. Hide splash once *both* fonts & other tasks are ready + layout is complete
  const onLayoutRootView = useCallback(async () => {
    if (appReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appReady, fontsLoaded]);

  // 4. If not fully ready yet, render null => still showing splash
  if (!fontsLoaded || !appReady) {
    return null;
  }

  // 5. Wrap Stack in a top-level View that calls `onLayoutRootView`
  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <ThemeProvider value={DefaultTheme}>
        {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
        <Stack>
          <Stack.Screen name="index" options={{title: 'DotFlow'}} />
          <Stack.Screen name="(tabs)" options={{headerShown: false, title: '홈'}} />
          <Stack.Screen
            name="imageLoad/index"
            options={{title: 'Parent Header', headerShown: true}}
          />
          <Stack.Screen
            name="imageLoad/[load_image]"
            options={{headerShown: false}}
          />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
