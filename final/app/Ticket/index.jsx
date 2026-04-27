import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

export default function Intro() {
    return (
        <SafeAreaView style={styles.setting_container}>
            <Header />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    setting_container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
    },
});