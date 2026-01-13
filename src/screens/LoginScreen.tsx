import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../componnents/button'
import Label from '../componnents/label'
import TextInputField from '../componnents/InputField'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getData } from '../storage/membersStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY='@monsgplus/users'
const CURRENT_USER_STORAGE_KEY='@monsgplus/current_users'
    

const LoginScreen = ({navigation}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [data,setData]=useState([])
    const [erreur,setErreur]=useState('')

    async function loadData() {
        try {
            const list=await getData(STORAGE_KEY)
            setData(list);
            console.log("donnes chargee avec succces",list)
        } catch (error) {
            console.warn("erreur de chargement de donnes",error)
            
        }
    }

    useEffect(()=>{
        loadData()
    },[])

   
    
    async function Connexion() {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Erreur', "Veuillez renseigner les champs !");
            return;
        }

        try {
            if (Array.isArray(data)) {
            const user = data.find(
                                    u =>
                                        u.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
                                        u.password?.trim() === password.trim()
                                    );

            console.log("Utilisateur trouvé:", user);

            if (user) {
                await AsyncStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
                console.log("Utilisateur stocké dans current_user:", user);
                navigation.navigate('Home');
                
                
            } else {
                setErreur("Email ou mot de passe incorrect");
            }
            } else {
            setErreur("Les données utilisateurs ne sont pas valides");
            }
        } catch (error) {
            console.warn("Erreur connexion", error);
            setErreur("Impossible de vérifier les identifiants");
        }
        }


   return (
        <SafeAreaView style={styles.Container}>
            <ImageBackground source={require('../assets/login.jpg')} // ton image locale 
                    style={styles.background} 
                    resizeMode="cover" // ou "contain", "stretch" 
                    >
                <View style={styles.overlay}>
                    <Label text={"Connectez-Vous"} style={styles.LabelContainer} textStyle={styles.title}/>

                
                    <View style={styles.MainFormContainer}>
                        <TextInputField 
                        label={"Email"} 
                        value={email} 
                        onChangeText={(text)=>setEmail(text)} 
                        placeholder={"example@gmail.com"} 
                        keyboardType={'email-address'} 
                        labelStyle={styles.FormLabel}
                        style={styles.FormContainer}
                        inputStyle={styles.input}
                        
                        />
                        <TextInputField 
                            label={"Password"} 
                            value={password} 
                            onChangeText={(text)=>setPassword(text)} 
                            placeholder={'Entrer votre mot de passe'}
                            inputStyle={styles.input}
                            labelStyle={styles.FormLabel}
                            style={styles.FormContainer}
                            />
                        {erreur?<Text style={{textAlign:'center',color:'red'}}>{erreur}</Text> :null}
                        <MyButton 
                            label={"Se connecter"}  
                            onpress={Connexion} 
                            style={styles.Loginbutton}
                            labelStyle={styles.LoginbuttonLabel}
                        
                        />
                        <Label text={"ou"} textStyle={styles.textStyle}/>
                        <MyButton 
                            label={"S'inscrire "}  
                            onpress={()=>navigation.navigate('SignIn')} 
                            style={styles.SignInbutton}
                            labelStyle={styles.SignInbuttonLabel}
                        />
                    </View>
                
                    
                </View>
            </ImageBackground>
        </SafeAreaView>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
       
    },
    background:{
        flex:1,
        borderRadius:20,
        
    },
    SignInbutton:{
        margin:10,
        width:100,
        height:40,
        borderRadius:0,
        backgroundColor:'#ABAA',
        alignSelf:'center'


    },
     SignInbuttonLabel:{
        color:'#FFF',
        fontSize:16
    },
     
    LoginbuttonLabel:{
        color:'#FFF',
        fontSize:24
    },
   
    Loginbutton:{
        marginVertical:5,
        alignSelf:'center',
        width:'80%'

    },
    textStyle:{
        marginHorizontal:'45%',

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
        borderStyle:'solid',
        borderWidth:1,
        borderEndEndRadius:8,
        borderColor:'#1E3A8A', 
    },
    FormContainer:{
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
        alignItems:'center'
    },
    FormLabel:{
        fontWeight:'bold',
        fontSize:24,
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