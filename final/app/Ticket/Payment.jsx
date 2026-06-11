import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';

import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
import { useLDM } from '../../../components/LDM';
import { UserData } from '../../../components/UserData';

const { width, height } = Dimensions.get('window');

const paymentMethods = [
  {
    id: 'creditCard',
    title: '信用卡付款',
  },
  {
    id: 'linePay',
    title: 'LINE PAY',
  },
  {
    id: 'buyongPay',
    title: 'BUYONG PAY',
  },
];
function gernerateTicketIds(cart, order) {
    const result = [];
    ['A', 'B', 'C'].forEach(cartId => {
        const oldcount = oldTicket.filter(ticket => ticket.startsWith(cartId)).length;

    for(let i = 0; i < cart[cartId]; i++){
        const chatId = cartId;
        const nextNumber = order.count + 1;
        const orderId = string(nextNumber).padstart(3, '0');
    result.push('${chatId}${orderId}}');

}
    });
    return result;
}

function PaymentOption({ title, selected, onPress }) {
  const { colors } = useLDM();

  return (
    <Pressable onPress={onPress}>
      <Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
        <View
          style={[
            styles.optionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.glow_outline,
            },
          ]}
        >
          <View
            style={[
              styles.radioOuter,
              { borderColor: selected ? colors.accent : colors.text },
            ]}
          >
            {selected && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: colors.accent },
                ]}
              />
            )}
          </View>

          <Text style={[styles.optionText, { color: colors.text }]}>
            {title}
          </Text>
        </View>
      </Shadow>
    </Pressable>
  );
}

export default function Payment() {
  const { colors } = useLDM();
  const { totalPrice, order } = useLocalSearchParams();

  const [selectedPayment, setSelectedPayment] = useState('creditCard');

  const handleConfirmPayment = () => {
    const parsedOrder
    
    Alert.alert('付款成功', '票券已加入我的票券', [
      {
        text: 'OK',
        onPress: () => {
          router.replace('/Ticket');
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgc }]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={[styles.backText, { color: colors.text }]}>‹</Text>
      </Pressable>

      <Text style={[styles.totalText, { color: colors.text }]}>
        總金額 ${totalPrice}
      </Text>

      <Text style={[styles.title, { color: colors.text }]}>
        請 選 擇 支 付 方 式
      </Text>

      <View style={styles.optionList}>
        {paymentMethods.map(method => (
          <PaymentOption
            key={method.id}
            title={method.title}
            selected={selectedPayment === method.id}
            onPress={() => setSelectedPayment(method.id)}
          />
        ))}
      </View>

      <Pressable
        style={[
          styles.confirmButton,
          { backgroundColor: colors.accent },
        ]}
        onPress={handleConfirmPayment}
      >
        <Text style={styles.confirmText}>確認付款</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.12,
    paddingTop: height * 0.1,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },

  backText: {
    fontSize: 42,
    lineHeight: 42,
    fontWeight: '300',
  },

  totalText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 28,
  },

  title: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 4,
    marginBottom: 44,
  },

  optionList: {
    gap: 22,
  },

  optionCard: {
    width: width * 0.76,
    minHeight: 56,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioOuter: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  optionText: {
    fontSize: 22,
    letterSpacing: 5,
  },

  confirmButton: {
    position: 'absolute',
    bottom: height * 0.13,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
  },

  confirmText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});