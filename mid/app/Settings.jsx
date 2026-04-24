import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Settings() {
    return (
        <SafeAreaView style={styles.container}>
            <Header Section="設定"/>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false }>
                    <View style={styles.settings_container}>
                        <View style={styles.settings_account}>
                            <Text style={{ fontSize: 15, fontWeight: '600' }}>個 人 資 訊</Text>
                            <View style={styles.settings_account_info}>
                                <View style={styles.settings_account_info_img}>
                                    
                                </View>
                                <View style={styles.settings_account_info_text}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>未登入</Text>
                                    <Pressable style={styles.settings_account_info_button}>
                                        <Text style={{ fontSize: 12, color: '#ffffff', textShadowColor: '#a0a0a0', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1 }}>登入/註冊</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={styles.settings_selections}>
                            <Text style={{ fontSize: 15, fontWeight: '600' }}>其 他 資 訊</Text>
                            <View style={styles.settings_selestions_container}>
                                <Pressable style={styles.settings_selections_button}>
                                    <Image source={require('../images/Transport_icon_LM.png')} style={styles.settings_selections_button_icon} resizeMode="contain"/>
                                    <Text style={{ fontSize: 18, marginLeft: 15 }}>交 通 資 訊</Text>
                                    <Image source={require('../images/Next_icon_LM.png')} style={{ width: 15, height: 15, position: 'absolute', right: 20 }} resizeMode="contain"/>
                                </Pressable>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#000000' }}></View>
                                <Pressable style={styles.settings_selections_button}>
                                    <Image source={require('../images/Contact_icon_LM.png')} style={styles.settings_selections_button_icon} resizeMode="contain"/>
                                    <Text style={{ fontSize: 18, marginLeft: 15 }}>服 務 中 心</Text>
                                    <Image source={require('../images/Next_icon_LM.png')} style={{ width: 15, height: 15, position: 'absolute', right: 20 }} resizeMode="contain"/>
                                </Pressable>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#000000' }}></View>
                                <View style={styles.settings_selections_button}>
                                    <Image source={require('../images/Display_mode_icon_LM.png')} style={styles.settings_selections_button_icon} resizeMode="contain"/>
                                    <Text style={{ fontSize: 18, marginLeft: 15 }}>深 色 模 式</Text>
                                    <Pressable style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: 35,
                                        height: 20,
                                        position: 'absolute',
                                        right: 20,
                                        borderWidth: 1,
                                        borderColor: '#d9d9d9',
                                        borderRadius: 15,
                                        backgroundColor: '#d9d9d9',
                                        shadowColor: '#a0a0a0',
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowOpacity: 1,
                                        shadowRadius: 5,
                                    }}>
                                        <View style={{
                                            width: 20,
                                            height: 20,
                                            borderWidth: 1,
                                            borderColor: '#d9d9d9',
                                            borderRadius: 10,
                                            backgroundColor: '#ffffff',
                                            position: 'absolute',
                                            left: 0,
                                        }}></View>
                                    </Pressable>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#000000' }}></View>
                                <Pressable style={styles.settings_selections_button}>
                                    <Image source={require('../images/Notification_icon_LM.png')} style={styles.settings_selections_button_icon} resizeMode="contain"/>
                                    <Text style={{ fontSize: 18, marginLeft: 15 }}>通 知 設 定</Text>
                                    <Image source={require('../images/Next_icon_LM.png')} style={{ width: 15, height: 15, position: 'absolute', right: 20 }} resizeMode="contain"/>
                                </Pressable>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#000000' }}></View>
                                <Pressable style={styles.settings_selections_button}>
                                    <Image source={require('../images/Info_icon_LM.png')} style={styles.settings_selections_button_icon} resizeMode="contain"/>
                                    <Text style={{ fontSize: 18, marginLeft: 15 }}>關 於</Text>
                                    <Image source={require('../images/Next_icon_LM.png')} style={{ width: 15, height: 15, position: 'absolute', right: 20 }} resizeMode="contain"/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            <Footer Section="Settings"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settings_container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    settings_account: {
        width: 300,
        height: 150,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    settings_account_info: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 120,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
    },
    settings_account_info_img: {
        width: 70,
        height: 70,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 40,
    },
    settings_account_info_text: {
        marginLeft: 20,
    },
    settings_account_info_button: {
        marginTop: 5,
        width: 65,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#F8E364',
    },
    settings_selections: {
        width: 300,
        height: 300,
        marginTop: 10,
    },
    settings_selestions_container: {
        width: '100%',
        height: 254,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
    },
    settings_selections_button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    settings_selections_button_icon: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
});