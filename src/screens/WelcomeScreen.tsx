import { StyleSheet, ImageBackground,Text, View } from 'react-native'
import React from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomeScreen = ({navigation}) => {
    function handleNavigation(){
        navigation.navigate('Login')
    }
  return (
    
   <SafeAreaView style={styles.container}>
       <ImageBackground source={require('../assets/backgroundWelcome.png')} // ton image locale 
        style={styles.background} 
        resizeMode="contain" // ou "contain", "stretch" 
        >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenue sur MonSG+</Text>
      </View>
       <View style={styles.buttonWrapper}>
          <MyButton icon="arrow-forward" iconStyle={styles.icon} onpress={handleNavigation} style={styles.button}/>
        </View>
    </ImageBackground>
   </SafeAreaView>
         
   
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center'
    },
    background:{
        flex:1,
        borderRadius:20,
        padding:10
    },
    button:{
       
        borderRadius:0,
        backgroundColor:'transparent',
        width:100,
        position:'absolute',
        right:20,
        bottom:20,
    },
    buttonWrapper: { 
      position: 'absolute', 
      bottom: 20, // distance du bas 
      right: 20, // distance du bord droit 
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