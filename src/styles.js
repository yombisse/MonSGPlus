import { StyleSheet } from "react-native";


// STYLES GLOBAUX
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  body:{
    flex:5,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
  },
  // STYLES PAGE DE BIENVENUE
welcomeTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#111827',
  textAlign: 'center',
  marginBottom: 10,
},
welcomeSubtitle: {
  fontSize: 16,
  color: '#6B7280',
  textAlign: 'center',
  marginBottom: 20,
},
buttonPrimary: {
  backgroundColor: '#1E3A8A',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
},
buttonPrimaryText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},

// STYLES TABLEAU DE BORD
card: {
  flex: 1,
  backgroundColor: '#FFF',
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
  color: '#111827',
},
cardValue: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#2563EB',
},
chartContainer: {
  backgroundColor: '#FFF',
  borderRadius: 10,
  padding: 15,
  marginBottom: 20,
},

// STYLES LISTES DE MEMBRES 
searchBar: {
  backgroundColor: '#FFF',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginBottom: 15,
},
memberRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
},
memberName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#111827',
},
memberRole: {
  fontSize: 14,
  color: '#6B7280',
},
iconButton: {
  marginLeft: 'auto',
  flexDirection: 'row',
  gap: 10,
},

// STYLE LISTE DE REUNIONS
meetingRow: {
  backgroundColor: '#FFF',
  borderRadius: 8,
  padding: 12,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},
meetingTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#111827',
},
meetingInfo: {
  fontSize: 14,
  color: '#6B7280',
  marginTop: 4,
},
statusBadge: {
  alignSelf: 'flex-start',
  backgroundColor: '#2563EB',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},
statusText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: '600',
},
// DETAILS DE REUNION
detailRow: {
  marginBottom: 15,
},
detailLabel: {
  fontSize: 14,
  fontWeight: '600',
  color: '#6B7280',
},
detailValue: {
  fontSize: 16,
  color: '#111827',
},
notesBox: {
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderRadius: 8,
  backgroundColor: '#FFF',
  padding: 12,
  minHeight: 100,
  textAlignVertical: 'top',
},

// SYLE PARTICIPATION A LA REUNION
presenceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
},
presenceName: {
  fontSize: 16,
  color: '#111827',
  marginLeft: 10,
},
textArea: {
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderRadius: 8,
  backgroundColor: '#FFF',
  padding: 12,
  minHeight: 120,
  textAlignVertical: 'top',
  marginBottom: 15,
  fontSize: 16,
  color: '#000',
},
buttonDanger: {
  backgroundColor: '#DC2626',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},
buttonDangerText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},

});
export default Styles
