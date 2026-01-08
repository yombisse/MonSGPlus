import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        <View >
          <View style={styles.nom_prenom}>
            <Label style={styles.nom} text={item.nom.toString()}/>
            <Label style={styles.prenom} text={item.prenom}/>
            <MyButton icon='delete' iconStyle={styles.deleteIcon} style={styles.deleteButton} onpress={()=>onDelete(item.id)}/>
          </View>
          <Label style={styles.statut} text={item.statut}/>
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
        marginLeft:300

    },
    buttonText:{
      color:"#FFF",
      fontSize:16,
    },
    item:{
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:16,
    },
    nom_prenom:{
      flexDirection:'row',
      paddingLeft:10,
      justifyContent:'center',
      alignItems:'center',
      
    },
    nom:{
      fontSize:18,
      fontWeight:'bold',
      color:"#000",
      paddingLeft:10,
      
    },
    prenom:{
      fontSize:18,
      fontWeight:'bold',
      color:"#000",
      paddingLeft:10,
    },
    statut:{
      fontSize:14,
      color:"#000",
      alignSelf:'center',
      

    },
    deleteIcon:{
      color:'white',
      fontSize:16,

    },
    deleteButton:{
      backgroundColor:'#f80c0cff',
        width:50,
        height:50,
        borderRadius:15,
        marginLeft:50,
    
    },
    empty:{
      fontSize:24,
      color:"red",
      fontFamily:'Arial',
      alignSelf:'center',
    },
    FlatList:{
      margin:10,
      borderTopWidth:2,
      borderTopColor:'#9CA3AF',
      borderLeftColor:'#9CA3AF',
      borderLeftWidth:2,
      borderBottomWidth:2,
      borderBottomColor:'#F9FAFB',
      borderRightWidth:2,
      borderRightColor:'#F9FAFB',
      borderWidth:1,
      elevation:3,
      shadowColor:'#000',
      shadowOffset:{width:2,height:2},
      shadowOpacity:0.2,
      shadowRadius:3,
      padding:20,
      borderRadius:2,
    }
});