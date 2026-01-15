import { Image, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import Label from '../componnents/label';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar, Divider } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function MembersDetailsScreen({ route }) {
  const { member } = route.params;
  const presenceRate = 0.5;
  const abscenceRate = 0.4;

  // Petit composant interne pour les lignes d'info
  const InfoRow = ({ label, value, color = '#333' }) => (
    <View style={styles.infoRow}>
      <Label style={styles.labelTitle} text={label} />
      <Label style={[styles.labelValue, { color }]} text={value} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header avec Image */}
        <View style={styles.header}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={require('../assets/logo.png')} />
          </View>
          <Label textStyle={styles.headerName} text={`${member.nom} ${member.prenom}`} />
          <View style={styles.badgeStatut}>
            <Label textStyle={styles.badgeText} text={member.statut} />
          </View>
        </View>

        {/* Carte d'informations */}
        <View style={styles.detailsCard}>
          <InfoRow label="Identifiant" value={member.id} color="#1E3A8A" />
          <Divider style={styles.divider} />
          <InfoRow label="Filière" value={member.filiere} />
          <Divider style={styles.divider} />
          <InfoRow label="Adresse" value={member.addresse} />
          <Divider style={styles.divider} />
          <InfoRow label="Contact" value={member.contact} />
          <InfoRow label="Email" value={member.email} />
          <InfoRow label="Département" value={member.departement} />
          <InfoRow label="Date d'ajout" value={member.dateCreation} />
        </View>

        {/* Section Statistiques */}
        <View style={styles.statsCard}>
          <Label style={styles.sectionTitle} text="Statistiques d'assiduité" />
          
          <View style={styles.progressSection}>
            <View style={styles.progressTextRow}>
              <Label style={styles.progressLabel} text="Présence" />
              <Label style={styles.progressPercent} text={`${presenceRate * 100}%`} />
            </View>
            <ProgressBar progress={presenceRate} color="#2E7D32" style={styles.bar} />
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressTextRow}>
              <Label style={styles.progressLabel} text="Absence" />
              <Label style={styles.progressPercent} text={`${abscenceRate * 100}%`} />
            </View>
            <ProgressBar progress={abscenceRate} color="#D32F2F" style={styles.bar} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Gris très clair pour le fond
  },
  header: {
    backgroundColor: '#1E3A8A', // Bleu profond
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageWrapper: {
    marginTop: 20,
    padding: 4,
    backgroundColor: '#FFF',
    borderRadius: 60,
    elevation: 10,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 15,
  },
  badgeStatut: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 8,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginTop: -25, // Chevauchement sur le header
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
  labelTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  labelValue: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  divider: {
    backgroundColor: '#EEE',
  },
  statsCard: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E3A8A',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  bar: {
    height: 10,
    borderRadius: 5,
  },
});