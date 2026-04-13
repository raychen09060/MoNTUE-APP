import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import BuyTicket from './BuyTicket';
export default function ExhibitionPanel() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/EP_remote-viewing_H.png')}
        style={styles.poster}
        resizeMode="cover"
      />

      <Text style={styles.title}>《遙視》(Remote Viewing)</Text>

      <Text style={styles.note}>
        未滿六歲兒童、持本國身心障礙手冊者免費入場
      </Text>

      <View style={styles.divider} />
      <BuyTicket />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: 300,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: '#111111',
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 5,
  },
  note: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#BDBDBD',
  },
});