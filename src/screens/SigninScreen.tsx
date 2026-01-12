import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../componnents/button'
import Label from '../componnents/label'
import TextInputField from '../componnents/InputField'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addData } from '../storage/membersStorage'
const STORAGE_KEY="@monsgplus/users"
const SigninScreen = ({navigation}) => {
    const [nom,setNom]=useState('');
    const [prenom,setPrenom]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmpassword]=useState('');

    async function Ajouter() {
            await addData(STORAGE_KEY,{nom,prenom,email,password})
            console.log("inscription avec succes")
    }
    function inscrisption(){
        
        if(!nom.trim() || !prenom.trim() || !email.trim() || !password.trim() || !confirmpassword.trim()){
            Alert.alert("Alert","formulaire invalid! Veuillez renseigner tous les champs du formulaire.")
               
        }
        else  if(password!==confirmpassword){
            Alert.alert('Confirmer','Mode de passe de confirmation different du mot de passe saisi!')
                   
         }
       else{
            Ajouter()
            Alert.alert('Succes','Inscription effectuee!')
            navigation.goBack();
        
            }
        }

    
  return (
    <SafeAreaView style={styles.Container}>
        <ImageBackground source={require('../assets/login.jpg')} // ton image locale 
                style={styles.background} 
                resizeMode="cover" // ou "contain", "stretch" 
                >
            <View style={styles.overlay}>
                <Label text={"Veuillez vous inscrire ici"} style={styles.LabelContainer} textStyle={styles.title}/>

            
                <View style={styles.MainFormContainer}>
                    <TextInputField 
                        label={"Nom"} 
                        value={nom} 
                        onChangeText={(text)=>setNom(text)} 
                        placeholder={"Fandie"} 
                        labelStyle={styles.FormLabel}
                        style={styles.FormContainer}
                        inputStyle={styles.input}
                    
                    />
                    <TextInputField 
                        label={"Prénom"} 
                        value={prenom} 
                        onChangeText={(text)=>setPrenom(text)} 
                        placeholder={'Entrer votre prenom'}
                        inputStyle={styles.input}
                        labelStyle={styles.FormLabel}
                        style={styles.FormContainer}
                        />
                    <TextInputField 
                    label={"Email"} 
                    value={email} 
                    onChangeText={(text)=>setEmail(text)} 
                    placeholder={"example@gmail.com"} 
                    keyboardType={'email-text'} 
                    labelStyle={styles.FormLabel}
                    style={styles.FormContainer}
                    inputStyle={styles.input}
                    
                    />
                    <TextInputField 
                        label={"Mot de passe"} 
                        value={password} 
                        onChangeText={(text)=>setPassword(text)} 
                        placeholder={'Entrer votre mot de passe'}
                        inputStyle={styles.input}
                        labelStyle={styles.FormLabel}
                        style={styles.FormContainer}
                        />

                    <TextInputField 
                        label={"Confirmer Mot de passe"} 
                        value={confirmpassword} 
                        onChangeText={(text)=>setConfirmpassword(text)} 
                        placeholder={'confirmer votre mot de passe'}
                        inputStyle={styles.input}
                        labelStyle={styles.FormLabel}
                        style={styles.FormContainer}
                        />
                    <MyButton 
                        label={"S'inscrire"}  
                        onpress={inscrisption} 
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                    />
                    <MyButton 
                        label={"Se connecter"}  
                        onpress={()=>navigation.navigate('Login')} 
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                    />
                    
                </View>
            
                
            </View>
        </ImageBackground>
    </SafeAreaView>
    
  )
}

export default SigninScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:'center',
       
    },
    background:{
        flex:1,
        borderRadius:20,
        padding:10,
        
    },
    button:{
        margin:10,

    },
    LabelContainer:{
        justifyContent:'center',
    },
    title:{
        fontFamily:'times new roman',
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',
    },
    overlay:{
        flex:1,
    },
    input:{
        width:300,
        height:60,
        borderStyle:'solid',
        borderWidth:2,
        borderEndEndRadius:8,
        borderColor:'#1E3A8A', 
    },
    buttonLabel:{
        color:'#FFF',
        fontSize:24
    },
    FormContainer:{
        justifyContent:'center',
        paddingHorizontal:10,
        alignItems:'center'
    },
    FormLabel:{
        fontWeight:'bold',
        fontSize:24,
},
    MainFormContainer:{
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#ffffffb4',
        margin:40,
        borderStyle:'solid',
        borderWidth:3,
        borderColor:'#1E3A8A',
        borderRadius:10,
    }
})