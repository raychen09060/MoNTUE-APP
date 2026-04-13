import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { router } from 'expo-router';

export default function Footer( {Section} ) {
    const sections_icons = [
        {
            id: "Home",
            active_icon: require('../images/Home_actived_icon.png'),
            deactive_icon: require('../images/Home_deactived_icon_LM.png'),
        },
        {
            id: "Calendar",
            active_icon: require('../images/Calendar_actived_icon.png'),
            deactive_icon: require('../images/Calendar_deactived_icon_LM.png'),
        },
        {
            id: "Guide",
            active_icon: require('../images/Guide_actived_icon.png'),
            deactive_icon: require('../images/Guide_deactived_icon_LM.png'),
        },
        {
            id: "Tickets",
            active_icon: require('../images/Tickets_actived_icon.png'),
            deactive_icon: require('../images/Tickets_deactived_icon_LM.png'),
        },
        {
            id: "Settings",
            active_icon: require('../images/Settings_actived_icon.png'),
            deactive_icon: require('../images/Settings_deactived_icon_LM.png'),
        }
    ];

    return (
        <View style={styles.footer_container}>
            <Pressable style={styles.footer_button} onPress={() => router.push('/Home')}>
                {Section === sections_icons[0].id ? (
                    <Image style={styles.footer_icon} source={sections_icons[0].active_icon} resizeMode="contain" />
                ) : (
                    <Image style={styles.footer_icon} source={sections_icons[0].deactive_icon} resizeMode="contain" />
                )}
            </Pressable>
            <Pressable style={styles.footer_button} onPress={() => router.push('/Calendar')}>
                {Section === sections_icons[1].id ? (
                    <Image style={styles.footer_icon} source={sections_icons[1].active_icon} resizeMode="contain" />
                ) : (
                    <Image style={styles.footer_icon} source={sections_icons[1].deactive_icon} resizeMode="contain" />
                )}
            </Pressable>
            <Pressable style={styles.footer_button} onPress={() => router.push('/Guide')}>
                {Section === sections_icons[2].id ? (
                    <Image style={styles.footer_icon} source={sections_icons[2].active_icon} resizeMode="contain" />
                ) : (
                    <Image style={styles.footer_icon} source={sections_icons[2].deactive_icon} resizeMode="contain" />
                )}
            </Pressable>
            <Pressable style={styles.footer_button} onPress={() => router.push('/Tickets')}>
                {Section === sections_icons[3].id ? (
                    <Image style={styles.footer_icon} source={sections_icons[3].active_icon} resizeMode="contain" />
                ) : (
                    <Image style={styles.footer_icon} source={sections_icons[3].deactive_icon} resizeMode="contain" />
                )}
            </Pressable>
            <Pressable style={styles.footer_button} onPress={() => router.push('/Settings')}>
                {Section === sections_icons[4].id ? (
                    <Image style={styles.footer_icon} source={sections_icons[4].active_icon} resizeMode="contain" />
                ) : (
                    <Image style={styles.footer_icon} source={sections_icons[4].deactive_icon} resizeMode="contain" />
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    footer_container: {
        position: 'absolute',
        bottom: 15,
        width: "100%",
        minHeight: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
/*         borderWidth: 1,
        borderColor: '#ff0000',  */
    },
    footer_button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
/*         borderWidth: 1,
        borderColor: '#ff0000',  */
    },
    footer_icon: {
        width: 25,
        height: 25,
    },
});