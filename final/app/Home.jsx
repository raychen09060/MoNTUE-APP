import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ExhibitData } from '../components/ExhibitData';
import { useLDM_Home } from '../components/LDM_Home';

const {width, height} = Dimensions.get('window');

function isDarkColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 < 128;
    }

export default function Home() {
    const { colors, remoteBgColor, setTheme, setRemoteBgColor } = useLDM_Home();
    const [bgColor, setBgColor] = useState(remoteBgColor || colors.bgc);

    useEffect(() => {
        if (remoteBgColor) {
            setBgColor(remoteBgColor);
            return;
        }
    });

    return (
        <SafeAreaView style={[styles.home_container, {backgroundColor: bgColor}]}>
            <View style={styles.home_poster_container}>
                <Image source={ExhibitData[0].poster_D} style={styles.home_poster} resizeMode='contain'/>
            </View>
            <View style={styles.home_button_container}>
                <Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
                    <Pressable style={[styles.home_button, {backgroundColor: bgColor, borderColor: colors.glow_outline}]}
                    onPress={() => router.push('/Settings')}
                >
                        <Image source={colors.Settings_icon} style={styles.home_button_icon} resizeMode='contain'/>
                    </Pressable>
                </Shadow>
                
                <Shadow distance={10} startColor={colors.glow} offset={[0, 0]} style={{ borderRadius: width * 0.1 }}>
                    <Pressable style={styles.home_to_ticket_container}
                    onPress={() => router.push('/Ticket')}
                >
                        <View style={[styles.home_to_ticket_button, {backgroundColor: bgColor, borderColor: colors.glow_outline}]}>
                            <Image source={colors.Tickets_icon} style={styles.home_to_ticket_button_icon} resizeMode='contain'/>
                            <Text style={{color: colors.text, fontSize: 18, fontWeight: '500'}}>
                                門票
                            </Text>
                        </View>
                    </Pressable>
                </Shadow>
                <Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
                    <Pressable style={[styles.home_button, {backgroundColor: bgColor, borderColor: colors.glow_outline}]}
                    onPress={() => router.push('/Guide')}
                >
                        <Image source={colors.Guide_icon} style={styles.home_button_icon} resizeMode='contain'/>
                    </Pressable>
                </Shadow>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    home_poster_container: {
        height: height * 0.7,
        width: width * 0.9,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    home_poster: {
        width: '100%',
        height: '100%',
    },
    home_button_container: {
        width: width * 0.9,
        height: width * 0.15,
        display: 'flex',
        flexDirection: 'row',
        marginTop: height * 0.05,
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        justifyContent: 'space-around',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    home_button: {
        width: width * 0.1,
        height: width * 0.1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: width * 0.1,
    },
    home_button_icon: {
        width: '60%',
        height: '60%',
    },
    home_to_ticket_button: {
        width: width * 0.35,
        height: width * 0.1,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderRadius: width * 0.1,
    },
    home_to_ticket_button_icon: {
        width: width * 0.06,
        height: width * 0.06,
        
    },
});