import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TicketTab from '../components/ticket/TicketTab';
import ExhibitionPanel from '../components/ticket/ExhibitionPanel';
import MyTicketPanel from '../components/ticket/MyTicketPanel';
import VisitTicketPanel from '../components/ticket/VisitTicketPanel';

export default function Tickets() {
    const [activeTab, setActiveTab] = useState('exhibition');

    return (
        <SafeAreaView style={styles.container}>
            <Header Section="門票資訊" />

            <TicketTab activeTab={activeTab} setActiveTab={setActiveTab} />

            <View style={styles.ticket_container}>
                {activeTab === 'exhibition' && <ExhibitionPanel />}
                {activeTab === 'my' && <MyTicketPanel />}
                {activeTab === 'visit' && <VisitTicketPanel />}
            </View>

            <Footer Section="Tickets" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    ticket_container: {
        flex: 1,
    },
});