import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const {width, height} = Dimensions.get('window');

export default function Header() {
    return (
        <View style={styles.header_container}>
            <Pressable
                onPress={() => router.dismissTo('/Home')}
                style={styles.header_back_button}>
                <Image source={require('../images/Back_icon_DM.png')} style={styles.header_back_buttton_icon} resizeMode="contain"/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header_container: {
        display: 'flex',
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    header_back_button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.15,
        height: width * 0.15,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    header_back_buttton_icon: {
        width: width * 0.06,
        height: width * 0.06,
    },
});
