import React from "react";
import { Text,StyleSheet, View } from "react-native";

export default function Label({text,value,numberOfLines,ellipsizeMode,textStyle={},valueStyle={},style}){
    return(
        <View style={[styles.container,style]}>
            <Text style={[styles.text,textStyle]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
            {value !== undefined && value !== null && value !== '' && (<Text style={[styles.value, valueStyle]}>{value}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: { 
        marginBottom: 8, 
        flexDirection:'row',
    }, 
    text: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#111', 
    }, 
    value: { 
        fontSize: 16, 
        color: '#444', 
    }, 
});