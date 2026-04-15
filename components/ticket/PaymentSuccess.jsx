import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../Header';
import Footer from '../Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentSuccess() {
  const { total, date } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Header Section="付款結果" />

      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.label}>訂 單 金 額</Text>
        <Text style={styles.amount}>${total || 0}</Text>
        <Text style={styles.date}>{date || '2026/04/17'}</Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/Tickets',
              params: { tab: 'my' },
            })
          }
        >
          <Text style={styles.buttonText}>我的票券</Text>
        </Pressable>
      </View>

      <Footer Section="Tickets" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 24,
  },
  checkCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E8D552',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  checkMark: {
    fontSize: 84,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 90,
  },
  label: {
    fontSize: 20,
    color: '#666666',
    letterSpacing: 6,
    marginBottom: 16,
  },
  amount: {
    fontSize: 64,
    color: '#111111',
    fontWeight: '300',
    marginBottom: 12,
  },
  date: {
    fontSize: 24,
    color: '#444444',
    letterSpacing: 4,
    marginBottom: 120,
  },
  button: {
    backgroundColor: '#E8D552',
    borderRadius: 24,
    paddingHorizontal: 42,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 2,
  },
});