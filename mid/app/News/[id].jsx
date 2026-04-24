import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { NEWS } from '../../components/home/news_data';
import Footer from '../../components/Footer';

export default function Posters(){
    const { id } = useLocalSearchParams();
    const allnews = NEWS.find((item) => item.id === id);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options = {{
                    headerShown: true,
                    headerTitle: "最 新 公 告",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: '600',
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <View style={styles.icon_container}>
                                <Image source={require('../../images/Back_icon_LM.png')} style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <View style={styles.icon_container}>
                                <Image source={require('../../images/Language_switch_icon_LM.png')} style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />

            <View style={styles.news_description_container}>
                <Text style={styles.news_description}>{allnews.description}</Text>
            </View>
            <Footer Section="Home"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        paddingBottom: 75,
        backgroundColor: '#ffffff',
/*         borderWidth: 2,
        borderColor: "#ff0000", */
    },
    icon_container:{
        display: "flex",
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    icon:{
        width: "80%",
        height: "80%",
    },
    news_description_container: {
        flex: 1,
        width: "90%",
        marginTop: 5,
    },
    news_description: {
        fontSize: 14,
    },
});