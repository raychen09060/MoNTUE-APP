import { StyleSheet, View, Text, Image, ScrollView, Pressable, Animated, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLDM } from '../components/LDM';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/FirebaseConfig';
import { ExhibitData } from '../components/ExhibitData';

const { width, height } = Dimensions.get('window');

export default function Intro() {
    const colors = useLDM((state) => state.colors);
    const [isDataReady, setIsDataReady] = useState(false);
    const [hasAnimatedTo90, setHasAnimatedTo90] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [exhibitionData, setExhibitionData] = useState([]);
    const progress = useRef(new Animated.Value(0)).current;

    const fetchExhibitionData = async () => {
        const exhibitionRef = collection(db, 'exdata');
        const snapshot = await getDocs(exhibitionRef);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start(() => {
            router.push('/Home');
        });
    })

    const barWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <SafeAreaView style={[styles.intro_container, { backgroundColor: colors.bgc }]}> 
            <View style={styles.intro_logo_container}>
                <Image source={colors.Logo_img} style={styles.intro_logo} resizeMode="contain" />
            </View>

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