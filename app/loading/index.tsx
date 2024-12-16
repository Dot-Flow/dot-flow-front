// FancyLoadingOverlay.tsx
import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';

interface LoadingOverlayProps {
    visible: boolean;
}

export default function LoadingOverlay({visible}: LoadingOverlayProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (visible) {
            // Start pulsing
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

            // Cleanup if overlay goes away
            return () => pulseAnimation.stop();
        } else {
            // If not visible, reset scale to 1
            scaleAnim.setValue(1);
        }
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <Animated.Text style={[styles.loadingText, {transform: [{scale: scaleAnim}]}]}>
                로딩중...
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    loadingText: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
