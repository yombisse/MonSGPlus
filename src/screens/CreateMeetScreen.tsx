import { Alert, StyleSheet, ScrollView, View } from 'react-native';
import React,{ useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addData, updateData } from '../storage/membersStorage';
import Label from '../componnents/label';
import TextInputField from '../componnents/InputField';
import MyButton from '../componnents/button';
import { Picker } from '@react-native-picker/picker'; // ✅ import du Picker

const CreateMeetScreen = ({navigation,route}) => {
  const STORAGE_KEY="@monsgplus/meets"
  const Meets=route.params?.meet;
  const [titre,setTitre]=useState("");
  const [lieu,setLieu]=useState("");
  const [date,setDate]=useState("");
  const [heure,setHeure]=useState("");
  const [statut,setStatut]=useState(" "); // ✅ valeur par défaut


  useEffect(()=>{
    if(Meets){
    setTitre(Meets.titre);
    setLieu(Meets.lieu);
    setDate(Meets.date);
    setHeure(Meets.heure);
    setStatut(Meets.statut);
    }
  },[])
  const validate=()=>{
    if(!titre.trim() || !lieu.trim() || !date.trim() || !heure.trim()){
      return 'Tous les champs de saisie sont obligatoires';
    }
    return null;
  }

  const Ajouter=async()=>{
    const err=validate();
    if(err){
      Alert.alert('Validation',err);
      return ;
    }
    else if(Meets){
      await updateData(STORAGE_KEY,Meets.id,{titre,lieu,date,heure,statut})
    }
    else{
      await addData(STORAGE_KEY,{titre,lieu,date,heure,statut});
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Label text={"Ajouter une réunion"} textStyle={styles.headerTitle}/>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        <TextInputField 
          label="Ordre du jour" 
          value={titre} 
          placeholder={"Entrer l'ordre du jour"} 
          onChangeText={setTitre} 
          inputStyle={styles.Input} 
          labelStyle={styles.InputLabel} 
          placeholderColor={'#000'}
        />

        <TextInputField 
          label="Lieu" 
          value={lieu} 
          placeholder={"Entrer le lieu"} 
          onChangeText={setLieu} 
          inputStyle={styles.Input} 
          labelStyle={styles.InputLabel}
          placeholderColor={'#000'} 
        />

        <TextInputField 
          label="Date" 
          value={date} 
          placeholder={"JJ/MM/AAAA"} 
          onChangeText={setDate} 
          inputStyle={styles.Input} 
          labelStyle={styles.InputLabel} 
          placeholderColor={'#000'}
        />

        <TextInputField 
          label="Heure" 
          value={heure} 
          placeholder={"HH:MM"} 
          onChangeText={setHeure} 
          inputStyle={styles.Input} 
          labelStyle={styles.InputLabel} 
          placeholderColor={'#000'}
        />

        {/* ✅ Picker pour le statut */}
        <Label text="Statut" textStyle={styles.InputLabel}/>
        <View style={styles.pickerContainer}>

          <Picker selectedValue={statut} onValueChange={(value) => setStatut(value)}
            style={styles.picker}
          >
            <Picker.Item label="Prévue" value="prevue" />
            <Picker.Item label="Tenue" value="tenue" />
            <Picker.Item label="Reportée" value="reportee" />
            <Picker.Item label="Annulée" value="annulee" />
          </Picker>
        </View>

        <MyButton  
          label={Meets?'Modifier':'Ajouter'} 
          style={styles.Addbutton} 
          onpress={Ajouter}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateMeetScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'#F9FAFB',
  },
  headerTitle:{
    fontFamily:'times new roman',
    fontSize:24,
    fontWeight:'bold',
    color:"#1E3A8A",
    marginBottom:10,
    textAlign:'center',
  },
  scrollContainer:{
    padding:10,
  },
  InputLabel:{
    color:'#000',
    fontSize:18,
    marginBottom:5,
  },
  Input:{
    width:'100%',
    height:50,
    padding:12,
    borderRadius:8,
    borderWidth:1,
    borderColor:"#D1D5DB",
    backgroundColor:'#FFF',
    marginBottom:15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    tintColor:'red'
  },
  pickerContainer:{
    borderWidth:1,
    borderColor:"#D1D5DB",
    borderRadius:8,
    marginBottom:15,
    backgroundColor:'#FFF',
  },
  picker:{
    height:50,
    width:'100%',
  },
  Addbutton:{
    width:180,
    height:50,
    alignSelf:'center',
    marginTop:10,
    backgroundColor:'green',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
  },
});
