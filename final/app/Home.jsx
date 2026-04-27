import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const {width, height} = Dimensions.get('window');

export default function Home() {
    return (
        <SafeAreaView style={styles.home_container}>
            <View style={styles.home_poster_container}>
                <Image source={require('../images/EP_remote-viewing_D.png')} style={styles.home_poster} resizeMode='contain'/>
            </View>
            <View style={styles.home_button_container}>
                <Shadow distance={10} startColor={'#ffffff55'} offset={[0, 0]}>
                    <Pressable style={styles.home_button}
                    onPress={() => router.push('/Settings')}
                >
                        <Image source={require('../images/Settings_deactived_icon_DM.png')} style={styles.home_button_icon} resizeMode='contain'/>
                    </Pressable>
                </Shadow>
                
                <Shadow distance={10} startColor={'#ffffff55'} offset={[0, 0]} style={{ borderRadius: width * 0.1 }}>
                    <Pressable style={styles.home_to_ticket_container}
                    onPress={() => router.push('/Ticket')}
                >
                        <View style={styles.home_to_ticket_button}>
                            <Image source={require('../images/Tickets_deactived_icon_DM.png')} style={styles.home_to_ticket_button_icon} resizeMode='contain'/>
                            <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '500'}}>
                                門票
                            </Text>
                        </View>
                    </Pressable>
                </Shadow>
                <Shadow distance={10} startColor={'#ffffff55'} offset={[0, 0]}>
                    <Pressable style={styles.home_button}
                    onPress={() => router.push('/Settings')}
                >
                        <Image source={require('../images/Guide_deactived_icon_DM.png')} style={styles.home_button_icon} resizeMode='contain'/>
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
        backgroundColor: '#000000',
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
        backgroundColor: '#000000',
        borderWidth: 1,
        borderRadius: width * 0.1,
        borderColor: '#000000',
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
        backgroundColor: '#000000',
        borderWidth: 1,
        borderRadius: width * 0.1,
        borderColor: '#000000',
    },
    home_to_ticket_button_icon: {
        width: width * 0.06,
        height: width * 0.06,
        
    },
});