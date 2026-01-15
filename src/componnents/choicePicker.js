import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Checkbox } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function ChoicePicker({ 
  typeEvent = null,   // peut être "rendezvous", "reunion" ou null
  options = [],       // tableau [{label, value}]
  values = [],        // tableau des valeurs sélectionnées
  onChange,            // callback pour mettre à jour
  style=null
}) {
  // Cas 1 : choix unique (rendezvous ou typeEvent null)
  if (typeEvent === "rendezvous" || typeEvent === null) {
    return (
      <RNPickerSelect
        style={[styles.picker,style]}
        onValueChange={(value) => onChange([value])} // stocké comme tableau avec 1 élément
        items={options}
        placeholder={{ label: "Choisir une option...", value: null,color:"#000", }}
        
        value={values[0] || null}
      />
    );
  }

  // Cas 2 : choix multiple (réunion)
  if (typeEvent === "reunion") {
    const toggle = (val) => {
      onChange(
        values.includes(val)
          ? values.filter((v) => v !== val)
          : [...values, val]
      );
    };

    return (
      <View>
        {options.map((opt) => (
          <Checkbox.Item
            key={opt.value}
            label={opt.label}
            status={values.includes(opt.value) ? "checked" : "unchecked"}
            onPress={() => toggle(opt.value)}
          />
        ))}
      </View>
    );
  }

  return null;
}
const styles=StyleSheet.create({
    picker:{
        borderWidth:2,
        borderRadius:8,
        borderColor:"#000",
        
    }
})
