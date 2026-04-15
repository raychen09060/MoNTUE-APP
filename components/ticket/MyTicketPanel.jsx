import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function MyTicketPanel() {
  return (
    <View style={[styles.box, { backgroundColor: '#ffffff' }]}>
      <Text style={styles.note}>票 券 夾</Text>
      <Text style={styles.description}>明天就要開展了，快去買一張票！</Text>
    </View>
)}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingLeft: 28,
    paddingTop: 20,
  },
    note: {
      fontSize: 15,
      color: '#111111',
    },
    description: {
      fontSize: 12,
      color: '#111111',
      marginTop: 30,
    }

    
});