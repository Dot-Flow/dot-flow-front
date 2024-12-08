import {Image, StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Dimensions, TouchableHighlight, Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {FullWindowOverlay} from 'react-native-screens';
import {Camera, GripVertical, Paperclip, ShowerHead} from 'lucide-react-native';
import React, {useState} from 'react';
import {Link, router} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const {height} = Dimensions.get('window');

export default function HomeScreen() {

  const [toBraille, setToBraille] = useState(true);

  const handleButtonClick = (state: 'toBraille' | 'toText') => {
    setToBraille(state == 'toBraille' ? true : false);
  }

  var [isPress, setIsPress] = React.useState(false);

  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 3],
      });
      if (!result.canceled) {
        router.push({
          pathname: "/imageLoad/[load_image]",
          params: {load_image: result.assets[0].uri},
        });
      }
    } catch (error) {
      console.log("Error occurred while launching the camera: ", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      router.push({
        pathname: "/imageLoad/[load_image]",
        params: {load_image: result.assets[0].uri},
      });
    }
  };

  const handleKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key == "Enter") {
      Keyboard.dismiss();
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            multiline
            style={styles.input}
            placeholder="묵자 혹은 점자를 입력해주세요..."
            placeholderTextColor="#ccc"
            // onBlur={Keyboard.dismiss}
            enablesReturnKeyAutomatically
            onKeyPress={(e) => handleKeyDown(e)}
          // onPress={(e) => {console.log("e.nativeEvent.target : ", e.nativeEvent.target)}}
          // onPressOut={(e) => {e.nativeEvent.target == 'Enter' ? Keyboard.dismiss : null}}
          />
        </ThemedView>

      </ThemedView>

      <ThemedView style={styles.brailleOrText}>
        <TouchableOpacity
          style={toBraille ? styles.button_clicked : styles.button_notClicked}
          onPress={() => handleButtonClick('toBraille')}>
          <Text style={toBraille ? styles.buttonText_clicked : styles.buttonText_notClicked}>점역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!toBraille ? styles.button_clicked : styles.button_notClicked}
          onPress={() => handleButtonClick('toText')}>
          <Text style={!toBraille ? styles.buttonText_clicked : styles.buttonText_notClicked}>역점역</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          accessible={true}
          accessibilityLabel="사진 촬영"
          onPress={openCamera}>
          {/* <Camera color="#a4a4a7" size={40} absoluteStrokeWidth={true} style={styles.icons} onPress={openCamera}/> */}
          <Camera color="black" size={35} absoluteStrokeWidth={true} style={styles.buttonIcons} />
          <Text style={styles.buttonText_clicked}>사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fileButton}
          accessible={true}
          accessibilityLabel="파일 업로드"
          onPress={pickImage}>
          {/* <Paperclip color="#a4a4a7" size={35} absoluteStrokeWidth={true} style={styles.icons} onPress={pickImage}/> */}
          <Paperclip color="black" size={35} absoluteStrokeWidth={true} style={styles.buttonIcons} />
          <Text style={styles.buttonText_clicked}>파일 업로드</Text>
        </TouchableOpacity>

        <Link href="/result/1" asChild>
          <TouchableOpacity
            style={styles.goButton}
            onPress={Keyboard.dismiss}>
            <GripVertical color="black" size={35} absoluteStrokeWidth={true} style={styles.buttonIcons} />
            <Text style={styles.goButtonText}>번역하기</Text>
          </TouchableOpacity>
        </Link>

      </ThemedView>
    </ThemedView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1
  },
  inputContainer: {
    // marginTop: 30,
    // height: height * 1 / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    // height: height * 1 / 3,
    fontSize: 18,
    paddingVertical: 20,
  },
  brailleOrText: {
    height: 120,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button_clicked: {
    flexBasis: '50%',
    backgroundColor: '#FFF9BF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E2E2E5',
    height: 120,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  button_notClicked: {
    flexBasis: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E2E2E5',
    borderLeftWidth: 0,
    borderWidth: 1,
    height: 120
  },
  icons: {
    marginRight: 10
  },
  goButton: {
    backgroundColor: '#CB9DF0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    flexBasis: '100%',
  },
  cameraButton: {
    backgroundColor: '#FDDBBB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    flexBasis: '100%',
  },
  fileButton: {
    backgroundColor: '#F0C1E1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    flexBasis: '100%',
  },
  goButtonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonText_clicked: {
    color: 'black',
    fontSize: 16,
  },
  buttonText_notClicked: {
    color: '#a4a4a7',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonIcons: {
    marginBottom: 10
  }
});
