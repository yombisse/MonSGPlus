import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { getData } from '../storage/membersStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SearchBar = ({ type, value, onChange }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={`Rechercher ${type === 'members' ? 'un membre' : 'une réunion'}...`}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChange} // ✅ renvoie la valeur au parent
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchBar: {
    height: 40, borderColor: '#ccc', borderWidth: 1,
    borderRadius: 8, paddingHorizontal: 10, marginBottom: 10,
  },
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
  backgroundColor: '#fff',
},
searchIcon: {
  marginRight: 8,
},
searchInput: {
  flex: 1,
  height: 40,
},

});

export default SearchBar;
