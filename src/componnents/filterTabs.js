import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FilterTabs({ options, selected, onChange }) {
  return (
    <View style={styles.tabRow}>
        {options.map((opt, index) => (
            <TouchableOpacity
            key={opt.value || index}   // ✅ clé unique
            style={[styles.tab, selected === opt.value && styles.activeTab]}
            onPress={() => onChange(opt.value)}
            >
            <Text style={[styles.tabText, selected === opt.value && styles.activeText]}>
                {opt.label}
            </Text>
            </TouchableOpacity>
        ))}
    </View>

  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#E5E7EB", // gris clair
  },
  activeTab: {
    backgroundColor: "#1E3A8A", // bleu actif
  },
  tabText: {
    color: "#000",
    fontWeight: "600",
  },
  activeText: {
    color: "#FFF",
  },
});
