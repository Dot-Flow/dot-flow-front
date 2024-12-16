import {Stack, useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, View, ScrollView, Alert} from 'react-native';
import * as Speech from 'expo-speech';
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const {height} = Dimensions.get('window');

const ToTextResult = () => {
  const {summary, result, textFile} = useLocalSearchParams();
  const [showSummary, setShowSummary] = useState<boolean>(false);

  useEffect(() => {
    console.log("summary asdfsadfsafdsa: ", summary);
    console.log("result asdf: ", result);
    console.log("summary.length : ", summary.length);

    if (summary.length >= 100) setShowSummary(true);
    else setShowSummary(false);
  }, [summary, result, textFile])

  const {result_id} = useLocalSearchParams();

  const readOut = () => {
    if (summary) {
      Speech.speak(summary as string, {language: "ko"});
    }
  };

  const handleSaveTxtFile = async () => {
    try {
      if (!textFile || typeof textFile !== "string") {
        Alert.alert("No text file data found.");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "translated.txt";

      await FileSystem.writeAsStringAsync(fileUri, textFile, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          mimeType: "text/plain",
          dialogTitle: "Save or share your text file",
        });
      } else {
        Alert.alert(
          "Sharing not available",
          "File saved locally at: " + fileUri
        );
      }
    } catch (error) {
      console.error("Error saving text file:", error);
      Alert.alert("Error saving file", String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerTitle: '역점역 결과'}} />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.categoryBadge}>
          <Text style={styles.categoryText}>요약 결과</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{showSummary ? summary : "요약 결과가 없습니다."}</Text>
        <Text style={styles.subtitle}>*100자 이상의 글만 요약본을 제공합니다.</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTxtFile}>
          <Text style={styles.actionButtonText}>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listenButton} onPress={readOut}>
          <Text style={styles.actionButtonText}>음성 듣기</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>
          {result || "역점역 결과가 제공되지 않습니다. 파일을 다운로드받으시길 바랍니다."}
        </Text>
      </ScrollView>
    </View>
  );
}

export default ToTextResult;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  categoryBadge: {
    backgroundColor: '#F7F5FF',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
  },
  categoryText: {
    color: '#7359FF',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#7359FF',
    textAlign: 'center',
    marginBottom: 15,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#F7F5FF',
    borderColor: '#7359FF',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listenButton: {
    backgroundColor: '#F7F5FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonText: {
    color: '#7359FF',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    backgroundColor: '#F7F5FF',
    borderRadius: 8,
    padding: 15,
    flex: 1,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});
