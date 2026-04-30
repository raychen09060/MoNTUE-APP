import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { UserData } from '../../../components/UserData';
import { useLDM } from '../../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Create_account() {
    const { colors } = useLDM();

    const [NewAccount, setNewAccount] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [NewPassword2, setNewPassword2] = useState('');
    const HandleNewAccountInput = () => {
        setNewAccount('');
    };
    const HandleNewPasswordInput = () => {
        setNewPassword('');
    };
    const HandleNewPassword2Input = () => {
        setNewPassword2('');
    };

    return(
        <View style={styles.create_account_container}>
            <TextInput
                style={[styles.create_account_input, {borderColor: colors.outline}]}
                placeholder="輸入電子郵件地址"
                placeholderTextColor="#a0a0a0"
                value={NewAccount}
                onChangeText={setNewAccount}
                returnKeyType="send"
                onSubmitEditing={HandleNewAccountInput}
            />
            <TextInput
                style={[styles.create_account_input, {borderColor: colors.outline}]}
                placeholder="輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={NewPassword}
                onChangeText={setNewPassword}
                returnKeyType="send"
                onSubmitEditing={HandleNewPasswordInput}
            />
            <TextInput
                style={[styles.create_account_input, {borderColor: colors.outline}]}
                placeholder="再次輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={NewPassword2}
                onChangeText={setNewPassword2}
                returnKeyType="send"
                onSubmitEditing={HandleNewPassword2Input}
            />
            <Pressable style={styles.create_account_button}>
                <Text style={[styles.create_account_button_text, {color: colors.text}]}>
                    註冊
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    create_account_container: {
        display: 'flex',
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: '5%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    create_account_input: {
        width: '90%',
        height: height * 0.08,
        maxHeight: 50,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    create_account_button: {
        display: 'flex',
        width: '40%',
        height: height * 0.05,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8e364',
        borderRadius: height * 0.04,
    },
    create_account_button_text: {
        fontSize: 20,
        fontWeight: '500',
    },
});