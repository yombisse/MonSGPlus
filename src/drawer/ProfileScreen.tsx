import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData,updateData } from '../storage/membersStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Label from '../componnents/label';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../componnents/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Divider } from 'react-native-paper';

const STORAGE_KEY="@monsgplus/current_users";
export default function ProfileScreen({navigation}) {
  const [user,setUser]=useState([]);
  const [erreur,setErreur]=useState("");

  async function loadCurrentUser() { 
    try { 
      const json = await AsyncStorage.getItem(STORAGE_KEY); 
      if (json) { 
        setUser(JSON.parse(json)); 
      } 
    } catch (error) {
       setErreur(error); 
      } 
    }
    
  useEffect(()=>{
    loadCurrentUser()
    const reload=navigation.addListener('focus',loadCurrentUser);
    return reload;
  },[navigation])

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#FFF"/>
        </TouchableOpacity>
        <Text style={styles.titre}>Mon Profile</Text>
      </View>

      <View style={styles.profile_avatar}>
        <View style={styles.avatar_initial}>
          <Avatar.Icon size={150} icon={"account"}/>
        </View> 
        <View style={styles.profile_user}>
          <Label text={"FANDIE"} textStyle={styles.user_avatar_nom_label} style={styles.user_avatar_nom}/>
          <Label text={"Michel"} textStyle={styles.user_avatar_nom_label} style={styles.user_avatar_nom}/>
        </View>
        <View style={styles.user_Email}>
          <Label text={"yombissefandie@gmail.com"} textStyle={styles.user_avatar_email}/>
        </View>
      
        <Divider style={styles.divider}/>
        <TouchableOpacity style={styles.touchableOpacity_row}>
          <View style={styles.user_info_row}>
            <Ionicons name="person" size={24} color="#000"/>
            <Label text={"Nom"} style={styles.user_info} textStyle={styles.user_nom}/>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" style={{marginHorizontal:20}}/>
        </TouchableOpacity>
        <Divider style={styles.divider}/>
        <TouchableOpacity style={styles.touchableOpacity_row}>
         <View style={styles.user_info_row}>
           <Ionicons name="mail" size={24} color="#000"/>
           <Label text={"Email"} style={styles.user_info} textStyle={styles.user_email}/>
         </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" style={{marginHorizontal:20}}/>
        </TouchableOpacity>
        <Divider style={styles.divider}/>
        <TouchableOpacity style={styles.touchableOpacity_row}>
          <View style={styles.user_info_row}>
            <Ionicons name="person" size={24} color="#000"/>
            <Label text={"Mot de passe"} style={styles.user_info} textStyle={styles.user_password}/>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" style={{marginHorizontal:20}}/>
        </TouchableOpacity>
        <Divider style={styles.divider}/>
        
        <Divider style={styles.divider}/>
      
      </View>
    </SafeAreaView>
  )
}


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
    borderRadius:5,
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


  //////////////////////////////////////////////////////////////////////////
  Image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#1E3A8A',
    borderWidth: 3,
    marginBottom: 16,
  },
  cardInfo: {
    width: '90%',
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    marginTop: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 8,
  },
  nom: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
    color: '#111827', // gris foncé
  },
  prenom: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 4,
    color: '#374151', // gris moyen
  },
  email: {
    fontSize: 16,
    color: '#6B7280', // gris clair
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});


 {/* <Image style={styles.Image} source={require('../assets/logo.png')}/>
        <View style={styles.cardInfoRow}>
          <Ionicons name="person" size={40} color="#000"/>
          <Label text={user.nom} textStyle={styles.nom}/>
          <Label text={user.prenom} textStyle={styles.prenom}/>
        </View>
      <View style={styles.cardInfoRow}>
        <Ionicons name="mail" size={40} color="#000"/>
        <Label text={user.email} textStyle={styles.email}/>
      </View>
        <MyButton label={"Modifier mes infos"} labelStyle={styles.buttonLabel} style={styles.button}/> */}