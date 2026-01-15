import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import  MyButton from '../componnents/button'
import Label from '../componnents/label';
import TextInputField from '../componnents/InputField';
import { addData,getData,updateData } from '../storage/membersStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChoicePicker from '../componnents/choicePicker';

export default function MembersFormScreen({route,navigation}) {
  const STORAGE_KEY="@monsgplus/members"
  const Member=route.params?.member
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [filiere,setFiliere]=useState("");
  const [addresse,setAddresse]=useState("");
  const [contact,setContact]=useState("");
  const [statut,setStatut]=useState("");
  const [email,setEmail]=useState("");
  const [departement,setDepartement]=useState("");
  const STATUT=[{label:"Actif",value:"actif"},{label:"Inactif",value:"inactif"}]

  const newMembre={
    nom,
    prenom,
    filiere,
    addresse,
    contact,
    statut,
    email,
    departement,
    dateCreation:new Date().toISOString()

  }

  useEffect(() => {
    if (Member) {
      setNom(Member.nom);
      setPrenom(Member.prenom);
      setFiliere(Member.filiere);
      setAddresse(Member.addresse);
      setContact(Member.contact);
      setStatut(Member.statut);
      setEmail(Member.email);
      setDepartement(Member.departement);
    }
  }, [Member]);
  const validate=()=>{
    if(!nom.trim() || !prenom.trim() || !filiere.trim() || !addresse.trim() || !contact.trim() || !statut.trim() || !email.trim() || !departement.trim()){
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
      await updateData(STORAGE_KEY,Member.id ,newMembre);
      console.warn("Membre modifier avec succes")
      
    }
    else{
      await addData(STORAGE_KEY,newMembre);
    }
    navigation.goBack()
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Label text={"Ajouter un nouvel membre"} style={styles.Titlelabel}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}  >
          <TextInputField label="Nom" value={nom} placeholder={"Entrer votre nom"} onChangeText={(text)=>setNom(text)} style={styles.Input} />
          <TextInputField label="Prenom" value={prenom} placeholder={"Entrer votre prenom"} onChangeText={(text)=>setPrenom(text)} style={styles.Input}  />
          <TextInputField label="Filiere" value={filiere} placeholder={"Entrer votre filere"} onChangeText={(text)=>setFiliere(text)} style={styles.Input}  />
          <TextInputField label="Addresse" value={addresse} placeholder={"Entrer votre quartier"} onChangeText={(text)=>setAddresse(text)} style={styles.Input}  />
          <TextInputField label="Contact" value={contact} placeholder={"Entrer votre contact"} onChangeText={(text)=>setContact(text)} style={styles.Input}  keyboardType={'numeric'}/>
          <TextInputField label="Email" value={email} placeholder={"Entrer votre e-mail"} onChangeText={(text)=>setEmail(text)} style={styles.Input}  keyboardType={'email-adress'}/>
          <TextInputField label="Departement" value={departement} placeholder={"Entrer votre statut"} onChangeText={(text)=>setDepartement(text)} style={styles.Input}  />
          
          <Label text={"Statut"}/>
          <View style={styles.picker}>
            <ChoicePicker
              typeEvent={null}
              options={STATUT}
              values={[statut]}
              onChange={(val)=>setStatut(val[0])}
              />
          </View>
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
      height:40,
      padding:12,
      borderRadius:8,
      borderWidth:1,
      borderColor:"#D1D5DB",
      backgroundColor:'#FFF',
      alignSelf:'center',
       // Ombre
    
    marginVertical: 6,

  
    },
    picker:{
      width:300,
      height:60,
      borderWidth:2,
      borderRadius:8,
      paddingVertical:10,
      borderColor:'#D1D5DB'

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