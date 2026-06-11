import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated, FlatList, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import { useLDM } from '../../components/LDM';
import Purchase from '../Ticket/Purchase';
import Folder from '../Ticket/Folder';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';
import { db } from '../../components/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

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

export default function Payment() {
    const { colors } = useLDM();
    const { totalPrice, order } = useLocalSearchParams();
    const [selectedPayment, setSelectedPayment] = useState('creditCard');

    const updateFirebaseUser = async (userId, ticket, cart) => {
        if (!userId) return;

        try {
            await updateDoc(doc(db, 'users', userId), {
                ticket,
                cart,
            });
        } catch (error) {
            console.warn('Failed to update Firebase user:', error);
        }
    };

    const confirm = async () => {
        const user = UserData?.[0];
        if (user?.cart && Array.isArray(user.ticket)) {
            let nextTicketNumber = user.ticket.length + 1;
            Object.entries(user.cart).forEach(([code, quantity]) => {
                for (let i = ExhibitData[0].count; i < quantity; i += 1) {
                    user.ticket.push(`${code}${nextTicketNumber}`);
                    nextTicketNumber += 1;
                }
            });
        }
        const clearedCart = {
            'A': 0,
            'B': 0,
            'C': 0,
        };
        UserData[0].cart = clearedCart;

        if (UserData[0]?.id) {
            await updateFirebaseUser(UserData[0].id, UserData[0].ticket, clearedCart);
        }
        Alert.alert(`成功以 ${selectedPayment} 支付\n門票已匯入您的票匣`);
        router.push({
            pathname: '/Ticket',
            params: {
                back: '/Home',
                next: '/Ticket'
            }
        });
    };

    return (
        <SafeAreaView style={[styles.payment_container, { backgroundColor: colors.bgc }]}>
            <Header GoTo="/Ticket?activeTab=0&activesubTab=1" />
            <View style={styles.payment_total_container}>
                <Text style={{color: colors.text, fontSize: 24, fontWeight: 800}}>
                    總金額 ${totalPrice}
                </Text>
                <Text style={{color: colors.text, fontSize: 20, fontWeight: 500}}>
                    請 選 擇 支 付 方 式
                </Text>
            </View>
            <View style={styles.payment_options_container}>
                <FlatList
                    data={paymentMethods}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Shadow distance={10} startColor={'#ffffff55'} offset={[0, 0]}>
                            <Pressable
                                style={[styles.payment_options, {backgroundColor: colors.bgc, borderColor: selectedPayment === item.id ? colors.outline : colors.dim}]}
                                onPress={() => setSelectedPayment(item.id)}
                            >
                                <View style={styles.payment_option_choice_container}>
                                    <View style={[styles.payment_option_choice, {borderColor: selectedPayment === item.id ? colors.outline : colors.dim}]}> 

                                    </View>
                                </View>
                                <View style={styles.payment_option_text_container}>
                                    <Text style={{color: selectedPayment === item.id ? colors.text : colors.dim, fontSize: 24, fontWeight: 800}}>
                                        {item.title}
                                    </Text>
                                </View>
                            </Pressable>
                        </Shadow>
                    )}
                />
            </View>
            <Pressable 
                style={styles.payment_confirm_button}
                onPress={confirm}
            >
                <Text style={{color: colors.text, fontSize: 24, fontWeight: 800}}>
                    確認付款
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    payment_container: {
        flex: 1,
    },
    payment_total_container: {
        display: 'flex',
        width: width,
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    payment_options_container: {
        display: 'flex',
        width: width,
        height: height * 0.4,
        alignItems: 'center',
        marginTop: '20%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    payment_options: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
    },
    payment_option_choice_container:{
        display: 'flex',
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    payment_option_choice: {
        width: 24,
        height: 24,
        borderWidth: 3,
        borderRadius: 999,
    },
    payment_option_text_container: {
        display: 'flex',
        width: '75%',
        height: '100%',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    payment_confirm_button: {
        display: 'flex',
        width: '60%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
});