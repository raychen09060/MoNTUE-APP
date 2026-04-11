import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function VisitTicketPanel() {
  return (
    <View style={[styles.box, { backgroundColor: '#ffffff' }]}>
      <Text>期中太忙了TT此功能尚未開啟！</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});