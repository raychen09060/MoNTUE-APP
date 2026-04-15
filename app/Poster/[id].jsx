import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { all_posters } from '../../components/calendar/poster_data';
import Footer from '../../components/Footer';

export default function Posters(){
    const { id } = useLocalSearchParams();
    const allposters = all_posters.flatMap((section) => section.data);
    const posters = allposters.find((item) => item.id === id);

    const scrollY = useRef(new Animated.Value(0)).current;
    
    const imageHeight = scrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [250, 0], 
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options = {{
                    headerShown: true,
                    headerTitle: "展 覽 介 紹",
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
                        <TouchableOpacity onPress={() => router.back()}>
                            <View style={styles.icon_container}>
                                <Image source={require('../../images/Language_switch_icon_LM.png')} style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />

            <Animated.ScrollView 
                style={styles.poster_description_container}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } 
                )}
                scrollEventThrottle={16}

                contentContainerStyle={{
                    width: 300,
                    alignSelf: 'center',
                    paddingTop: 320,
                    paddingBottom: 50,
                    
                }}
            >
                <Text style={styles.poster_description}>{posters.description}</Text>
            </Animated.ScrollView>
            <View style={styles.poster_wraper}>
                <Animated.View style={[styles.poster_image_container, { height: imageHeight, overflow: 'hidden' }]}>
                    <Image source={posters.img_D} style={styles.poster_image} resizeMode="contain"/>
                </Animated.View>

                <View style={styles.poster_title_container}>
                    <Text style={styles.poster_title}>{posters.title}</Text>
                    <Text style={styles.poster_subtitle}>{posters.date}</Text>
                </View>
            </View>

            <Footer Section="Calendar"/>
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
    poster_wraper: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        zIndex: 1, 
    },
    poster_image_container:{
        width: 180,
        height: 250,
        marginTop: 10,
/*         borderWidth: 2,
        borderColor: "#0000ff", */
    },
    poster_image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    poster_title_container: {
        display: "flex",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
/*         borderWidth: 2,
        borderColor: "#00ff00", */
    },
    poster_title: {
        fontSize: 20,
        fontWeight: "600",
    },
    poster_subtitle: {
        fontSize: 12,
        fontWeight: "300",
    },
    poster_description_container: {
        flex: 1,
        width: "90%",
/*         alignItems: "center",
        justifyContent: "center", */
        marginTop: 5,
/*         borderWidth: 2,
        borderColor: "#ff0000", */
    },
    poster_description: {
        fontSize: 14,
    },
});