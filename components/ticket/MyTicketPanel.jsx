import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function MyTicketPanel() {
  return (
    <View style={[styles.box, { backgroundColor: '#D6E4FF' }]}>
      <Text style={styles.note}>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    note: {
      fontSize: 50,
      color: '#111111',
    }
});