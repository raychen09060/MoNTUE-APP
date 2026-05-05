import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../components/FirebaseConfig';
import { UserData } from '../../../components/UserData';
import { useLDM } from '../../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Sign_in() {
    const { colors } = useLDM();

    const [Account, setAccount] = useState('');
    const [Password, setPassword] = useState('');
    const [Userdata, setUserdata] = useState(null);
    const [errors, setErrors] = useState({});

    const checkAccount = async() => {
        if (!Account.trim()) {
            setErrors(prev => ({ ...prev, account: ['請輸入電子郵件'] }));
            return;
        }

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", Account));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setErrors(prev => ({ ...prev, account: ['電子郵件未註冊'] }));
            setUserdata(null);
        }
        else{
            setUserdata(querySnapshot.docs[0].data());

            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.account;
                return newErrors;
            });
        }
    };

    const checkPassword = () => {
        if (!Password.trim()) {
            setErrors(prev => ({ ...prev, password: ['請輸入密碼'] }));
            return;
        }
    };

    const Login = () => {
        if (!Password) {
            setErrors(prev => ({ ...prev, password: ['請輸入密碼'] }));
            return;
        }

        if (!Userdata) {
            setErrors(prev => ({ ...prev, password: ['電子郵件或密碼錯誤'] }));
            return;
        }

        if(Password != Userdata.password){
            setErrors(prev => ({ ...prev, password: ['電子郵件或密碼錯誤'] }));
            return;
        }
        else{
            UserData[0] = {
                id: Userdata.id,
                email: Userdata.email,
                password: Userdata.password,
                name: Userdata.name,
                img: Userdata.img || "",
                ticket: Userdata.ticket || [],
                cart: Userdata.cart || [],
            };
        }

        router.dismissTo('/Settings');
    };

    return(
        <View style={styles.sign_in_container}>
            <TextInput
                style={[styles.sign_in_input, {color: colors.text, borderColor: errors.account? '#ff0000' : colors.outline, marginBottom: errors.account? 0 : 30}]}
                placeholder="輸入電子郵件地址"
                placeholderTextColor="#a0a0a0"
                value={Account}
                onChangeText={setAccount}
                onBlur={checkAccount}
            />
            {errors.account && (
                <Text style={styles.errorText}>
                    {errors.account[0]}
                </Text>
            )}

            <TextInput
                style={[styles.sign_in_input, {color: colors.text, borderColor: errors.password? '#ff0000' : colors.outline, marginBottom: errors.password? 0 : 30}]}
                placeholder="輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={Password}
                onChangeText={setPassword}
                onBlur={checkPassword}
            />
            {errors.password && (
                <Text style={styles.errorText}>
                    {errors.password[0]}
                </Text>
            )}

            <Pressable 
                style={styles.sign_in_button}
                onPress={Login}
            >
                <Text style={[styles.sign_in_button_text, {color: colors.text}]}>
                    登入
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    sign_in_container: {
        display: 'flex',
        width: '100%',
        height: '75%',
        paddingTop: 20,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    sign_in_input: {
        width: '90%',
        height: height * 0.08,
        maxHeight: 50,
        alignSelf: 'center',
        borderWidth: 1,
        marginBottom: 30,
        paddingLeft: 10,
    },
    sign_in_button: {
        display: 'flex',
        width: '40%',
        height: height * 0.05,
        maxHeight: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8e364',
        borderRadius: height * 0.04,
    },
    sign_in_button_text: {
        fontSize: 20,
        fontWeight: '500',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 14,
        marginBottom: 5,
        paddingLeft: 10,
    },
});