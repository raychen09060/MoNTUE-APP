import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { router } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';

const {width, height} = Dimensions.get('window');

const ticketTypes = [
    {
        cart: 'A',
        title: '一般票',
        subtitle: '開放所有民眾',
        price: 300,
    },
    {
        cart: 'B',
        title: '優惠票',
        subtitle: '滿65歲以上、6歲以下或持身心障礙手冊',
        price: 150,
    },
    {
        cart: 'C',
        title: '北教大專屬票',
        subtitle: '限北教大學生、教師、員工',
        price: 200,
    },
]

const UserData[0].cart = {
    A: ticketCounts.A,
    B: ticketCounts.B,
    C: ticketCounts.C,
};

function TicketCard({ cart, title, subtitle, price, count, setcount }){
    const {colors } = useLDM();

    return (
         <Shadow distance={12} startColor={colors.glow} offset={[0, 0]}>
      <View
        style={[
          styles.ticketCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.glow_outline,
          },

        ]}>

        <View>

          <Text style={[styles.ticketTitle, { color: colors.text }]}>
            {title}
          </Text>

          <Text style={[styles.ticketSubtitle, { color: colors.text }]}>
            {subtitle}
          </Text>

          <Text style={[styles.price, { color: colors.accent }]}>
            ${price}
          </Text>

        </View>

        <View style={styles.counter}>
          <Pressable onPress={() => setCount(Math.max(0, count - 1))}>
            <Text style={styles.counterText}>－</Text>
          </Pressable>
          {count > 0 && (
            <View style={styles.countBox}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          )}
          <Pressable onPress={() => setCount(count + 1)}>
            <Text style={styles.counterText}>＋</Text>
          </Pressable>
        </View>

      </View>
    </Shadow>
    );
}

export default function Select() { 
    const { colors } = useLDM();
    const [selectedTab, setSelectedTab] = useState(0);
    const [ticketCounts, setTicketCounts] = useState({
        A: 0,
        B: 0,
        C: 0
    });
    const setTicketCount = (sort, value) => {
        setTicketCounts(prev => ({
        ...prev,
        [sort]: value,
        }));
    };

    const totalPrice = ticketTypes.reduce((sum, ticket) => {
        return sum + ticket.price * ticketCounts[ticket.sort];
    }, 0);

    const totalCount = ticketTypes.reduce((sum, ticket) => {
        return sum + ticketCounts[ticket.sort];
    }, 0);

    const order = ticketTypes

        .map(ticket => ({
        sort: ticket.sort,
        title: ticket.title,
        price: ticket.price,
        quantity: ticketCounts[ticket.sort],
        }))
        .filter(item => item.quantity > 0);

    const handleCheckout = () => {
        router.push({
        pathname: '/Ticket/Payment',
        params: {
            totalPrice,
            order: JSON.stringify(order),
        },
        });
    };


return (
  <View
    style={[
      styles.container,
      { backgroundColor: colors.bgc }
    ]}
  >
    <Text
      style={[
        styles.exhibitTitle,
        { color: colors.text }
      ]}
    >
      《遙視》（Remote Viewing）
    </Text>

    <ScrollView contentContainerStyle={styles.ticketList}>
      {ticketTypes.map(ticket => (
        <TicketCard
          key={ticket.cart}
          cart={ticket.cart}
          title={ticket.title}
          subtitle={ticket.subtitle}
          price={ticket.price}
          count={ticketCounts[ticket.sort]}
          setCount={value =>
            setTicketCount(ticket.sort, value)
          }
        />
      ))}
    </ScrollView>

    <View style={styles.bottomBar}>
      <Text
        style={[
          styles.totalText,
          { color: colors.text }
        ]}
      >
        總計 ${totalPrice}
      </Text>

      <Pressable
        style={[
          styles.checkoutButton,
          { backgroundColor: colors.accent }
        ]}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutText}>
          結帳
        </Text>

        {totalCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {totalCount}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  </View>
);
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.095,
    paddingTop: height * 0.12,
  },

  exhibitTitle: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 4,
    marginBottom: 32,
  },

  ticketList: {
    alignItems: 'center',
    gap: 22,
    paddingBottom: 150,
  },

  ticketCard: {
    width: width * 0.8,
    minHeight: 135,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },

  ticketTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },

  ticketSubtitle: {
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 8,
  },

  price: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },

  counter: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 18,
    overflow: 'hidden',
  },

  counterText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    paddingHorizontal: 14,
    paddingVertical: 2,
  },

  countBox: {
    backgroundColor: '#8e8e93',
    paddingHorizontal: 14,
    paddingVertical: 3,
  },

  countText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },

  bottomBar: {
    position: 'absolute',
    left: width * 0.18,
    right: width * 0.13,
    bottom: height * 0.055,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },

  checkoutButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },

  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#ffffff',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#f2c94c',
    fontSize: 13,
    fontWeight: '800',
  },
});
