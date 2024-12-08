import {Stack, useLocalSearchParams} from 'expo-router';
import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import * as Speech from 'expo-speech';
import translationApi from '@/services/translationApi';
import {brailleDump} from '@hackbg/dump'
// import {braille} from '@braille'

const {height} = Dimensions.get('window');
// const br = require('braille');

const ResultPage = () => {

  useEffect(() => {
    fetchResult();
  }, [])


  const {result_id} = useLocalSearchParams();

  const readOut = () => {
    const read = '꿈을 이룬 어린 왕자에 대한 이야기'
    Speech.speak(read, {language: 'ko'});
  };

  const fetchResult = async () => {

    const response = await translationApi.stringToBrf("activeAccount.uid");
    // console.log("response : ", response);
    // const code = br.toBraille(response);
    // console.log("code : ", code)
    const resEncodedMessage = new TextEncoder().encode(response)
    // const br = encode(response);
    console.log(brailleDump(resEncodedMessage))

  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerTitle: '번역결과'}} />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.categoryBadge}>
          <Text style={styles.categoryText}>요약 결과</Text>
        </TouchableOpacity>
        <Text style={styles.title}>꿈을 이룬 어린 왕자에 대한 이야기</Text>
        <Text style={styles.subtitle}>*100자 이상의 글만 요약본을 제공합니다.</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.actionButtonText}>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listenButton} onPress={readOut}>
          <Text style={styles.actionButtonText}>음성 듣기</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>
          어린 왕자는 전 세계적으로 약 1억 4천만 부가 팔렸으며, 이는 출판된 책들 중 가장 많이 팔리고 번역된 책들 중 하나이다. 현재까지 301개의 언어와 방언으로 번역되었다. 링크[2]미국에서 처음 발간된 소설이다. 이 소설의 유래가 참 재밌는데, 생텍쥐페리가 뉴욕에 체류 중이었을 당시, 미국의 담당 출판업자인 유진 레이널(Eugene Reynal)과 저녁 식사를 하던 도중에 냅킨에 낙서로 아이 한 명을 그렸다. 유진 레이널이 그 그림을 보고 생택쥐페리에게 "크리스마스 전까지 그 아이를 소재로 동화를 쓰면 참 좋을 텐데요."라고 제안한 것이 이 소설을 탄생시킨 결정적인 계기가 되었다. (유진 레이널이 그의 스트레스 해소를 위해 제안했다는 이야기도 있다.)어린 왕자의 기본 스케치의 모티브는 체코 프라하의 아기 예수상이라고 한다. 또한 작중 화자인 조종사는 생택쥐페리 본인이 1935년 사하라 사막에 부조종사와 함께 불시착해 5일 동안 먹을 물 한 방울 없이 고립되어 있을 때 경험한 환상들에서 모티브를 얻었다.
        </Text>
      </ScrollView>
    </View>
  );
}

export default ResultPage;

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
