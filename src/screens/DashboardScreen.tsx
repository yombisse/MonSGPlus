import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'

const DashboardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.CreateMeetContainer}>
        <MyButton label={"Planifier une réunion"} style={styles.CreateMeetButton} onpress={()=>navigation.navigate('CreateMeet')}/>
      </View>
      <View style={styles.ParticipateMeetContainer}>
        <MyButton label={"Participer à une réunion"} style={styles.ParticipateMeetButton} onpress={()=>navigation.navigate('ParticipateMeet')}/>
      </View>
      <View style={styles.MembersContainer}>
        <MyButton label={"Nos Membres"} style={styles.MembersButton} onpress={()=>navigation.navigate('Members')}/>
      </View>
      <View style={styles.MembersContainer}>
        <MyButton label={"Nos Réunions"} style={styles.MembersButton} onpress={()=>navigation.navigate('Meets')}/>
      </View>
    </SafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        
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