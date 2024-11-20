import { Image, StyleSheet, Platform, Text, TextInput, View, TouchableOpacity,Dimensions, TouchableHighlight, Keyboard } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {FullWindowOverlay} from 'react-native-screens';
import {Camera, Paperclip} from 'lucide-react-native';
import React, {useState} from 'react';
import {Link} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

// import {Camera} from 'lucide-react-native';
const { height } = Dimensions.get('window');

export default function HomeScreen() {

  const [ toBraille, setToBraille ] = useState(true);

  const handleButtonClick = (state: 'toBraille' | 'toText') => {
    setToBraille(state == 'toBraille' ? true : false);
  }

  var [ isPress, setIsPress ] = React.useState(false);

  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
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
        console.log(result);
      }
    } catch (error) {
      console.log("Error occurred while launching the camera: ", error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <ThemedView style={styles.container}>
     <ThemedView style={styles.inputContainer}>
     {image && <Image source={{ uri: image }} style={styles.image} />}

        <TextInput
        multiline
          style={styles.input}
          placeholder="묵자 혹은 점자를 입력해주세요..."
          placeholderTextColor="#ccc"
        />
      </ThemedView>

      <ThemedView style={styles.goContainer}>

        <ThemedView style={styles.iconsContainer}>
        <TouchableOpacity 
          accessible={true}
        accessibilityLabel="사진 업로드">
          <Camera color="#a4a4a7" size={40} absoluteStrokeWidth={true} style={styles.icons} onPress={openCamera}/>
        </TouchableOpacity>
        <TouchableOpacity
        accessible={true}
        accessibilityLabel="파일 업로드">
          <Paperclip color="#a4a4a7" size={35} absoluteStrokeWidth={true} style={styles.icons} onPress={pickImage}/>
        </TouchableOpacity>
        </ThemedView>
        
        <Link href="/result/1" asChild>
        <TouchableOpacity
          style={styles.goButton}
          onPress={Keyboard.dismiss}>
          <Text style={styles.goButtonText}>번역하기</Text>
        </TouchableOpacity>
        </Link>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={toBraille ? styles.button_clicked : styles.button_notClicked}
          onPress={() => handleButtonClick('toBraille')}>
          <Text style={toBraille ? styles.buttonText_clicked : styles.buttonText_notClicked}>묵자 → 점자</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={!toBraille ? styles.button_clicked : styles.button_notClicked}
          onPress={() => handleButtonClick('toText')}>
          <Text style={!toBraille ? styles.buttonText_clicked : styles.buttonText_notClicked}>점자 → 묵자</Text>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    // marginTop: 30,
    height: height * 1 / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: height * 1 / 3,
    fontSize: 18,
    paddingVertical: 20,
  },
  goContainer:{
    height: 50,
    borderColor: '#E2E2E5',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  iconsContainer:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons:{
    marginRight: 10
  },
  goButton: {
    backgroundColor: '#7359FF',
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    height: 40,
    width: 100,
  },
  goButtonText:{
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  button_clicked: {
    flexBasis: '100%',
    backgroundColor: '#F7F5FF',
    borderWidth: 1,
    borderColor: '#7359FF',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    height: 120
  },
  button_notClicked: {
    flexBasis: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E2E5',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    height: 120
  },
  buttonText_clicked: {
    color: '#7359FF',
    fontSize: 16,
  },
  buttonText_notClicked: {
    color: '#a4a4a7',
    fontSize: 16,
  },
  btnNormal: {
    flexBasis: '48%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F7F5FF',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    height: 130
  },
  btnPress: {
    flexBasis: '48%',
    backgroundColor: '#F7F5FF',
    borderWidth: 1,
    borderColor: '#7359FF',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    height: 130
  },
  image: {
    width: 200,
    height: 200,
  },
});
