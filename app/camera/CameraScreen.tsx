import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {CameraView} from 'expo-camera';  // The new component
import type {CameraView as CameraViewType} from 'expo-camera';

export default function CameraViewScreen() {
    const [facing, setFacing] = useState<'front' | 'back'>('back');
    const cameraRef = useRef<CameraViewType>(null);
    const router = useRouter();

    const takePhoto = async () => {
        if (cameraRef.current) {
            const result = await cameraRef.current.takePictureAsync();
            console.log('Photo URI:', result?.uri);
            if (result?.uri) {
                router.push({pathname: '/imageLoad/[load_image]', params: {load_image: result?.uri}});

            }
        }
    };

    return (
        <View style={{flex: 1}}>
            <CameraView
                ref={cameraRef}
                style={{flex: 1}}
                facing={facing}
            >
                <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
                    <TouchableOpacity onPress={takePhoto}>
                        <Text style={{color: 'white', fontSize: 20}}>CAPTURE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFacing(f => f === 'front' ? 'back' : 'front')}>
                        <Text style={{color: 'white', fontSize: 20}}>FLIP</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}
