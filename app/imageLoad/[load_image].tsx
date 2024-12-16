import React, {useEffect, useRef, useState} from "react";
import {View, Image, StyleSheet, ActivityIndicator, Animated} from "react-native";
import {useRouter, useLocalSearchParams} from "expo-router";
import translationApi from "@/services/translationApi";

export default function LoadingScreen() {
  const router = useRouter();
  const {load_image, toBraille} = useLocalSearchParams();
  const isToBraille = toBraille === "true" ? true : false;

  useEffect(() => {
    fetchImageTranslation();
  }, [router]);

  if (!load_image || typeof load_image !== "string") {
    return null;
  }

  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    // Start a looped animation that scales from 1 to 1.2, then back to 1
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [scaleAnim]);


  const fetchImageTranslation = async () => {
    // 점역
    if (isToBraille) {
      try {
        let result = await translationApi.imageToBrf(load_image);
        if (result) {
          console.log(result);
          router.replace({
            pathname: "/result/toBrailleResult",
            params: {
              summary: result.summary,
              unicodeArray: result.unicodeArray,
              brfFile: result.brfFile,
            },
          });
        }
      } catch (error) {
        console.log("Error occurred while getting braille response: ", error);
      }
      return;
    }

    // 역점역
    try {
      let result = await translationApi.imageToText(load_image);
      if (result) {
        console.log(result);
        router.replace({
          pathname: "/result/toTextResult",
          params: {
            summary: result.summary,
            result: result.result,
            textFile: result.textFile,
          },
        });
      }
    } catch (error) {
      console.log("Error occurred while getting braille response: ", error);
    }
    return;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: load_image}} style={styles.image} />
      <View style={styles.overlay}>
        <Animated.Text
          style={[
            styles.loadingText,
            {transform: [{scale: scaleAnim}]}
          ]}
        >
          로딩중...
        </Animated.Text>
      </View>
    </View>
  );
}

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
