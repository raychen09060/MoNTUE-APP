import { View, Text, StyleSheet, Image } from 'react-native';
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
    paddingHorizontal: 28,
    paddingTop: 15,
    backgroundColor: '#ffffff',
  },
  poster: {
    width: '100%',
    height: 190,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    color: '#111111',
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#BDBDBD',
  },
});