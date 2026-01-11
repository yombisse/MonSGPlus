import React from "react";
import { TextInput ,StyleSheet, Text, KeyboardAvoidingView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TextInputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  style,
  labelStyle,
  inputStyle,
  placeholderColor
}){
  return(
    
    <SafeAreaView  style={[styles.container,style]}>
      {label && <Text style={[labelStyle]}>{label}</Text>}
       <KeyboardAvoidingView>
         <TextInput
          style={[styles.input,inputStyle]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderColor}
        />
       </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      // flexDirection:'row',
     
      
    },
    input:{
      width:200,
      height:40,
      borderStyle:'solid',
      borderRadius:10,
    },

}

)

