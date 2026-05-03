import { StyleSheet, View, Text, Image, ScrollView, Pressable, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLDM } from '../components/LDM';
import { useLDM_Home } from '../components/LDM_Home';

function isDarkColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export default function Intro() {

    const colors = useLDM((state) => state.colors);
    const setTheme = useLDM((state) => state.setTheme);
    const setRemoteBgColor = useLDM_Home((state) => state.setRemoteBgColor);
    const setHomeTheme = useLDM_Home((state) => state.setTheme);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme);
        });
        return () => subscription.remove();
    }, [setTheme]);

    async function handleLogoPress() {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch('https://montue-app.onrender.com/dominant-color');
            const result = await response.json();
            const color = result?.color;
            if (color) {
                setRemoteBgColor(color);
                setHomeTheme(isDarkColor(color) ? 'dark' : 'light');
            }
            router.push('/Home');
        } catch (error) {
            console.warn('Failed fetching remote color:', error);
            router.push('/Home');
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={[styles.intro_container, { backgroundColor: colors.bgc }]}> 
            <Pressable style={styles.intro_logo_container} onPress={handleLogoPress}>
                <Image source={colors.Logo_img} style={styles.intro_logo} resizeMode="contain" />
            </Pressable>
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
    }
});