import { Image, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import Label from '../componnents/label';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function EventDetailScreen({ route }) {
  const { events } = route.params;

  // Petit composant interne pour les lignes d'info
  const InfoRow = ({ label, value, color = '#333' }) => (
    <View style={styles.infoRow}>
      <Label textStyle={styles.labelTitle} text={label} />
      <Label style={[styles.labelValue, { color }]} text={value} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
       <Label textStyle={styles.headerName} text={"Details"} />
       <ScrollView>
        {/* Carte d'informations */}
        <View style={styles.detailsCard}>
          <InfoRow label="Ordere du jour" value={events.titre} color="#1E3A8A" />
          <InfoRow label="Date" value={events.date} color="#1E3A8A" />
          <InfoRow label="Heure" value={events.heure} />
          <InfoRow label="Lieu" value={events.lieu} />
          <InfoRow label="Statut de la reunion" value={events.statut} />
          <InfoRow label="Participants" value={events.participants} />
          <InfoRow label="Auteur" value={events.creePar} />
          <InfoRow label="Type d'evenement" value={events.typeEvent} />
          <InfoRow label="Date de creation" value={events.dateCreation} />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1/2,
    backgroundColor: '#F8F9FA', // Gris très clair pour le fond
    justifyContent:'space-evenly',
  },
 
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginLeft:'35%',

  },
  
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  
  labelValue: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },


});