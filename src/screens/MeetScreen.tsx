import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import Label from '../componnents/label'

const MeetScreen = ({navigation}) => {
   const [notes,setNotes]=useState('')
   const [decisions,setDecisions]=useState('')
    return (
      <SafeAreaView style={styles.container}>
        <Label text={"Réunion en cours ..."} textStyle={styles.header} />
        <ScrollView>
          <View style={styles.textAreaContainer}>
            <Label text={"Présence"} textStyle={styles.text} />
            <View style={styles.presenceRow}>
                  <Label text={"Présence"} textStyle={styles.text} />
                  <Label text={"Présence"} textStyle={styles.text} />
                  <Label text={"Présence"} textStyle={styles.text} />
                  <Label text={"Présence"} textStyle={styles.text} />
                  <Label text={"Présence"} textStyle={styles.text} />
            </View>
          </View>
          <View style={styles.textAreaContainer}>
            <Label text={"Notes"} textStyle={styles.text}/>
            <TextInput
                style={styles.textArea}
                placeholder="Écrire vos notes ici..."
                placeholderTextColor="#9CA3AF"
                multiline={true}       // ✅ permet plusieurs lignes
                numberOfLines={4}      // ✅ hauteur initiale
                value={notes}
                onChangeText={setNotes}
              />

          </View>
          <View style={styles.textAreaContainer}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Label text={"Décisions"} textStyle={styles.text} />
              <MyButton label={"Valider "} labelStyle={styles.buttonText} style={styles.validationButton} onpress={()=>{}}/>
            </View>
              <TextInput
                style={styles.textArea}
                placeholder="Écrire vos decisions ici..."
                placeholderTextColor="#9CA3AF"
                multiline={true}       // ✅ permet plusieurs lignes
                numberOfLines={4}      // ✅ hauteur initiale
                value={decisions}
                onChangeText={setDecisions}
              />
            
          </View>

        </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <MyButton label={"Enregister "}labelStyle={styles.buttonText}  style={styles.validationButton} onpress={()=>{}}/>
          <MyButton label={"Annuler "} labelStyle={styles.buttonText} style={styles.buttonDanger} onpress={()=>{}}/>
          <MyButton label={"Partarger "} labelStyle={styles.buttonText} style={styles.validationButton} onpress={()=>{}}/>
        </View>
      </SafeAreaView>
    )
  }
  
  export default MeetScreen
  
  const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
          
      },

      header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#111827',
    flexShrink:1,
     paddingHorizontal:10,
  },
      
  presenceRow: {
  flex:1,
  flexWrap:'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',

 
},
presenceName: {
  fontSize: 16,
  color: '#111827',
  marginLeft: 10,
},
card: {

  backgroundColor: '#FFF',
  borderRadius: 10,
  padding: 15,
  margin: 8,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
cardTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#111827',
},
textAreaContainer:{

  margin:10,
  padding:10,
  backgroundColor:'#fff',
  borderWidth:1,
  borderEndEndRadius:8,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
textArea: {
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderRadius: 8,
  backgroundColor: '#FFF',
  padding: 12,
  minHeight: 100,
  textAlignVertical: 'top',

  fontSize: 16,
  color: '#000',
},
buttonDanger: {
  backgroundColor: '#DC2626',
  width:100,
  height:40,
  borderRadius:0,
  margin:10,
   
},
buttonDangerText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},
validationButton:{
  width:100,
  height:40,
  borderRadius:0,
  margin:10,
   
},
buttonText:{
  fontSize:14,
 
}

  })