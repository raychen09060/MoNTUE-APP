import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { useLDM } from '../../components/LDM';
import Sign_in from '../Settings/Login/Sign_in';
import Create_account from '../Settings/Login/Create_account';

const {width, height} = Dimensions.get('window');

export default function Login() {
    const { colors } = useLDM();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <SafeAreaView style={[styles.login_container, {backgroundColor: colors.bgc}]}>
            <Header GoTo="/Settings"/>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, width: '100%'}}
            >
                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <ScrollView 
                        style={styles.login_bgc}
                        contentContainerStyle={[styles.login_bgc_content, {minHeight: activeTab ? (width * 1.5) : (width)}]}
                        scrollEnabled={true}
                    >
                        {<Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
                            <View style={[styles.login_content, {backgroundColor: colors.bgc, borderColor: colors.glow_outline, height: activeTab ? (width * 1.35) : (width * 0.9)}]}>
                                <View style={styles.login_title_container}>
                                    <TouchableOpacity onPress={() => setActiveTab(0)}>
                                        <Text style={[styles.login_title, { color: activeTab === 0 ? '#f8e364' : colors.text }]}>
                                            登入
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveTab(1)}>
                                        <Text style={[styles.login_title, { color: activeTab === 1 ? '#f8e364' : colors.text }]}>
                                            註冊
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {activeTab === 0 ? (
                                    <Sign_in />
                                ) : (
                                    <Create_account />
                                )}
                            </View>
                        </Shadow>}
                    </ScrollView>
                </Pressable>
            </KeyboardAvoidingView>
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
        alignItems: 'center',
        width: width * 0.75,
        padding: '5%',
        borderRadius: 20,
    },
    login_bgc: {
        flex: 1,
        paddingBottom: height * 0.1,
    },
    login_bgc_content: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    login_title_container: {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_title:{
        fontSize: 24,
        fontWeight: '500',
    },
});