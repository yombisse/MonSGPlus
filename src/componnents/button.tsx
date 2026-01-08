import { StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from './label';

export  default function MyButton({
    label,
    icon='add',
    style={},
    onpress,
    iconStyle,
    labelStyle
  }){
    let iconName;
      if (icon === 'add') { iconName = 'add'; 
      } 
      else if (icon === 'delete'){ iconName = 'trash'; 
      }
      else if (icon === 'arrow-back'){ iconName = 'arrow-back';
      }
  return (
      <TouchableOpacity onPress={onpress} style={[styles.container,style]}>
        <Ionicons name={iconName} size={20} color="#fff" style={[iconStyle]} />
        {label && <Label text={label} style={[styles.text,labelStyle]}/>}
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    
    container: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#1E3A8A', // couleur par défaut 
      paddingHorizontal: 16, 
      height: 48, 
      borderRadius: 8,
     }, 
     icon: {
       marginRight: 8, 
    }, 
    text: { 
      color: '#fff', 
      fontSize: 18, 
      fontWeight: 'bold',
    },
})