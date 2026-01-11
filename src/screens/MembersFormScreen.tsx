import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import  MyButton from '../componnents/button'
import Label from '../componnents/label';
import TextInputField from '../componnents/InputField';
import { addData,getData,updateData } from '../storage/membersStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MembersFormScreen({route,navigation}) {
  const STORAGE_KEY="@monsgplus/members"
  const Member=route.params?.member
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [filiere,setFiliere]=useState("");
  const [addresse,setAddresse]=useState("");
  const [contact,setContact]=useState("");
  const [statut,setStatut]=useState("");

  useEffect(() => {
    if (Member) {
      setNom(Member.nom);
      setPrenom(Member.prenom);
      setFiliere(Member.filiere);
      setAddresse(Member.addresse);
      setContact(Member.contact);
      setStatut(Member.statut);
    }
  }, [Member]);
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
    else if (Member){
      await updateData(STORAGE_KEY,Member.id ,{nom,prenom,filiere,addresse,contact,statut})
      console.warn("Membre modifier avec succes")
      
    }
    else{
      await addData(STORAGE_KEY,{nom,prenom,filiere,addresse,contact,statut});
    }
    navigation.goBack()
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Label text={"Ajouter un nouvel membre"} style={styles.Titlelabel}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}  >
          <TextInputField label="Nom" value={nom} placeholder={"Entrer votre nom"} onChangeText={(text)=>setNom(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Prenom" value={prenom} placeholder={"Entrer votre prenom"} onChangeText={(text)=>setPrenom(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Filiere" value={filiere} placeholder={"Entrer votre filere"} onChangeText={(text)=>setFiliere(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Addresse" value={addresse} placeholder={"Entrer votre quartier"} onChangeText={(text)=>setAddresse(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <TextInputField label="Contact" value={contact} placeholder={"Entrer votre contact"} onChangeText={(text)=>setContact(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} keyboardType={'numeric'}/>
          <TextInputField label="Statut" value={statut} placeholder={"Entrer votre statut"} onChangeText={(text)=>setStatut(text)} inputStyle={styles.Input} labelStyle={styles.InputLabel} />
          <MyButton  icon={ ""} label={Member?'Modifier':'Ajouter'} style={styles.Addbutton} onpress={Ajouter}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   container:{
    flex:1,
    padding:20,
    backgroundColor:'#F9FAFB',
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
      padding:12,
      borderRadius:8,
      borderWidth:1,
      borderColor:"#D1D5DB",
      backgroundColor:'#FFF',
      alignSelf:'center',
       // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 6,

  
    },
  icon:{
    color:'#000',
  },
  // scrollContainer:{
  //   width:350,
  //   margin:10,
  //   borderStyle:'solid',
  //   borderWidth:3,
  //   borderColor:'#1E3A8A',
  //   alignSelf:'center',
  //   borderRadius:8,
    

    
  // },
  // container:{
  //   flex:1,
  // }
})