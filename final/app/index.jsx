import { StyleSheet, View, Text, Image, ScrollView, Pressable, Animated, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLDM } from '../components/LDM';
import { useLDM_Home } from '../components/LDM_Home';

const { width, height } = Dimensions.get('window');

function isDarkColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export default function Intro() {
    const colors = useLDM((state) => state.colors);
    const setTheme = useLDM((state) => state.setTheme);
    const setHomeBgColor = useLDM_Home((state) => state.setHomeBgColor);
    const setHomeTheme = useLDM_Home((state) => state.setTheme);
    const [loading, setLoading] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        const startFakeLoading = () => {
            Animated.timing(progress, {
                toValue: 0.9,
                duration: 2000 + Math.random() * 3000,
                useNativeDriver: false,
            }).start();
        };

        const fetchData = async () => {
            try {
                const response = await fetch('https://montue-app.onrender.com/dominant-color');
                const result = await response.json();
                if (result?.color) {
                    setHomeBgColor(result.color);
                    setHomeTheme(isDarkColor(result.color) ? 'dark' : 'light');
                    console.log(result.color);
                }
                setIsDataReady(true);
            } catch (error) {
                console.error(error);
                setIsDataReady(true); 
            }
        };

        startFakeLoading();
        fetchData();
        
    }, []);

    useEffect(() => {
        if (isDataReady) {
            Animated.timing(progress, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setTimeout(() => router.push('/Home'), 200);
            });
        }
    }, [isDataReady]);

    const barWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <SafeAreaView style={[styles.intro_container, { backgroundColor: colors.bgc }]}> 
            <Pressable 
                style={styles.intro_logo_container} 
                onPress={() => router.push('/Home')}
            >
                <Image source={colors.Logo_img} style={styles.intro_logo} resizeMode="contain" />
            </Pressable>

            <View style={styles.loadbar_container}>
                <Text style={[styles.laoding_text, {color: colors.text}]}>
                    Loading ...
                </Text>
                <View style={[styles.loadbar_track, {backgroundColor: colors.bgc, borderColor: colors.outline}]}>
                    <Animated.View style={[styles.loadbar_fill, {width: barWidth, backgroundColor: colors.text}]}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    intro_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    intro_logo_container: {
        width: 350,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    intro_logo: {
        width: '100%',
        height: '100%',
    },
    loadbar_container: {
        position: 'absolute',
        width: width * 0.5,
        height: height * 0.1,
        alignSelf: 'center',
        top: height * 0.8,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    laoding_text: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    loadbar_track: {
        width: '100%',
        height: 10,
        marginTop: 10,
        borderRadius: 2,
        borderWidth: 1,
        overflow: 'hidden',
    },
    loadbar_fill: {
        height: '100%',
    }
});