import React from 'react';
import { Text, View ,StyleSheet,Image, Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderBackButton } from '@react-navigation/elements';
import MembersListScreen from './src/screens/MembersListScreen';
import MembersFormScreen from './src/screens/MembersFormScreen';
import MembersDetailsScreen from './src/screens/MembersDetailsScreen';
import StatsScreen from './src/drawer/StatsScreen';
import SettingScreen from './src/drawer/SettingScreen';
import ProfileScreen from './src/drawer/ProfileScreen';
import HelpScreen from './src/drawer/HelpScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MeetScreen from './src/screens/MeetScreen';
import CreateMeetScreen from './src/screens/CreateMeetScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MeetListScreen from './src/screens/EventListScreen';
import MeetDetailScreen from './src/screens/EventDetailScreen';
import SigninScreen from './src/screens/SigninScreen';
import EventForm from './src/forms/EventForm';
import EventDetailScreen from './src/screens/EventDetailScreen';
import CustomDrawer from './src/drawer/CustomDrawer';
import NotificationScreen from './src/drawer/NotificationScreen';
import AboutScreen from './src/drawer/AboutScreen';



const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();
const Drawer=createDrawerNavigator();


function MemberStack(navigation){
  return(

    <Stack.Navigator >
       <Stack.Screen name='Members' component={MembersListScreen} 
       options={{headerShown:false}}/>
      <Stack.Screen name='MemberForm' component={MembersFormScreen}
      options={{ title: "Ajouter / Modifier" ,headerShown:true}} />
      <Stack.Screen name='MemberDetail' component={MembersDetailsScreen}
      options={{ title: "Details du membre",headerShown:true }} />
      
    </Stack.Navigator>

  );
}

function MeetStack(navigation){
  return(

    <Stack.Navigator >
      <Stack.Screen name='Meets' component={MeetListScreen} 
       options={{headerShown:false}}/>
       <Stack.Screen name='MeetDetails' component={EventDetailScreen} 
       options={{headerShown:false}}/>
      <Stack.Screen name='CreateMeet' component={EventForm}
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
          if (route.name==='Dashboard'){
            iconName=focused? 'home' : 'home-outline';
          }
          
          else if(route.name==='Members'){
            iconName=focused? 'people' : 'people-outline';
          }
          else{ if(route.name==='Events')
            iconName= focused? 'calendar' : 'calendar-outline';
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
      <Tab.Screen name='Dashboard' component={DashboardScreen} options={{ headerShown: false, title: "Accueil" }} />
      <Tab.Screen name='Members' component={MemberStack}/>
      <Tab.Screen name='Events' component={MeetStack}/>
    </Tab.Navigator>

  );
}

function WelcomeStack(){
  return(
    <Stack.Navigator>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}  options={{headerShown:false}} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SignIn' component={SigninScreen} />


    </Stack.Navigator>
  )
}

// function AuthStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="SignIn" component={SigninScreen} />
//     </Stack.Navigator>
//   );
// }

// function AppNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <HomeDrawer /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }


function HomeDrawer(){

  return(
    <Drawer.Navigator 
      drawerContent={(props) =><CustomDrawer {...props}/>}
    
    screenOptions={{
          headerStyle:{
              backgroundColor:"#1E3A8A",
              height:100,
              padding:5,
              paddingVertical: 20,
              alignItems: 'center',
              
          }}}>
          <Drawer.Screen name='Home' component={MainTab} options={{ headerShown: true, headerTintColor:'#fff', title: "Accueil",
           
           }} />
          <Drawer.Screen name='Mon Profile' component={ProfileScreen} options={{headerShown:false}}/>
          <Drawer.Screen name='Notifications' component={NotificationScreen} options={{headerShown:false}}/>
          <Drawer.Screen name='Stats' component={StatsScreen} options={{headerShown:false}}/>
          <Drawer.Screen name='Settings' component={SettingScreen} options={{headerShown:false}}/>
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