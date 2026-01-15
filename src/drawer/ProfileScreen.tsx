import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData,updateData } from '../storage/membersStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Label from '../componnents/label';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../componnents/button';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <Ionicons name="arrow-back" size={30} color="#FFF"/>
        <Text style={styles.titre}>Mon Profile</Text>
      </View>
      <View style={styles.cardInfo}>
        <Image style={styles.Image} source={require('../assets/logo.png')}/>
        <View style={styles.cardInfoRow}>
          <Ionicons name="person" size={40} color="#000"/>
          <Label text={user.nom} textStyle={styles.nom}/>
          <Label text={user.prenom} textStyle={styles.prenom}/>
        </View>
      <View style={styles.cardInfoRow}>
        <Ionicons name="mail" size={40} color="#000"/>
        <Label text={user.email} textStyle={styles.email}/>
      </View>
        <MyButton label={"Modifier mes infos"} labelStyle={styles.buttonLabel} style={styles.button}/>
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
