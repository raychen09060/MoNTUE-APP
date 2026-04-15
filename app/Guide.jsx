import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Scanner from '../components/guide/scanner'

export default function Guide() {
    return (
        <SafeAreaView style={styles.container}>
            <Header Section="語音導覽"/>
            <View style={styles.scanner_container}>
                <Scanner/>
            </View>
            <Footer Section="Guide"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scanner_container: {
        flex: 1,
        paddingBottom: 50,
    },
});