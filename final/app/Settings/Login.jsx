import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch } from 'react-native';
import React, { useState, useEffect} from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { useLDM } from '../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Login() {
    const { colors } = useLDM();

    return (
        <SafeAreaView style={[styles.login_container, {backgroundColor: colors.bgc}]}>
            <Header GoTo="/Settings"/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: height * 0.1}}>
                {<Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
                    <View style={[styles.login_content, {backgroundColor: colors.bgc, borderColor: colors.glow_outline}]}>
                        <Text style={{color: colors.text, fontSize: 20, fontWeight: '500'}}>
                            登入
                        </Text>
                    </View>
                </Shadow>}
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    login_container: {
        flex: 1,
        alignItems: 'center',
    },
    login_content: {
        display: 'flex',
        width: width * 0.75,
        height: height * 0.5,
        padding: '5%',
        alignItems: 'center',
        borderRadius: 20,
    },
});