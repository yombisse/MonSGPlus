import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from '../componnents/label';

const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#FFF"/>
              </TouchableOpacity>
              <Text style={styles.titre}>Notifications</Text>
      </View>
      <Divider style={styles.divider}/>
        <TouchableOpacity style={styles.touchableOpacity_row}>
          <View style={styles.user_info_row}>
            <Ionicons name="notifications" size={24} color="#000"/>
            <Label text={"Vous avez une reunion prevu danas 30 minutes"} style={styles.user_info} textStyle={styles.user_nom}/>
          </View>
        </TouchableOpacity>
        <Divider style={styles.divider}/>

        <TouchableOpacity style={styles.touchableOpacity_row}>
         <View style={styles.user_info_row}>
           <Ionicons name="notifications" size={24} color="#000"/>
           <Label text={"Vous avez une reunion prevu danas 30 minutes"} style={styles.user_info} textStyle={styles.user_email}/>
         </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" style={{marginHorizontal:20}}/>
        </TouchableOpacity>
        <Divider style={styles.divider}/>
        
    </SafeAreaView>
  )
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // gris clair moderne
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A', // bleu profond
    paddingHorizontal: 16,
    paddingVertical: 20,
    elevation: 4, // ombre Android
    shadowColor: '#000', // ombre iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  titre: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 12,
  },
  
  avatar_initial:{
    justifyContent:"center",
    alignItems:'center',
    marginVertical:10,
  },
  profile_user:{
    flexDirection:'row',
    justifyContent:'center',
  },
  user_avatar_nom:{
    paddingHorizontal:5,
  },
  user_avatar_nom_label:{
    fontSize:20,
    fontWeight:'bold',
  },
  user_Email:{
    justifyContent:'center',
    alignItems:'center',
  },
  user_avatar_email:{
    fontWeight:'500',
  },
  divider:{
    marginVertical:10,
    borderColor:"#000",
    borderStyle:'solid',
  },
  user_info_row:{
    flexDirection:'row',
    fontWeight:'500',
    paddingHorizontal:20,
  },
  user_info:{
    paddingHorizontal:10,
    fontWeight:'500',
  },
  profile_avatar:{
    marginVertical:20,
    marginHorizontal:10,
    borderRadius:200,
    borderStyle:'solid',
    borderColor:"#FFEFFF",
    elevation:2,
    flex:1,
  },
  touchableOpacity_row:{ 
    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems:'flex-start'
  },

})