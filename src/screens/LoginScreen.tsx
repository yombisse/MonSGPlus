import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../componnents/button'
import Label from '../componnents/label'
import TextInputField from '../componnents/InputField'

const LoginScreen = ({navigation}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
  return (
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
                keyboardType={'email-text'} 
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
            <MyButton 
                label={"Se connecter"}  
                onpress={()=>navigation.navigate('Home')} 
                style={styles.button}
                labelStyle={styles.buttonLabel}
                />
            </View>
         
            
          </View>
        </ImageBackground>
    
  )
}

export default LoginScreen
const styles = StyleSheet.create({
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
        paddingLeft:10,
        paddingRight:10,
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
        marginTop:250,
        borderStyle:'solid',
        borderWidth:3,
        borderColor:'#1E3A8A',
        borderRadius:10,
    }
})