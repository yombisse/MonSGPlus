import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../componnents/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LineChart } from 'react-native-gifted-charts'
import Label from '../componnents/label'
import { getData } from '../storage/membersStorage'
import {CURENT_USER} from '../componnents/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getISOWeek } from 'date-fns';

 const CURRENT_USER_STORAGE_KEY='@monsgplus/users';
 const Members="@monsgplus/members";
 const Events="@monsgplus/events";
const DashboardScreen = ({navigation}) => {
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState([]);
  const [events, setEvents] = useState([]); // ✅ tableau vide

  const CURRENT_USER_STORAGE_KEY='@monsgplus/current_users'; // ✅ corriger la clé

async function loadMembers() {
  try {
    const membersData = await getData(Members);
    setMembers(membersData || []);

    const EventsData = await getData(Events);
    setEvents(EventsData || []);

    const json = await AsyncStorage.getItem(CURRENT_USER_STORAGE_KEY); 
    if (json) { 
      const parsedUser = JSON.parse(json);
      setUser(parsedUser);
      console.log("Utilisateur courant chargé:", parsedUser);
    }
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
  const Meets = events.filter(e=>e.typeEvent?.toLowerCase()==='reunion');
  const totalMeets=Meets.length
  const nextMeet = Meets.length > 0 ? Meets[0] : null;
  const Rendezvous = events.filter(e=>e.typeEvent?.toLowerCase()==='rendezvous');
  const totalRendezvous=Rendezvous.length
  const nextRendezvous = Rendezvous.length > 0 ? Rendezvous[0] : null;
 


// Fonction principale pour regrouper par semaine
function getWeeklyCounts(meet) {
  const counts = {};
  meet.forEach(m => {
    // ⚠️ Si tes dates sont au format "dd-mm-yyyy", il faut les parser correctement
    const [day, month, year] = m.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const week = `S${getISOWeek(date)}`; // Exemple: "S1", "S2", ...
    counts[week] = (counts[week] || 0) + 1;
  });

  return Object.entries(counts).map(([week, count]) => ({
    value: count,
    label: week,
  }));
}

const chartData = getWeeklyCounts(Meets);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView  contentContainerStyle={{padding:10,}}>
        <Label text={"Tableau de bord"} textStyle={styles.Title}/>
        <Label text={`Bonjour, ${user?.prenom  ?? "Rien"}`} textStyle={styles.Subtitle}/>

        <View style={styles.chartContainer}>
          <LineChart
              data={chartData}
              height={200}
              width={250}
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
          <View style={styles.Middlecard}>
            <Text style={styles.cardTitle}>{totalRendezvous}</Text>
            <Text style={styles.cardTitle}>RendezVous</Text>
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
            onPress={() => navigation.navigate('Events', { screen: 'MeetDetails', params: { events: nextMeet }})}
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

        {nextRendezvous ? (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate('Events', { screen: 'MeetDetails', params: { events: nextRendezvous }})}
          >
            <View style={styles.MemberRow}>
              <View style={styles.centerContent}>
                <Text style={styles.nom} numberOfLines={2}>
                  {nextRendezvous.titre}
                </Text>
                <View style={styles.statutBadge}>
                  <Text style={styles.statutText}>{nextRendezvous.statut}</Text>
                </View>
              </View>
              <Text style={{padding:5}}>{nextRendezvous.date}</Text>
              <Text style={{padding:5}}>{nextRendezvous.heure}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={{marginTop:10}}>Aucune rencontre prévue</Text>
        )}
      </ScrollView>
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
Middlecard:{
  flex: 1,
  backgroundColor: 'red',
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
