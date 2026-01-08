import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import  MyButton from '../componnents/button'
import Label from '../componnents/label';
import TextInputField from '../componnents/InputField';
import { addMember,getMembers,updateMember } from '../storage/membersStorage';

export default function MembersFormScreen({route,navigation}) {
  const editId=route.params?.id
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [filiere,setFiliere]=useState("");
  const [addresse,setAddresse]=useState("");
  const [contact,setContact]=useState("");
  const [statut,setStatut]=useState("");

  useEffect(()=>{
    if(editId){
      (async()=>{
        const list=await getMembers();
        const m=list.find(x=>x.id===editId);
        if(m){
          setNom(m.nom);
          setPrenom(m.prenom);
          setFiliere(m.filiere);
          setAddresse(m.addresse),
          setContact(m.contact);
          setStatut(m.statut);
        }
      })();
    }
  },[editId]);
  const validate=()=>{
    if(!nom.trim() || !prenom.trim() || !filiere.trim() || !addresse.trim() || !contact.trim() || !statut.trim()){
      return 'Tous les champs de saisi sont obligatoires'

    }
    return null;
  }
  const Ajouter=async()=>{
    const err=validate();
    if(err){
      Alert.alert('Valiation',err);
      return ;
    }
    if(editId){
      await updateMember(editId, {nom,prenom,filiere,addresse,contact,statut})
    }
    else{
      await addMember(nom,prenom,filiere,addresse,contact,statut);
    }
    navigation.goBack()
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Label text={"Ajouter un nouvel membre"} style={styles.Titlelabel}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'flex-start',padding:10}} style={styles.scrollContainer}>
          <TextInputField label="Nom" value={nom} placeholder={"Entrer votre nom"} onChangeText={(text)=>setNom(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Prenom" value={prenom} placeholder={"Entrer votre prenom"} onChangeText={(text)=>setPrenom(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Filiere" value={filiere} placeholder={"Entrer votre filere"} onChangeText={(text)=>setFiliere(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Addresse" value={addresse} placeholder={"Entrer votre quartier"} onChangeText={(text)=>setAddresse(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Contact" value={contact} placeholder={"Entrer votre contact"} onChangeText={(text)=>setContact(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} keyboardType={'numeric'}/>
          <TextInputField label="Statut" value={statut} placeholder={"Entrer votre statut"} onChangeText={(text)=>setStatut(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <MyButton  icon={ ""} label={editId ? 'Modifier': 'Ajouter'} style={styles.Addbutton} onpress={Ajouter}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button:{
    width:50,
    height:50,
    fontSize:30,
    paddingLeft:20,
    color:'black',
    alignSelf:'flex-start',
  },
  Addbutton:{
    width:150,
    height:50,
    fontSize:30,
    alignSelf:'center',
    margin:10,
    backgroundColor:'green'
  },
  Titlelabel:{
    marginLeft:80,
    fontFamily:'times new roman',
    fontSize:24,
    fontWeight:'bold',
    color:"#000",
    marginBottom:10,
  },
  InputLabel:{
    color:'#000',
    fontSize:24,
    alignSelf:'center'
  },
  Input:{
      width:300,
      height:60,
      borderStyle:'solid',
      borderRadius:10,
      borderWidth:2,
      borderColor:"#1E3A8A",
      alignSelf:'center',
    },
  icon:{
    color:'#000',
  },
  scrollContainer:{
    width:350,
    margin:10,
    borderStyle:'solid',
    borderWidth:3,
    borderColor:'#1E3A8A',
    alignSelf:'center',
    borderRadius:8,
    

    
  },
  container:{
    flex:1,
  }
})