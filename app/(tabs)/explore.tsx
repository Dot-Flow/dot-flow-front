import React from 'react';
import { StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

const { height } = Dimensions.get('window');

const TabOneScreen = () => {
  return (
    <View style={styles.container}>
      <Text>마이페이지~~</Text>
    </View>
  );
}

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
