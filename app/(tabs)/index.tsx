import { Image, StyleSheet, Platform, Text, TextInput, View, TouchableOpacity,Dimensions, TouchableHighlight } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {FullWindowOverlay} from 'react-native-screens';
import {Camera, Paperclip} from 'lucide-react-native';
import React from 'react';
// import {Camera} from 'lucide-react-native';
const { height } = Dimensions.get('window');

export default function HomeScreen() {

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
          style={styles.input}
          placeholder="검색어를 입력해주세요"
          placeholderTextColor="#ccc"
        />
      </ThemedView>

      <ThemedView style={styles.goContainer}>
        <ThemedView style={styles.iconsContainer}>
        <TouchableOpacity>
          <Camera color="#ccc" size={40} absoluteStrokeWidth={true} style={styles.icons}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Paperclip color="#ccc" size={35} absoluteStrokeWidth={true} style={styles.icons}/>
        </TouchableOpacity>
        </ThemedView>
        

        <TouchableOpacity
          style={styles.goButton}
          onPress={() => console.log('검색 → 글자')}>
          <Text style={styles.goButtonText}>번역하기</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
      <TouchableOpacity 
          style={styles.button}
          onPress={() => console.log('점자 → 글자')}>
          <Text style={styles.buttonText}>점자 → 글자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('글자 → 점자')}>
          <Text style={styles.buttonText}>글자 → 점자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('한글 → 영어')}>
          <Text style={styles.buttonText}>한글 → 영어</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('영어 → 한글')}>
          <Text style={styles.buttonText}>영어 → 한글</Text>
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
    marginTop: 30,
    height: height * 2 / 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    fontSize: 18,
  },
  goContainer:{
    height: 50,
    borderColor: '#ccc',
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
  button: {
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
  buttonText: {
    color: '#7359FF',
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
