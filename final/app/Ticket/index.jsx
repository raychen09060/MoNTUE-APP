import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { useLDM } from '../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Ticket() {
    const { colors } = useLDM();

    return (
        <SafeAreaView style={[styles.setting_container, {backgroundColor: colors.bgc}]}>
            <Header GoTo="/Home"/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    setting_container: {
        flex: 1,
        alignItems: 'center',
    },
});