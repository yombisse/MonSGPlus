import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../componnents/label';

export default function MembersDetailsScreen({route}) {
  const {member}=route.params;
  return (
    <View style={styles.container}> 
      <Label style={styles.id} valueStyle={styles.id} text="Identifiant:" value={member.id} /> 
      <Label style={styles.nom} valueStyle={styles.nom}  text="Nom:" value={member.nom} /> 
      <Label style={styles.prenom} valueStyle={styles.prenom} text="Prénom:" value={member.prenom} /> 
      <Label style={styles.statut} valueStyle={styles.statut} text="Statut:" value={member.statut} /> 
      <Label style={styles.filiere} valueStyle={styles.filiere}  text="Filière:" value={member.filiere} />  
      <Label style={styles.contact} valueStyle={styles.contact} text="Contact:" value={member.addresse} /> 
      <Label style={styles.addresse} valueStyle={styles.addresse} text="Adresse:" value={member.contact} />
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#F3F4F6', // gris clair pour contraste 
    padding: 100, 

  }, 
  id: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1E3A8A', // bleu foncé pour identifiant 
    marginBottom: 12, 
    padding:10,
  }, 
  nom: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 8, 
    padding:10,
  }, 
  prenom: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 8, 
    padding:10,
  }, 
  statut: { 
    fontSize: 16, 
    fontWeight:'bold',
    color: '#374151', // gris foncé 
    marginBottom: 12, 
    padding:10,
  }, 
  filiere: { 
    fontSize: 16, 
    color: '#111827', 
    marginBottom: 8, 
    fontWeight:'bold',
    padding:10,
  }, 
    addresse: { 
      fontSize: 16, 
      color: '#111827', 
      marginBottom: 8,
      fontWeight:'bold', 
      padding:10,
    }, 
      contact: { fontSize: 16, 
        color: '#111827', 
        marginBottom: 8, 
        fontWeight:'bold',
        padding:10,
      }, 
    });

