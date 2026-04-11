import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function MyTicketPanel() {
  return (
    <View style={[styles.box, { backgroundColor: '#D6E4FF' }]}>
      <Text style={styles.note}>票 券 夾</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingLeft: 28,
    paddingTop: 20,
  },
    note: {
      fontSize: 15,
      color: '#111111',
    }
});