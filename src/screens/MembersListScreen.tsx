import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MembersListScreen() {
  return (
    
      <View style={styles.container}>
        <Text style={{fontSize:50,color:'red'}}>MembersListScreen</Text>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F3F4F6",
    justifyContent:'center',
    alignItems:'center',
  },
});