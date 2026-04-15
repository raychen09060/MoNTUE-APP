import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { all_posters } from '../../components/calendar/poster_data';

export default function Posters(){
    const { id } = useLocalSearchParams();
    const allposters = all_posters.flatMap((section) => section.data);
    const posters = allposterss.find((item) => item.id === id);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options = {{
                    title: "",
                }}
            />
            <ScrollView style={styles.scroll}
                contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.poster_image_container}>
                    <Image source={posters.img} style={styles.poster_image} resizeMode="cover"/>
                </View>
                <View style={styles.poster_title_container}>
                    <Text style={styles.poster_title}>{posters.title}</Text>
                </View>
                <View style={styles.poster_description_container}>
                    <Text style={styles.poster_description}>{posters.description}</Text>
                </View>
            </ScrollView>
            <Footer Section="Calendar"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        backgroundColor: '#ffffff',
/*         borderWidth: 2,
        borderColor: "#ff0000", */
    },
    scroll: {
        flex: 1,
        width: "100%",
    },
    poster_image_container:{
        width: 200,
        height: 300,
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
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    poster_title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    poster_description_container: {
        display: "flex",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    poster_description: {
        fontSize: 14,
        textAlign: "center",
    },
});