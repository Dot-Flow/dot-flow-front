import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  console.log('StackLayout loaded');

  return (
    <ThemeProvider value={DefaultTheme}>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <Stack>
        <Stack.Screen
          name="index" options={{title: 'DotFlow'}}
        />
        <Stack.Screen name="(tabs)" options={{headerShown: false, title: '홈'}} />
        <Stack.Screen
          name="imageLoad"
          options={{headerShown: false, title: '이미지 로딩중'}}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default StackLayout;
