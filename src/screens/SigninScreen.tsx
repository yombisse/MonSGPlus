import { Alert, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../componnents/button'
import Label from '../componnents/label'
import TextInputField from '../componnents/InputField'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addData,getData,clearData } from '../storage/membersStorage'

const STORAGE_KEY="@monsgplus/users"

const SigninScreen = ({navigation}) => {
    const [nom,setNom]=useState('');
    const [prenom,setPrenom]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmpassword]=useState('');

    async function Ajouter() {
        const users = await getData(STORAGE_KEY);
        console.log("users:",users)
        const exists = users.find(u => u.email === email);

        if (exists) {
            Alert.alert("Erreur", "Un compte avec cet email existe déjà !");
            return;
        }

        await addData(STORAGE_KEY, { nom, prenom, email, password });
        console.log("Inscription avec succès");
         
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
            
                <KeyboardAvoidingView style={styles.MainFormContainer} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={50} >
                        <ScrollView contentContainerStyle={{paddingVertical:30}}>
                            <TextInputField label="Nom" value={nom} onChangeText={setNom} placeholder="Fandie" style={styles.FormContainer} inputStyle={styles.input} />
                            <TextInputField label="Prénom" value={prenom} onChangeText={setPrenom} placeholder="Entrer votre prénom" style={styles.FormContainer} inputStyle={styles.input} />
                            <TextInputField label="Email" value={email} onChangeText={setEmail} placeholder="example@gmail.com" keyboardType="email-address" style={styles.FormContainer} inputStyle={styles.input} />
                            <TextInputField label="Mot de passe" value={password} onChangeText={setPassword} placeholder="Entrer votre mot de passe" secureTextEntry style={styles.FormContainer} inputStyle={styles.input} />
                            <TextInputField label="Confirmer Mot de passe" value={confirmpassword} onChangeText={setConfirmpassword} placeholder="Confirmer votre mot de passe" secureTextEntry style={styles.FormContainer} inputStyle={styles.input} />
                            <MyButton label="S'inscrire" onpress={inscrisption} style={styles.SignInbutton} labelStyle={styles.SignInbuttonLabel} />
                            <Label text="ou" style={styles.textStyle} />
                            <MyButton label="Se connecter" onpress={() => navigation.navigate('Login')} style={styles.Loginbutton} labelStyle={styles.LoginbuttonLabel} />
                        </ScrollView>
               
                </KeyboardAvoidingView>
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
        
    },
    Loginbutton:{
        margin:10,
        width:150,
        height:40,
        borderRadius:0,
        backgroundColor:'#ABAA',
        alignSelf:'center',


    },
     LoginbuttonLabel:{
        color:'#FFF',
        fontSize:16
    },
     
    SignInbuttonLabel:{
        color:'#FFF',
        fontSize:24
    },
   
    SignInbutton:{
        marginVertical:5,
        alignSelf:'center',
        width:'80%'

    },
    textStyle:{
        alignSelf:'center'

    },
    LabelContainer:{
        justifyContent:'center',
        color:"white"
    },
    title:{
        fontFamily:'times new roman',
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color:"white"
    },
    overlay:{
        flex:1,
        width:'100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center',
        paddingHorizontal:10,
        
    },
  
    input:{
        width:300,
        height:60,
        borderWidth:1,
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
        fontSize:18,
},
    MainFormContainer:{
        backgroundColor:'#FFF',
        shadowColor: '#FFF',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 5,
        borderWidth:1,

        borderRadius:10,
    }
})