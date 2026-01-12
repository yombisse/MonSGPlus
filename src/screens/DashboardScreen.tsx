import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LineChart } from 'react-native-gifted-charts'
import Label from '../componnents/label'
import { getData } from '../storage/membersStorage'

const data = [
  { value: 3, label: 'Jan' },
  { value: 5, label: 'Fév' },
  { value: 2, label: 'Mar' },
  { value: 6, label: 'Avr' },
  { value: 4, label: 'Mai' },
];
 const Members="@monsgplus/members";
 const Meets="@monsgplus/meets";
const DashboardScreen = ({navigation}) => {
  const [members, setMembers] = useState([]);
  const [meets, setMeets] = useState([]); // ✅ tableau vide

  async function loadMembers() {
    try {
      const membersData = await getData(Members);
      setMembers(membersData || []);
      const meetsData = await getData(Meets);
      setMeets(meetsData || []);
    } catch (error) {
      console.warn("Erreur de chargement des données", error);
    }
  }

  useEffect(() => {
    loadMembers();
    const unsubscribe = navigation.addListener('focus', loadMembers);
    return unsubscribe;
  }, [navigation]);

  const totalMembers = members.length;
  const totalMeets = meets.length;
  const nextMeet = meets.length > 0 ? meets[0] : null;
  // Fonction pour obtenir le numéro de semaine d'une date
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // dimanche = 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Fonction principale pour regrouper par semaine
function getWeeklyCounts(meet) {
  const counts = {};
  meet.forEach(m => {
    const date = new Date(m.date);
    const week = `S${getWeekNumber(date)}`; // Exemple: "S1", "S2", ...
    counts[week] = (counts[week] || 0) + 1;
  });

  return Object.entries(counts).map(([week, count]) => ({
    value: count,
    label: week,
  }));
}
const chartData=getWeeklyCounts(meets);


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.body}>
        <Label text={"Tableau de bord"} textStyle={styles.Title}/>
        <Label text={"Bonjour, secrétaire"} textStyle={styles.Subtitle}/>

        <View style={styles.chartContainer}>
          <LineChart
              data={chartData}
              height={200}
              width={300}
              color="#1E3A8A"
              thickness={3}
              hideDataPoints={false}
              dataPointsColor="#4A90E2"
              showVerticalLines
              spacing={40}
              initialSpacing={20}
              yAxisColor="#ccc"
              xAxisColor="#ccc"
            />
          </View>

        {/* Cartes stats */}
        <View style={{flexDirection:'row'}}>
          <View style={styles.Leftcard}>
            <Text style={styles.cardTitle}>{totalMembers}</Text>
            <Text style={styles.cardTitle}>Membres</Text>
          </View>
          <View style={styles.Rightcard}>
            <Text style={styles.cardTitle}>{totalMeets}</Text>
            <Text style={styles.cardTitle}>Réunions</Text>
          </View>
        </View>

        {/* Prochaine rencontre */}
        {nextMeet ? (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate('MeetDetails', { meet: nextMeet })}
          >
            <View style={styles.MemberRow}>
              <View style={styles.centerContent}>
                <Text style={styles.nom} numberOfLines={2}>
                  {nextMeet.titre}
                </Text>
                <View style={styles.statutBadge}>
                  <Text style={styles.statutText}>{nextMeet.statut}</Text>
                </View>
              </View>
              <Text style={{padding:5}}>{nextMeet.date}</Text>
              <Text style={{padding:5}}>{nextMeet.heure}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={{marginTop:10}}>Aucune rencontre prévue</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F9FAFB',
  },
 Title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#111827',
  textAlign: 'center',
  marginBottom: 10,
},
  Subtitle: {
  fontSize: 16,
  color: '#6B7280',
  textAlign: 'center',
  marginBottom: 20,
},
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#1E3A8A', // bleu principal
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
  },
  Leftcard: {
  flex: 1,
  backgroundColor: '#30adadff',
  borderRadius: 10,
  padding: 15,
  margin: 8,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
Rightcard: {
  flex: 1,
  backgroundColor: '#1E3A8A',
  borderRadius: 10,
  padding: 15,
  margin: 8,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
cardTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
  textAlign:'center',
  
  
},
cardValue: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#2563EB',
},
 MemberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 6,
    width: '100%',
  },
  centerContent: {
    flex: 1, 
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
   nom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1, // Crucial pour le retour à la ligne
  },
  statutBadge: {
    backgroundColor: 'green', // Votre couleur demandée
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start', // S'adapte à la longueur du mot
    marginTop: 4,
  },
  statutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
chartContainer: {
  borderRadius: 20,
  borderWidth:1,
  padding: 15,
  marginBottom: 20,
 
},

});
