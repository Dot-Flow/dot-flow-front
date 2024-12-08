import React, {useEffect} from "react";
import {View, Image, StyleSheet, ActivityIndicator} from "react-native";
import {useRouter, useLocalSearchParams} from "expo-router";

export default function LoadingScreen() {
  const router = useRouter();
  const {load_image} = useLocalSearchParams();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/result/1");
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  if (!load_image || typeof load_image !== "string") {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: load_image}} style={styles.image} />
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
}

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
});
