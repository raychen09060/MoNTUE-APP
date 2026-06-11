import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { router } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';

const {width, height} = Dimensions.get('window');

export default function Purchase() {
    const { colors } = useLDM();
    return (
        <View style={styles.purchase_container}>
            <Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
                <View style={[styles.purchase_card, {backgroundColor: colors.bgc, borderColor: colors.glow_outline}]}>
                    <ScrollView>
                        <Text style={[styles.exhibit_describe_text, {color: colors.text}]}>
                            { ExhibitData[0].description }
                        </Text>
                    </ScrollView>
                </View>
            </Shadow>

            <Pressable style={{marginTop: '5%'}} onPress={() => router.push('/Ticket/Purchase/Select')}>
                <Text style={[styles.tab_text, {color: colors.text}]}>
                    立即購票
                </Text>
            </Pressable>
        </View>
        
    );
}

const styles = StyleSheet.create({
    purchase_container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    purchase_card: {
        display: 'flex',
        width: width * 0.75,
        height: height * 0.6,
        padding: '4%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ff0000'
    },
    exhibit_describe_text: {
        textAlign: 'justify',
        fontSize: 12,
    },
});