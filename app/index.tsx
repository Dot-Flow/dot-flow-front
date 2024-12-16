import {Image, StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Dimensions, TouchableHighlight, Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData, Alert} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {FullWindowOverlay} from 'react-native-screens';
import {Camera, GripVertical, Paperclip, ShowerHead} from 'lucide-react-native';
import React, {useState} from 'react';
import {Link, router, useFocusEffect} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import translationApi from '@/services/translationApi';
import {TextResponse} from '@/services/types';
import apiClient from '@/services/apiClient';
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import LoadingOverlay from './loading';

const {height} = Dimensions.get('window');

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [toBraille, setToBraille] = useState(true);
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      setValue("");
      setIsLoading(false);
    }, [])
  );

  const handleButtonClick = (state: 'toBraille' | 'toText') => {
    console.log("tobraille state : ", state)
    setToBraille(state == 'toBraille' ? true : false);
  }

  const handleKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key == "Enter") {
      Keyboard.dismiss();
    }
  }

  function extractUnicodeArray(brlTexts: string): string[] {
    const unicodeList: string[] = [];

    for (const text of brlTexts) {
      const sanitizedText = text.replace(/"/g, "");

      for (const char of sanitizedText) {
        unicodeList.push(char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0"));
      }
    }

    return unicodeList;
  }

  const handleTranslateButtonClick = async () => {
    setIsLoading(true);
    Keyboard.dismiss();

    // 점역
    if (toBraille) {
      try {
        let result = await translationApi.stringToBrf(value);
        if (result) {
          console.log(result);
          router.push({
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
      const unicodeArray = extractUnicodeArray(value);
      const payload = {
        unicodeArray: [unicodeArray.join(" ")]
      };

      const result = await translationApi.unicodeToText(payload);
      console.log("API Result:", result);
      if (result) {
        router.push({
          pathname: "/result/toTextResult",
          params: {
            summary: result.summary,
            result: result.result,
            textFile: result.textFile,
          },
        });
      }
      return;
    } catch (error) {
      console.log("Error occurred while launching the camera: ", error);
    } finally {
      setIsLoading(false);
    }

  }

  const openCamera = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    try {
      let result = await ImagePicker.launchCameraAsync({
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

  const pickFileOrImage = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*", // allows images, .txt, .brf, etc.
        copyToCacheDirectory: true,
      });

      if (!res.canceled && res.assets?.[0]?.uri) {
        const {uri, name} = res.assets[0];
        const extension = name.split('.').pop()?.toLowerCase();

        if (!extension) {
          Alert.alert("확장자가 존재하지 않습니다.");
          return;
        }

        if (["png", "jpg", "jpeg"].includes(extension)) {
          if (toBraille) {
            router.push({
              pathname: "/imageLoad/[load_image]",
              params: {load_image: uri, toBraille: toBraille.toString()},
            });
          } else {
            router.push({
              pathname: "/imageLoad/[load_image]",
              params: {load_image: uri, toBraille: toBraille.toString()},
            });
          }

        }
        else if (["txt"].includes(extension)) {
          // await handleTextOrBrfFile(uri, extension);

        }
        else if (["brf"].includes(extension)) {
          // await handleTextOrBrfFile(uri, extension);

        }
        else {
          Alert.alert("지원하지 않는 확장자", `.png, .jpg, .jpeg, .txt, 혹은 .brf 파일만을 선택할 수 있습니다.`);
        }

      }


    } catch (error) {
      console.error("Error picking file:", error);
    }
    // try {
    //   let result = await DocumentPicker.getDocumentAsync({
    //     type: "*/*",
    //     copyToCacheDirectory: true,
    //   });

    //   if (!result.canceled && result.assets?.[0]?.uri) {
    //     console.log("URI:", result.assets[0].uri);
    //     router.push({
    //       pathname: "/imageLoad/[load_image]",
    //       params: {load_image: result.assets[0].uri, toBraille: "false"},
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error picking file:", error);
    // }

  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            multiline
            style={styles.input}
            placeholder="묵자 혹은 점자를 입력해주세요..."
            placeholderTextColor="#ccc"
            enablesReturnKeyAutomatically
            onKeyPress={(e) => handleKeyDown(e)}
            value={value}
            onChangeText={(text) => setValue(text)}
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
          onPress={pickFileOrImage}>
          {/* <Paperclip color="#a4a4a7" size={35} absoluteStrokeWidth={true} style={styles.icons} onPress={pickImage}/> */}
          <Paperclip color="black" size={35} absoluteStrokeWidth={true} style={styles.buttonIcons} />
          <Text style={styles.buttonText_clicked}>파일 업로드</Text>
        </TouchableOpacity>

        {/* <Link href="/result/1" asChild> */}
        <TouchableOpacity
          style={styles.goButton}
          // onPress={Keyboard.dismiss}>
          onPress={handleTranslateButtonClick}>
          <GripVertical color="black" size={35} absoluteStrokeWidth={true} style={styles.buttonIcons} />
          <Text style={styles.goButtonText}>번역하기</Text>
        </TouchableOpacity>
        {/* </Link> */}

      </ThemedView>
      <LoadingOverlay visible={isLoading} />
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
