import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { router } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';
import { db } from '../../components/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

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

export default function Select() { 
    const { colors } = useLDM();
    const [selectedTab, setSelectedTab] = useState(0);
    const [ticketCounts, setTicketCounts] = useState(() => ({
        ...UserData[0].cart,
    }));

    useEffect(() => {
        setTicketCounts({
            ...UserData[0].cart,
        });
    }, []);

    const updateFirebaseCart = async (cartKey, nextCount) => {
        if (!UserData[0]?.id) {
            return;
        }

        try {
            await updateDoc(doc(db, 'users', UserData[0].id), {
                [`cart.${cartKey}`]: nextCount,
            });
        } catch (error) {
            console.warn('Failed to update Firebase cart:', error);
        }
    };

    const totalPrice = ticketTypes.reduce((sum, ticket) => {
        return sum + ticket.price * ticketCounts[ticket.cart];
    }, 0);

    const totalCount = ticketTypes.reduce((sum, ticket) => {
        return sum + ticketCounts[ticket.cart];
    }, 0);

    const order = ticketTypes
        .map(ticket => ({
        cart: ticket.cart,
        title: ticket.title,
        price: ticket.price,
        quantity: ticketCounts[ticket.cart],
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
        <View style={[styles.select_container, {backgroundColor: colors.bgc}]}>
            <View style={styles.select_title_container}>
                <Text style={{color: colors.text, fontSize: 16, letterSpacing: 2,}}>
                    {ExhibitData[0].name}
                </Text>
            </View>
            <View style={styles.select_card_container}>
                <FlatList
                    data={ticketTypes}
                    keyExtractor={(item) => item.cart}
                    renderItem={({ item }) => (
                        <Shadow distance={10} startColor={'#ffffff55'} offset={[0, 0]}>
                            <View style={[styles.select_card, {backgroundColor: colors.bgc, borderColor: colors.outline}]}>
                                <View style={styles.select_card_type}>
                                    <Text style={{color: colors.text, fontSize: 24, letterSpacing: 2, fontWeight: 600}}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={styles.select_card_notice}>
                                    <Text style={{color: colors.text, fontSize: 12}}>
                                        {item.subtitle}
                                    </Text>
                                </View>
                                <View style={styles.select_card_price}>
                                    <View style={styles.select_card_cost}>
                                        <Text style={{color: '#f8e364', fontSize: 20, fontWeight: 600}}>
                                            ${item.price}
                                        </Text>
                                    </View>
                                    <View style={styles.select_card_counter_container}>
                                        <Pressable
                                            style={[styles.select_card_counter_button, {backgroundColor: colors.input, borderTopLeftRadius: 30, borderBottomLeftRadius: 30}]}
                                            onPress={() => {
                                                const nextCount = Math.max(0, ticketCounts[item.cart] - 1);
                                                setTicketCounts(prev => {
                                                    const next = { ...prev, [item.cart]: nextCount };
                                                    UserData[0].cart[item.cart] = nextCount;
                                                    updateFirebaseCart(item.cart, nextCount);
                                                    return next;
                                                });
                                            }}
                                        >
                                            <Text style={{color: colors.text, fontSize: 24, letterSpacing: 2}}>
                                                -
                                            </Text>
                                        </Pressable>
                                        <View style={[styles.select_card_counter_num, {backgroundColor: colors.dim}]}>
                                            <Text style={{color: colors.text, fontSize: 24, letterSpacing: 2}}>
                                                {ticketCounts[item.cart]}
                                            </Text> 
                                        </View>
                                        <Pressable
                                            style={[styles.select_card_counter_button, {backgroundColor: colors.input, borderTopRightRadius: 30, borderBottomRightRadius: 30}]}
                                            onPress={() => {
                                                const nextCount = ticketCounts[item.cart] + 1;
                                                setTicketCounts(prev => {
                                                    const next = { ...prev, [item.cart]: nextCount };
                                                    UserData[0].cart[item.cart] = nextCount;
                                                    updateFirebaseCart(item.cart, nextCount);
                                                    return next;
                                                });
                                            }}
                                        >
                                            <Text style={{color: colors.text, fontSize: 24, letterSpacing: 2}}>
                                                +
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Shadow>
                    )}
                />
            </View>
            
            <View style={styles.select_footer}>
                <View style={styles.select_footer_total}>
                    <Text style={{color: '#f8e364', fontSize: 20, fontWeight: 800, letterSpacing: 2}}>
                        總計 ${totalPrice}
                    </Text>
                </View>
                

                <Pressable
                    style={styles.select_footer_button}
                    onPress={handleCheckout}
                >
                    <Text style={{color: colors.text, fontSize: 20, fontWeight: 800, letterSpacing: 2}}>
                    結帳
                    </Text>

                    {totalCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={{color: '#f8e364', fontSize: 12, fontWeight: 800,}}>
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
    select_container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_title_container:{
        display: 'flex',
        width: '100%',
        height: '10%',
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_container: {
        display: 'flex',
        width: '100%',
        height: '75%',
        alignItems: 'center',
    },
    select_card: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.2,
        justifyContent: 'space-around',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 30,
    },
    select_card_type: {
        display: 'flex',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        paddingHorizontal: 15,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_notice: {
        display: 'flex',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        paddingHorizontal: 15,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_price: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_cost: {
        display: 'flex',
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_counter_container: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_counter_button: {
        display: 'flex',
        width: '30%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_card_counter_num: {
        display: 'flex',
        width: '20%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_footer: {
        display: 'flex',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_footer_total: {
        display: 'flex',
        width: '40%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    select_footer_button: {
        display: 'flex',
        width: '25%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8e364',
        borderRadius: 999,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
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
});
