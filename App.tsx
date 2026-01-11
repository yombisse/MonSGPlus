import React from 'react';
import { Text, View ,StyleSheet,Image} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderBackButton } from '@react-navigation/elements';
import MembersListScreen from './src/screens/MembersListScreen';
import MembersFormScreen from './src/screens/MembersFormScreen';
import MembersDetailsScreen from './src/screens/MembersDetailsScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingScreen from './src/screens/SettingScreen';
import AboutScreen from './src/screens/AboutScreen';
import HelpScreen from './src/screens/HelpScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MeetScreen from './src/screens/MeetScreen';
import CreateMeetScreen from './src/screens/CreateMeetScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MeetListScreen from './src/screens/MeetListScreen';
import MeetDetailScreen from './src/screens/MeetDetailScreen';


const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();
const Drawer=createDrawerNavigator();


function MemberStack(navigation){
  return(

    <Stack.Navigator >
      <Stack.Screen name='Dashboard' component={DashboardScreen} 
       options={{headerShown:false}}/>
      <Stack.Screen name='Meets' component={MeetListScreen} 
       options={{headerShown:false}}/>
       <Stack.Screen name='MeetDetails' component={MeetDetailScreen} 
       options={{headerShown:false}}/>
       <Stack.Screen name='Members' component={MembersListScreen} 
       options={{headerShown:false}}/>
      <Stack.Screen name='MemberForm' component={MembersFormScreen}
      options={{ title: "Ajouter / Modifier" ,headerShown:true}} />
      <Stack.Screen name='MemberDetail' component={MembersDetailsScreen}
      options={{ title: "Details du membre",headerShown:true }} />
      <Stack.Screen name='CreateMeet' component={CreateMeetScreen}
      options={{ title: "Planifier une reuinion",headerShown:true }} />
      <Stack.Screen name='ParticipateMeet' component={MeetScreen}
      options={{ title: "Participer a une reuinion",headerShown:true }} />
    </Stack.Navigator>

  );
}

function MainTab(){
  return(
  
    <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;
          if(route.name==='Members'){
            iconName=focused? 'people' : 'people-outline';
          }
          else if (route.name==='Stats'){
            iconName=focused? 'stats-chart' : 'stats-chart-outline';
          }
          else{ if(route.name==='Settings')
            iconName= focused? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: '#1E3A8A',
        tabBarInactiveTintColor: '#111827',
        headerShown:false,
        tabBarHideOnKeyboard:true,
      })
    }
    >
      <Tab.Screen name='Members' component={MemberStack} options={{ headerShown: false, title: "Accueil" }} />
      <Tab.Screen name='Stats' component={StatsScreen}/>
      <Tab.Screen name='Settings' component={SettingScreen}/>
    </Tab.Navigator>

  );
}

function WelcomeStack(){
  return(
    <Stack.Navigator>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  )
}

function HomeDrawer(){
  return(
    <Drawer.Navigator  screenOptions={{
          headerStyle:{
              backgroundColor:"#1E3A8A",
              height:100,
              padding:5,
          }}}>
          <Drawer.Screen name='Home' component={MainTab} options={{ headerShown: true, title: "Accueil",
            headerTitle: () => (               // ✅ logo au centre
            <Image source={require('./src/assets/logo.png')} style={styles.logo} resizeMode="contain" />
          ),
           }} />
          <Drawer.Screen name='About' component={AboutScreen} options={{headerShown:false}}/>
          <Drawer.Screen name='Help' component={HelpScreen} options={{headerShown:false}}/>
        </Drawer.Navigator>
  )
}

const App=() =>{
  return (
   
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false,
        }}>
          <Stack.Screen name='Welcome' component={WelcomeStack} />
          <Stack.Screen name='Home' component={HomeDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
   
  );
  
}
export default App;

const styles=StyleSheet.create({
  logo:{
    width:80,
    height:80,
    borderRadius:40,
    borderWidth:1,
    marginLeft:120,
    marginBottom:10
  }
})