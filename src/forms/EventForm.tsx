import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import React,{useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../componnents/InputField';
import ChoicePicker from '../componnents/choicePicker';
import { addData, getData, updateData } from '../storage/membersStorage';
import Label from '../componnents/label';
import MyButton from '../componnents/button';


const EventForm = ({route,navigation}) => {
  const STORAGE_KEY="@monsgplus/events"
  const members="@monsgplus/members"
  const Events=route.params?.events;
  const [member,SetMember]=useState([]);
  const [titre,setTitre]=useState("");
  const [typeEvent,setTypeEvent]=useState("");
  const [date,setDate]=useState("");
  const [heure,setHeure]=useState("");
  const [participants,setParticipants]=useState([]);
  const [lieu,setLieu]=useState("");
  const [statut,setStatut]=useState([]); // ✅ valeur par défaut
  const [documents,setDocuments]=useState(" ");
  const [creePar,setCreePar]=useState(" ");
  const STATUT = [ { label: "Prévu", value: "prevu" }, { label: "Tenu", value: "tenu" }, { label: "Reporté", value: "reporte" }, { label: "Annulé", value: "annule" }, ];
  const TYPEEVENT=[{label:"Rendez-vous",value:"rendezvous"},{label:"Réunion",value:"reunion"}];
  const newEvenement = 
    { 
        titre, 
        typeEvent, 
        date,
        heure, 
        participants,
        lieu, 
        statut,
        documents, 
        creePar, 
        dateCreation:new Date().toISOString() 
    };
 

async function loadMembers() {
    try {
        const Members=await getData(members);
        SetMember(Members);
    } catch (error) {
        console.warn("erreur de chargement des membre depuis la bd",error);
        
    }
    
}
  useEffect(()=>{
    loadMembers();
    const reload=navigation.addListener("focus",loadMembers);
    if(Events){
    setTitre(Events.titre);
    setTypeEvent(Events.typeEvent)
    setDate(Events.date);
    setHeure(Events.heure);
    setParticipants(Events.participants);
    setLieu(Events.lieu);
    setStatut(Events.statut);
    setDocuments(Events.documents);
    setCreePar(Events.creePar);
    }
    return reload;
  },[navigation])
  const validate=()=>{
    if(!titre.trim() ||!typeEvent.trim() ||!date.trim() || !heure.trim() || !lieu.trim() ){
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
    else if(Events){
      await updateData(STORAGE_KEY,Events.id,newEvenement);
    }
    else{
      await addData(STORAGE_KEY,newEvenement);
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
        <TextInputField label="Titre" value={titre} onChangeText={setTitre} mode="outlined" />
        <TextInputField label="Date" value={date} onChangeText={setDate} mode="outlined" />
        <TextInputField label="Heure" value={heure} onChangeText={setHeure} mode="outlined" />
        <TextInputField label="Lieu" value={lieu} onChangeText={setLieu} mode="outlined" />
        <TextInputField label="Documents" value={documents} onChangeText={setDocuments} mode="outlined" />
        <TextInputField label="Créé par" value={creePar} onChangeText={setCreePar} mode="outlined" />
        
        <Label text={"Type d'evenement"}/>
        <ChoicePicker
            typeEvent={null}
            options={TYPEEVENT}
            values={[typeEvent]}
            onChange={(val)=>setTypeEvent(val[0])}
        />

        <Label text={"Statut"}/>
        <ChoicePicker
            typeEvent={null} // force choix unique
            options={STATUT}
            values={[statut]}
            onChange={(val) => setStatut(val[0])}
        />
        <Label text={"Participants"}/>
        <ChoicePicker
            typeEvent={typeEvent} // "rendezvous" ou "reunion"
            options={member.map((m) => ({ label: m.nom, value: m.id }))}
            values={participants}
            onChange={setParticipants}
            />



        <MyButton  
          label={Events?'Modifier':'Ajouter'} 
          style={styles.Addbutton} 
          onpress={Ajouter}
        />
      </ScrollView>
    </SafeAreaView>
  )
}


export default EventForm;

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