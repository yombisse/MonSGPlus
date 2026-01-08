import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../componnents/button';
import Label from '../componnents/label';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getMembers,deleteMember} from '../storage/membersStorage'

export default function MembersListScreen({navigation}) {
  const [members, setMembers]=useState([]);
  const loadData=async()=>{
    try {
      const list= await getMembers();
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

  
  // const confirmDelete= async(id)=>{
  //   await deleteMember(id);
  //   await loadData();
  // }

  const onDelete= async (id)=>{
    Alert.alert('Supprimer','Confirmer la suppression?',[
      {text: 'Annuler', style:'cancel'},
      {text: 'Supprimer', style:'destructive',onPress:() => {
        deleteMember(id);
        loadData();}}
    ]);
  };
  function handlePress(){
    navigation.navigate('MemberForm')
  }
  
  const renderItem=({item})=>{
    return(
      <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('MemberDetail',{member:item})}>
        <View style={styles.MemberRow}>
          <View style={styles.nom_prenom}>
            <Image source={require('../assets/logo.png')} style={styles.profile}/>
            <Label textStyle={styles.nom} text={item.nom}/>
            <Label textStyle={styles.prenom} text={item.prenom}/>
            <MyButton icon='delete' iconStyle={styles.deleteIcon} style={styles.deleteButton} onpress={()=>onDelete(item.id)}/>
          </View>
          <Label textStyle={styles.statut} text={item.statut}/>
          
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    
      <View style={styles.container}>
        <Label text={"Liste des membres"} style={styles.Header}/>
        <MyButton icon='add' iconStyle={styles.Icon} labelStyle={styles.buttonText} style={styles.button} onpress={handlePress}/>
         
        <FlatList
          style={styles.FlatList} 
          data={members}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Label style={styles.empty} text={"Aucun membre"}/>}
          />
      </View>
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
    MemberRow:{
      width:'100%',
      height:100,
      borderStyle:'solid',
      borderRadius:20,
      borderColor:'#1E3A8A',
      borderWidth:2,
      opacity:0.8,
      padding:10,
    },
    profile:{
      width:80,
      height:80,
      borderRadius:40,
      borderWidth:2,

    },
    nom_prenom:{
      flexDirection:'row',
      paddingLeft:10,
      alignItems:'center',
      paddingBottom:10,
      
    },
    nom:{
      fontSize:20,
      fontWeight:'bold',
      color:"#000",
      paddingLeft:10,
      
    },
    prenom:{
      fontSize:20,
      fontWeight:'bold',
      color:"#000",
      paddingLeft:10,
    },
    statut:{
      fontSize:14,
      color:"#000",
     marginLeft:150,
      marginTop:-40,
      

    },
    deleteIcon:{
      color:'red',
      fontSize:20,

    },
    deleteButton:{
      backgroundColor:'transparent',
        width:50,
        height:50,
        borderRadius:15,
        marginLeft:20,
    
    },
    empty:{
      fontSize:24,
      color:"red",
      fontFamily:'Arial',
      alignSelf:'center',
    },
    FlatList:{
   
      width:380,
      paddingLeft:20,
      paddingRight:20,
      
     
    }
});