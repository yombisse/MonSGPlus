import { StyleSheet, ImageBackground,Text, View } from 'react-native'
import React from 'react'
import MyButton from '../componnents/button'

const WelcomeScreen = ({navigation}) => {
    function handleNavigation(){
        navigation.navigate('Login')
    }
  return (
    
    <ImageBackground source={require('../assets/backgroundWelcome.png')} // ton image locale 
        style={styles.background} 
        resizeMode="contain" // ou "contain", "stretch" 
        >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenue sur MonSG+</Text>
        <MyButton icon="arrow-forward" iconStyle={styles.icon} onpress={handleNavigation} style={styles.button}/>
      </View>
    </ImageBackground>
         
   
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    background:{
        flex:1,
        borderRadius:20,
        padding:10
    },
    button:{
        marginTop:700,
        borderRadius:0,
        backgroundColor:'transparent',
        width:100,
        position:'absolute',
        right:0,
        top:20,
        

    },
    title:{
        fontFamily:'times new roman',
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',

    },
    icon:{
        fontSize:50,
        color:'blue'

    }
})