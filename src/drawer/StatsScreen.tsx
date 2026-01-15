import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LineChart,BarChart,PieChart } from 'react-native-gifted-charts';
import Label from '../componnents/label';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function StatsScreen({navigation}) {
  const lineData = [
              { value: 10, label: 'Jan' },
              { value: 20, label: 'Fév' },
              { value: 15, label: 'Mar' },
              { value: 30, label: 'Avr' },
              { value: 25, label: 'Mai' },
            ];
  const barData = [
              { value: 12, label: 'Planifiées', frontColor: '#3B82F6' },
              { value: 9, label: 'Tenues', frontColor: '#1E3A8A' },
              { value: 3, label: 'Annulées', frontColor: '#60A5FA' },
            ];


  const pieData = [
              { value: 80, color: '#1E3A8A', label: 'Présents' },
              { value: 20, color: '#60A5FA', label: 'Absents' },
            ];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FFF"/>
      </TouchableOpacity>
      <Text style={styles.titre}>Statistiques</Text>
    </View>
      <ScrollView   contentContainerStyle={{padding:20}}>
          <View style={styles.LineChartContainer}>
            <Label text={"Nouveaux membres par mois"} style={styles.LineChartLabel} textStyle={styles.LineChartLabelText}/>
            <LineChart
              data={lineData}
              thickness={2}
              color="#1E3A8A"
              hideDataPoints={false}
              dataPointsColor="#1E3A8A"
              showVerticalLines
              spacing={40}
              maxValue={40}
              noOfSections={4}
              yAxisColor="#ccc"
              xAxisColor="#ccc"
              rulesColor="#eee"
              backgroundColor="#fff"
              width={250}
            />
          </View>
          <View style={styles.BarChartContainer}>
            <Label text={"Réunions planifiées vs tenues vs annulées"} style={styles.BarChartLabel} textStyle={styles.BarhartLabelText}/>

            <BarChart
              data={barData}
              barWidth={30}
              spacing={30}
              yAxisThickness={0}
              xAxisThickness={0}
              maxValue={15}
              noOfSections={3}
              rulesColor="#eee"
              backgroundColor="#fff"
              width={250}
            />


          </View>

          <View style={styles.PieChartContainer}>
            <Label text={"Nouveaux membres par mois"} style={styles.PieChartLabel} textStyle={styles.PieChartLabelText}/>

            <PieChart
              data={pieData}
              showText
              textColor="white"
              textSize={14}
              radius={80}
              innerRadius={40}
              centerLabelComponent={() => (
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' }}>80%</Text>
              )}
            />  
          </View>
        </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A', // bleu profond
    paddingHorizontal: 16,
    paddingVertical: 20,
    elevation: 4, // ombre Android
    shadowColor: '#000', // ombre iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  titre: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 12,
  },
  
  LineChartContainer:{
      margin:5,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  BarChartContainer:{
    margin:5,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  PieChartContainer:{
      margin:5,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent:'center',
    alignItems:'center'
  }
})