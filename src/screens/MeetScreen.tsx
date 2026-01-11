import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'

const MeetScreen = ({navigation}) => {
   const [notes,setNotes]=useState('')
   const [decisions,setDecisions]=useState('')
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.CreateMeetContainer}>
          <MyButton label={"Liste de présence"} style={styles.CreateMeetButton} onpress={()=>navigation.navigate('CreateMeet')}/>
        </View>
        <View style={styles.ParticipateMeetContainer}>
          <TextInput
              style={styles.textArea}
              placeholder="Écrire vos notes ici..."
              placeholderTextColor="#9CA3AF"
              multiline={true}       // ✅ permet plusieurs lignes
              numberOfLines={4}      // ✅ hauteur initiale
              value={notes}
              onChangeText={setNotes}
            />

          <MyButton label={"Enregistrer notes"} style={styles.ParticipateMeetButton} onpress={()=>{}}/>
        </View>
        <View style={styles.MembersContainer}>
         
            <TextInput
              style={styles.textArea}
              placeholder="Écrire vos decisions ici..."
              placeholderTextColor="#9CA3AF"
              multiline={true}       // ✅ permet plusieurs lignes
              numberOfLines={4}      // ✅ hauteur initiale
              value={decisions}
              onChangeText={setDecisions}
            />
          <MyButton label={"Enregistrer decisions "} style={styles.MembersButton} onpress={()=>{}}/>
        </View>
      </SafeAreaView>
    )
  }
  
  export default MeetScreen
  
  const styles = StyleSheet.create({
      container:{
          flex:1,
          justifyContent:'center',
          
      },
      textArea: {
         borderWidth: 1, 
         borderColor: "#D1D5DB", 
         borderRadius: 8, padding: 12, 
         backgroundColor: "#FFF", 
         textAlignVertical: "top", // ✅ important pour Android
         minHeight: 100, // ✅ hauteur minimum 
         fontSize: 16, 
         color: "#000",
         marginVertical:10,
       },
      CreateMeetContainer:{
          margin:10,
  
      },
      ParticipateMeetContainer:{
          margin:10
      },
      CreateMeetButton:{
          backgroundColor:'#0d4e2bff',
      },
      ParticipateMeetButton:{
          backgroundColor:'#cf6e1fff',
      },
       MembersContainer:{
          margin:10
      },
      MembersButton:{
          backgroundColor:'#1E3FF3',
      },
  })