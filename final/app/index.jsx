import { StyleSheet, View, Text, Image, ScrollView, Pressable, Appearance } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLDM } from '../components/LDM';


export default function Intro() {

    const colors = useLDM((state) => state.colors);
    const setTheme = useLDM((state) => state.setTheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme);
        });
        return () => subscription.remove();
    }, [setTheme]);

    return (
        <SafeAreaView style={[styles.intro_container, {backgroundColor: colors.bgc,}]}>
            <Pressable style={styles.intro_logo_container} onPress={() => router.push('/Home')}>
                <Image source={colors.Logo_img} style={styles.intro_logo} resizeMode="contain"/>
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
        width: "100%",
        height: "100%",
    }
});