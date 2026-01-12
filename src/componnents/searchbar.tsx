import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { getData } from '../storage/membersStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchBar = ({ type }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  async function loadData() {
    try {
      let key;
      if (type === 'members') {
        key = "@monsgplus/members";
      } else if (type === 'meets') {
        key = "@monsgplus/meets";
      }

      const result = await getData(key) || [];
      

      // Normaliser les champs pour la recherche
      const normalized = result.map(item => ({
        id: item.id,
        name: type === 'members' ? item.nom : item.titre,
        extra: type === 'members' ? item.statut : `${item.date} ${item.heure}`,
      }));

      setData(normalized);
    } catch (error) {
      console.warn("Erreur de chargement", error);
    }
  }

  useEffect(() => {
    loadData();
  }, [type]);

  const filteredData = data.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder={`Rechercher ${type === 'members' ? 'un membre' : 'une réunion'}...`}
                placeholderTextColor="#000"
                value={search}
                onChangeText={setSearch}
            />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            {item.extra ? <Text style={styles.itemExtra}>{item.extra}</Text> : null}
          </View>
        )}
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

//   item: {
//     padding: 10, backgroundColor: '#f9f9f9',
//     marginBottom: 5, borderRadius: 6,
//   },
//   itemTitle: { fontSize: 16, fontWeight: '600', color: '#111' },
//   itemExtra: { fontSize: 14, color: '#666' },
item: {
  alignItems:'center',
  paddingVertical:16,
},
MemberRow: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  backgroundColor: '#fff',
  borderBottomWidth:1,
  elevation:2,
  marginVertical: 2,
  borderRadius:6,
},
centerContent: {
  flex: 1,
  marginHorizontal: 12,
  justifyContent: 'center',
},
nom: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  flexShrink: 1,
},
statutBadge: {
  backgroundColor: 'red',
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 4,
  alignSelf: 'flex-start',
  marginTop: 4,
},
statutText: {
  color: 'white',
  fontSize: 12,
  fontWeight: '600',
},
actionButtons: {
  flexDirection: 'row',
  alignItems: 'center',
},
iconButton: {
  padding: 8,
  marginLeft: 4,
},

});

export default SearchBar;
