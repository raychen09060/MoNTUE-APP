import { StyleSheet, View, Text, Image, ScrollView, Pressable, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { NEWS } from '../components/new_data';

export default function News() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.home_header_container}>
                <Image source={require('../images/logo_LM.png')} style={{ width: 200, height: 100 }} resizeMode="contain"/>
                <Pressable style={styles.home_header_button_container}>
                    <Image source={require('../images/Language_switch_icon_LM.png')} style={{ width: 20, height: 20 }} resizeMode="contain"/>
                </Pressable>
            </View>
            <Carousel />
            <View style={styles.news_container}>
                <Text style={{ fontSize: 15 }}>最 新 消 息</Text>
                <FlatList
                    data={NEWS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.news_item_container}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', letterSpacing: 6, lineHeight: 20 }}>{item.title}</Text>
                            <Text style={{ fontSize: 10, color: '#666666', letterSpacing: 2, lineHeight: 15 }}>{item.date}</Text>
                            <Text style={{ fontSize: 10, letterSpacing: 2, lineHeight: 18 }}>{item.description}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>            
            <Footer Section="Home"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    home_header_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    home_header_button_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginRight: 10,
    },
    news_container: {
        flex: 1,
        width: 300,
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0)',
    },
    news_item_container: {
        width: '100%',
        height: 60,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
        marginTop: 10,
        paddingLeft: 10,
    },
});