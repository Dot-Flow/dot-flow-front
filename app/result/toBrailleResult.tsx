import {Stack, useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import * as Speech from 'expo-speech';


const {height} = Dimensions.get('window');
// const br = require('braille');

const ToBrailleResult = () => {
    const {summary, unicodeArray, brfFile} = useLocalSearchParams();
    const [brailleText, setBrailleText] = useState<string>("");
    const [showSummary, setShowSummary] = useState<boolean>(false);


    useEffect(() => {
        console.log("summary 2222: ", summary);
        console.log("result 1111: ", unicodeArray);
        if (unicodeArray) {
            // Convert the comma-separated Unicode values into Braille characters
            const unicodeValues = (unicodeArray as string).split(","); // Split the string into an array
            const brailleOutput = unicodeValues
                .map((unicode) => String.fromCharCode(parseInt(unicode, 16))) // Convert hex to character
                .join(""); // Join characters into a single string

            setBrailleText(brailleOutput); // Set the decoded Braille text
        }
        console.log("summary.length : ", summary.length);
        if (summary.length >= 100) setShowSummary(true);
        else setShowSummary(false);
    }, [summary, unicodeArray, brfFile])

    const readOut = () => {
        if (summary) {
            Speech.speak(summary as string, {language: "ko"});
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{headerTitle: '점역 결과'}} />
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
                    {brailleText || "점역 결과가 없습니다."}
                </Text>
            </ScrollView>
        </View>
    );
}

export default ToBrailleResult;

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
