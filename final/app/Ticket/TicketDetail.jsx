import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import React, { useState, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';
import QRCode from 'react-native-qrcode-svg';
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');

export default function TicketDetail() {
    const { colors } = useLDM();
    const {ticketnum, back, next} = useLocalSearchParams();
    
    return(
        <SafeAreaView style={[styles.detail_container, { backgroundColor: colors.bgc }]}>
            <Header GoTo={ back }/>
            <View style={styles.detail_content}>
                <Shadow distance={10} startColor={'#ffffff55'} offset={[0, 0]}>
                    <View style={[styles.detail_card, {backgroundColor: colors.bgc, borderColor: colors.outline}]}>
                        <View style={[styles.qr_container, {borderColor: colors.outline}]}>
                            <QRCode
                                value={ticketnum}
                                size={200}
                                color={colors.bgc}
                                backgroundColor={colors.outline}
                            />
                        </View>
                        
                    </View>
                </Shadow>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    detail_container: {
        flex: 1,
        alignItems: 'center',
    },
    detail_content: {
        display: 'flex',
        width: width,
        height: height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detail_card: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
    },
    qr_container: {
        display: 'flex',
        width: 210,
        height: 210,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 10,
    },
})