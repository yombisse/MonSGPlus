import React from "react";
import { DrawerContentScrollView,DrawerItem } from "@react-navigation/drawer";
import { View,Image, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from "../componnents/label";
import  {deconnexion}  from './logout';


const CustomDrawer = (props) => {
    const notificationCount=3;


  return (
    <DrawerContentScrollView {...props}>
        <View style={styles.user_header}>
            <View style={styles.user_avatar}>
                <Label text={"FM"}style={styles.user_avatar_icon}/>
            </View>
            <View style={styles.user_info}>
                <Label text={"FANDIE MICHEL"} style={styles.user_name}/>
                <Label text={"yombissefandie@gmail.com"} style={styles.user_email}/>
            </View>
        </View>

        <DrawerItem label="Notifications"
        icon={()=>{
            <View style={styles.notification_icon}>
                <Ionicons name="notifications-outline" size={22} color="blue"/>
                {notificationCount>0 &&(
                    <View style={styles.notification_non_lues}>
                        <Label text={notificationCount} style={styles.notification_count}/>
                    </View>
                )}
            </View>
        }}
         onPress={() => props.navigation.navigate('Notifications')}
          />
          <DrawerItem label="Profile"
          icon={()=> <Ionicons name="person-outline" size={22} color="blue"/>}
           onPress={() => props.navigation.navigate('Mon Profile')}
          />
          <DrawerItem label={"Statistiques"}
          icon={()=> <Ionicons name="stats-outline" size={22} color="blue"/>}
           onPress={()=>props.navigation.navigate('Stats')}/>
          <DrawerItem label={"Paramètres"}
          icon={()=> <Ionicons name="settings-outline" size={22} color="blue"/>} 
          onPress={()=>props.navigation.navigate('Settings')}/>
          <DrawerItem label={"Aide"} 
          icon={()=> <Ionicons name="help-circle-outline" size={22} color="blue"/>}
          onPress={()=>props.navigation.navigate('Help')}/>
          <DrawerItem label="A propos"
          icon={()=> <Ionicons name="information-circle-outline" size={22} color="blue"/>} 
          onPress={()=> props.navigation.navigate('About')}
          />
          <View style={styles.deconnexion}>
            <DrawerItem label="Déconnexion"
            icon={()=> <Ionicons name="log-out-outline" size={22} color="blue"/>} 
            onPress={()=>deconnexion(props.navigation)}
            />

          </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer;
const styles = StyleSheet.create({
  user_header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f3f4f6', // gris clair
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  user_avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E3A8A', // bleu principal
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  user_avatar_icon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  user_info: {
    flex: 1,
  },
  user_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  user_email: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  notification_icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notification_non_lues: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification_count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deconnexion: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

