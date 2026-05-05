import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { z } from 'zod';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../components/FirebaseConfig';
import { UserData } from '../../../components/UserData';
import { useLDM } from '../../../components/LDM';

const {width, height} = Dimensions.get('window');

const signupSchema = z.object({
    name: z.string().min(1, {message: '請輸入姓名'}),
    account: z.string().min(1, {message: '請輸入電子郵件地址'}).email({message: '請輸入有效的電子郵件地址'}),
    password: z.string().min(1, {message: '請輸入密碼'}).min(6, {message: '密碼需至少 6 位數'}),
    confirm: z.string()
});

export default function Create_account() {
    const { colors } = useLDM();
    const [Name, setName] = useState('');
    const [Account, setAccount] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});

    const checkField = async (fieldName, value) => {
        const fieldSchema = signupSchema.shape[fieldName];
        const result = fieldSchema.safeParse(value);

        if(!result.success){
            setErrors(prev => ({...prev, [fieldName]: result.error.flatten().formErrors }));
            return;
        }

        if(fieldName === 'account'){
            try{
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", value));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setErrors(prev => ({ ...prev, account: ['電子郵件已註冊，請直接登入'] }));
                    return;
                }
            }
            catch(error){
                console.error("Firebase error:", error);
            }
        }

        if(fieldName === 'confirm'){
            if(value != Password){
                setErrors(prev => ({...prev, confirm: ['與密碼不符']}));
                return;
            }
        }

        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    const Register = async() => {
        const formData = {
            name: Name,
            account: Account,
            password: Password,
            confirm: PasswordConfirm,
        };

        const result = signupSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            setErrors(formattedErrors);
            return;
        }

        if (Password !== PasswordConfirm) {
            setErrors(prev => ({ ...prev, confirm: ['與密碼不符'] }));
            return;
        }

        const usersRef = collection(db, "users");
        const emailQuery = query(usersRef, where("email", "==", Account));
        const emailSnapshot = await getDocs(emailQuery);
        if (!emailSnapshot.empty) {
            setErrors(prev => ({ ...prev, account: ['電子郵件已註冊，請直接登入'] }));
            return;
        }

        const allUsersSnapshot = await getDocs(usersRef);
        let maxId = -1;
        allUsersSnapshot.forEach((doc) => {
            const userData = doc.data();
            const currentId = parseInt(userData.id);
            if (!isNaN(currentId) && currentId > maxId) {
                maxId = currentId;
            }
        });
        const nextId = (maxId + 1).toString();
        const newUserObject = {
            id: nextId,
            email: Account,
            password: Password,
            name: Name,
            img: "",
            ticket: [],
            cart: [],
        };

        await setDoc(doc(db, "users", nextId), newUserObject);
        UserData[0] = newUserObject;

        router.dismissTo('/Settings');
    };

    return(
        <View style={styles.create_account_container}>
            <TextInput
                style={[styles.create_account_input, {color: colors.text, borderColor: errors.name? '#ff0000' : colors.outline, marginBottom: errors.name? 0 : 30}]}
                placeholder="請輸入真實姓名"
                placeholderTextColor="#a0a0a0"
                value={Name}
                onChangeText={setName}
                onBlur={() => checkField('name', Name)}
            />
            {errors.name && (
                <Text style={styles.errorText}>
                    {errors.name[0]}
                </Text>
            )}

            <TextInput
                style={[styles.create_account_input, {color: colors.text, borderColor: errors.account? '#ff0000' : colors.outline, marginBottom: errors.account? 0 : 30}]}
                placeholder="請輸入電子郵件地址"
                placeholderTextColor="#a0a0a0"
                value={Account}
                onChangeText={setAccount}
                onBlur={() => checkField('account', Account)}
            />
            {errors.account && (
                <Text style={styles.errorText}>
                    {errors.account[0]}
                </Text>
            )}

            <TextInput
                style={[styles.create_account_input, {color: colors.text, borderColor: errors.password? '#ff0000' : colors.outline, marginBottom: errors.password? 0 : 30}]}
                placeholder="請輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={Password}
                onChangeText={setPassword}
                onBlur={() => checkField('password', Password)}
            />
            {errors.password && (
                <Text style={styles.errorText}>
                    {errors.password[0]}
                </Text>
            )}

            <TextInput
                style={[styles.create_account_input, {color: colors.text, borderColor: errors.confirm? '#ff0000' : colors.outline, marginBottom: errors.confirm? 0 : 30}]}
                placeholder="請再次輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={PasswordConfirm}
                onChangeText={setPasswordConfirm}
                onBlur={() => checkField('confirm', PasswordConfirm)}
            />
            {errors.confirm && (
                <Text style={styles.errorText}>
                    {errors.confirm[0]}
                </Text>
            )}

            <Pressable 
                style={styles.create_account_button}
                onPress={Register}
            >
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
        paddingTop: 20,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    create_account_input: {
        width: '90%',
        height: height * 0.08,
        maxHeight: 50,
        borderWidth: 1,
        alignSelf: 'center',
        paddingLeft: 10,
    },
    create_account_button: {
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
    create_account_button_text: {
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