import { StyleSheet, ImageBackground,Text, View } from 'react-native'
import React from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import Label from '../componnents/label'

const WelcomeScreen = ({navigation}) => {
    function handleNavigation(){
        navigation.navigate('Login')
    }
  return (
    
   <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Label text={"MonSGPlus"} textStyle={styles.title}/>
      </View>
      <View style={styles.body} >
        <ImageBackground source={require('../assets/backgroundWelcome.png')} 
          style={styles.background} 
          resizeMode="cover" 
          >
          <View style={styles.overlay}>
            <Label text={"Bienvenu sur MonSG+"} textStyle={styles.welcomeTitle}/>
            <Label text={"Gérer vos membres et réunion en toute simplicité"} textStyle={styles.welcomeSubtitle}/>
           
          </View>
          <View style={styles.buttonWrapper}>
              <MyButton label={"Commencer"} labelStyle={styles.buttonText} onpress={handleNavigation} />
            </View>
          
        </ImageBackground>

      </View>
     
      
   </SafeAreaView>
         
   
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // fond clair
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#1E3A8A', // bleu principal
    
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // assombrir l’image
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: '80%',
  },
 
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontFamily:'Roboto',
    fontSize: 26,
    fontWeight:'bold',
    color: '#1E3A8A',
    textAlign:'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
});
