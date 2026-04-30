import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { UserData } from '../../../components/UserData';
import { useLDM } from '../../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Sign_up() {
    const { colors } = useLDM();

    const [Account, setAccount] = useState('');
    const [Password, setPassword] = useState('');
    const HandleAccountInput = () => {
        setAccount('');
    };
    const HandlePasswordInput = () => {
        setPassword('');
    };

    return(
        <View style={styles.sign_up_container}>
            <TextInput
                style={[styles.sign_up_input, {borderColor: colors.outline}]}
                placeholder="輸入電子郵件地址"
                placeholderTextColor="#a0a0a0"
                value={Account}
                onChangeText={setAccount}
                returnKeyType="send"
                onSubmitEditing={HandleAccountInput}
            />
            <TextInput
                style={[styles.sign_up_input, {borderColor: colors.outline}]}
                placeholder="輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={Password}
                onChangeText={setPassword}
                returnKeyType="send"
                onSubmitEditing={HandlePasswordInput}
            />
            <Pressable style={styles.sign_up_button}>
                <Text style={[styles.sign_up_button_text, {color: colors.text}]}>
                    登入
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    sign_up_container: {
        display: 'flex',
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: '5%',
        paddingBottom: '10%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    sign_up_input: {
        width: '90%',
        height: height * 0.08,
        maxHeight: 50,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    sign_up_button: {
        display: 'flex',
        width: '40%',
        height: height * 0.05,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8e364',
        borderRadius: height * 0.04,
    },
    sign_up_button_text: {
        fontSize: 20,
        fontWeight: '500',
    },
});