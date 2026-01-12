import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../componnents/button';
import Label from '../componnents/label';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData,deleteData,updateData} from '../storage/membersStorage'
import SearchBar from '../componnents/searchbar';

export default function MembersListScreen({navigation}) {
  const STORAGE_KEY="@monsgplus/members"
  const [members, setMembers]=useState([]);
  const [search, setSearch]=useState('');

   const loadData=async()=>{
    try {
      const list= await getData(STORAGE_KEY);
      setMembers(list);
      console.log("Membres chargés:", list);
    } catch (error) {
      console.error("Erreur de recuperation de donnees",error);
      
    };
  }
  useEffect(()=>{
      loadData();
      const unsubscribe= navigation.addListener('focus',loadData);
      return unsubscribe;
    },[navigation]);

  const onDelete= async (id)=>{
    Alert.alert('Supprimer','Confirmer la suppression?',[
      {text: 'Annuler', style:'cancel'},
      {text: 'Supprimer', style:'destructive',onPress:() => {
        deleteData(STORAGE_KEY,id);
        loadData();}}
    ]);
  };
  

  function handlePress(){
    navigation.navigate('MemberForm')
  }

  const results=()=>{
  return members.filter(m=> m.nom?.toLowerCase().includes(search.toLowerCase()))
  
 }
  const filteredMembers=results();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('MemberDetail', { member: item })}
    >
      <View style={styles.MemberRow}>
        {/* 1. Image Profil */}
        <Image source={require('../assets/logo.png')} style={styles.profile} />

        {/* 2. Conteneur Central (Nom + Statut) */}
        <View style={styles.centerContent}>
          <Text style={styles.nom} numberOfLines={2}>
            {item.nom} {item.prenom}
          </Text>
          <View style={styles.statutBadge}>
            <Text style={styles.statutText}>{item.statut}</Text>
          </View>
        </View>

        {/* 3. Groupe de Boutons d'action */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={()=>navigation.navigate('MemberForm', { member: item })}
          >
            <Ionicons name="create-outline" size={24} color="#4A90E2" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => onDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  
  return (
      <SafeAreaView style={styles.container}>
        <Label text={"Liste des membres"} style={styles.Header}/>
        <SearchBar type={'members'} value={search} onChange={setSearch}/>
        <MyButton icon='add' iconStyle={styles.Icon} labelStyle={styles.buttonText} style={styles.button} onpress={handlePress}/>
        <FlatList
          style={styles.FlatList} 
          data={filteredMembers}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Label style={styles.empty} text={"Aucun membre"}/>}
          />
      </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#F3F4F6",
    justifyContent:'center',
    alignItems:'center',
    flex:1,

    borderColor:'#000',
    padding:10

  },
  Header:{
    color:'#000',
    alignSelf:'center',
    fontSize:24,
    fontWeight:'bold',
    fontFamily:'times new roman',
    padding:20,
  },
  Icon:{
    fontWeight:'bold',
  },
   button:{
        backgroundColor:'#1E3A8A',
        width:50,
        height:50,
        borderRadius:15,
        alignItems:'center',
        marginLeft:300,
        marginBottom:10,

    },
    buttonText:{
      color:"#FFF",
      fontSize:16,
    },
    item:{
      alignItems:'center',
      paddingVertical:16,
      paddingBottom:-10
     
    },
    MemberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 6,
    width: '100%',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  centerContent: {
    flex: 1, // Prend tout l'espace entre l'image et les boutons
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  nom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1, // Crucial pour le retour à la ligne
  },
  statutBadge: {
    backgroundColor: 'red', // Votre couleur demandée
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start', // S'adapte à la longueur du mot
    marginTop: 4,
  },
  statutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8, // Augmente la zone de clic pour l'utilisateur
    marginLeft: 4,
  },

    empty:{
      fontSize:24,
      color:"red",
      fontFamily:'Arial',
      alignSelf:'center',
    },
    FlatList:{
      width:'100%',
      paddingLeft:20,
      paddingRight:20,
      marginHorizontal:20,
      backgroundColor:'white'
      
     
    }
});