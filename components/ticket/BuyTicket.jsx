import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, {useState} from 'react';
// import { router } from 'expo-router';

export default function BuyTicket() {
  const [general, setGeneral] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [ntue, setNtue] = useState(0);

  const total = general * 360 + discount * 180 + ntue * 300;

  return (
    <View style={styles.container}>
      <TicketRow
        label="單人票"
        price={360}
        count={general}
        setCount={setGeneral}
      />

      <TicketRow
        label="特惠票"
        price={180}
        count={discount}
        setCount={setDiscount}
      />

      <TicketRow
        label="北教大專屬票"
        price={300}
        count={ntue}
        setCount={setNtue}
      />
      
      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>總金額</Text>
        <Text style={styles.totalPrice}>${total}</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>結帳</Text>
        <Image
          source={require('../../images/Next_icon_DM.png')}
          style={{ width: 12, height: 12, marginLeft: 8 }}
        />
      </Pressable>
      
    </View>
  );
}


function TicketRow({ label, price, count, setCount }) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>

      <View style={styles.counter}>
        <Pressable
          onPress={() => count > 0 && setCount(count - 1)}
          disabled={count === 0}
          style={({ pressed }) => [
            styles.btn,
            {
              opacity: count === 0 ? 0.3 : pressed ? 0.5 : 1,
            },
          ]}
        >
          <Image
            source={
              count === 0
                ? require('../../images/minus_LM.png')
                : require('../../images/minus_yellow.png')
            }
            style={styles.icon}
          />
        </Pressable>

        <Text style={styles.count}>{count}</Text>

        <Pressable
          onPress={() => setCount(count + 1)}
          style={({ pressed }) => [
            styles.btn,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Image
            source={require('../../images/plus_yellow.png')}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // marginTop: 24,
    // paddingVertical: 20,
    backgroundColor: '#ffffff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
  },

  label: {
    fontSize: 16,
    color: '#111111',
    // marginBottom: 4,
  },

  price: {
    fontSize: 13,
    color: '#666666',
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 15,
    height: 15,
  },

  count: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#000000',
  },

  divider: {
    height: 1,
    backgroundColor: '#BDBDBD',
    marginVertical: 5,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  totalText: {
    fontSize: 16,
    color: '#000000',
    paddingLeft: 5,

  },

  totalPrice: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    paddingRight: 10,
  },

  button: {
    backgroundColor: '#F8E364',
    borderRadius: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,

  },
});