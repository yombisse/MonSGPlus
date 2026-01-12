import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../componnents/button';
import Label from '../componnents/label';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData,deleteData,updateData} from '../storage/membersStorage'
import TextInputField from '../componnents/InputField';
import SearchBar from '../componnents/searchbar';

export default function MembersListScreen({navigation}) {
  const STORAGE_KEY="@monsgplus/meets"
  const [meet, setMeet]=useState([]);
  const [search, setSearch]=useState('');

  const loadData=async()=>{
    try {
      const list= await getData(STORAGE_KEY);
      setMeet(list);
      console.log("Reunions chargés:", list);

      
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
        deleteData(STORAGE_KEY,id);
        loadData();}}
    ]);
  };
  const onEdit=async(id)=>{
    updateData(STORAGE_KEY,id);

  }
  function handlePress(){
    navigation.navigate('CreateMeet')
  }
  // Ou import { Ionicons } from '@expo/vector-icons';

    const results = () => {
  return meet.filter(m => 
    m.titre?.toLowerCase().includes(search.toLowerCase()) 
  );
};
const renderItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.item} 
    onPress={() => navigation.navigate('MeetDetails', { meet: item })}
  >
    <View style={styles.MemberRow}>

      {/* 2. Conteneur Central (Nom + Statut) */}
      <View style={styles.centerContent}>
        <Text style={styles.nom} numberOfLines={2}>
          {item.titre} {item.heure}
        </Text>
        <View style={styles.statutBadge}>
          <Text style={styles.statutText}>{item.statut}</Text>
        </View>
      </View>

      {/* 3. Groupe de Boutons d'action */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={()=>navigation.navigate('CreateMeet', { meet: item })}
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


 const filteredMeets = results();
  
  return (
    
      <SafeAreaView style={styles.container}>
        <Label text={"Liste des réunions"} style={styles.Header}/>
        <SearchBar type={'meets'} value={search} onChange={setSearch}/>
       
        
        
        <FlatList
          style={styles.FlatList} 
          data={filteredMeets}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Label style={styles.empty} text={"Aucune réunion"}/>}
          />
        <View style={styles.buttonRow}>
          <MyButton label={"Planifier une réunion"} labelStyle={styles.buttonText} style={styles.button} onpress={handlePress}/>
          <MyButton label={"Participer à une réunion"} labelStyle={styles.buttonText} style={styles.button} onpress={()=>navigation.navigate('ParticipateMeet')}/>
        </View>
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
    padding:5

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
        width:140,
        height:50,
        borderRadius:5,
        alignItems:'center',
        margin:5,

    },
    buttonText:{
      color:"#FFF",
      fontSize:12,
      textAlign:'center',
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
    borderRadius: 0,
    borderBottomWidth:1,
    elevation:2,
    marginVertical: 2,
    width: '100%',
  },
  searchBar: {
  backgroundColor: '#FFF',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginBottom: 15,
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
      
     
    },
    buttonRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10,
    },
    meetingRow: {
  backgroundColor: '#FFF',
  borderRadius: 8,
  padding: 12,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},
meetingTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#111827',
},
meetingInfo: {
  fontSize: 14,
  color: '#6B7280',
  marginTop: 4,
},
statusBadge: {
  alignSelf: 'flex-start',
  backgroundColor: '#2563EB',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},
statusText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: '600',
},
});