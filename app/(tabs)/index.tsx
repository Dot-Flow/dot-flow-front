import { Image, StyleSheet, Platform, Text, TextInput, View, TouchableOpacity,Dimensions, TouchableHighlight, Keyboard } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {FullWindowOverlay} from 'react-native-screens';
import {Camera, Paperclip} from 'lucide-react-native';
import React, {useState} from 'react';
import {Link} from 'expo-router';
// import {Camera} from 'lucide-react-native';
const { height } = Dimensions.get('window');

export default function HomeScreen() {

  const [ toBraille, setToBraille ] = useState(false);

  const handleButtonClick = (state: 'toBraille' | 'toText') => {
    setToBraille(state == 'toBraille' ? true : false);
  }

  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
  };
  
  return (
    <ThemedView style={styles.container}>
     <ThemedView style={styles.inputContainer}>
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
          <Camera color="#a4a4a7" size={40} absoluteStrokeWidth={true} style={styles.icons}/>
        </TouchableOpacity>
        <TouchableOpacity
        accessible={true}
        accessibilityLabel="파일 업로드">
          <Paperclip color="#a4a4a7" size={35} absoluteStrokeWidth={true} style={styles.icons}/>
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
  }
});
