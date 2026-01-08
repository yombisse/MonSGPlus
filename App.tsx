import React from 'react';
import { Text, View ,StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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


const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();
const Drawer=createDrawerNavigator();


function MemberStack(navigation){
  return(

    <Stack.Navigator >
      <Stack.Screen name='Members' component={MembersListScreen} 
       options={{headerShown:false}}/>
      <Stack.Screen name='MemberForm' component={MembersFormScreen}
      options={{ title: "Ajouter / Modifier" }} />
      <Stack.Screen name='MemberDetail' component={MembersDetailsScreen}
      options={{ title: "Ajouter / Modifier" }} />
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
      })
    }
    >
      <Tab.Screen name='Members' component={MemberStack}/>
      <Tab.Screen name='Stats' component={StatsScreen}/>
      <Tab.Screen name='Settings' component={SettingScreen}/>
    </Tab.Navigator>

  );
}


const App=() =>{
  return (
   
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator  >
          <Drawer.Screen name='Home' component={MainTab} options={{headerShown:false}}/>
          <Drawer.Screen name='About' component={AboutScreen} options={{headerShown:false}}/>
          <Drawer.Screen name='Help' component={HelpScreen} options={{headerShown:false}}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
   
  );
  
}
export default App;