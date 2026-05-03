import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { z } from 'zod';
import { UserData } from '../../../components/UserData';
import { useLDM } from '../../../components/LDM';

const {width, height} = Dimensions.get('window');

const signupSchema = z.object({
    email: z.string().email({message: '無效電子郵件地址'}),
    password: z.string().min(6, {message: '密碼需要至少6位數'}),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
});

export default function Create_account() {
    const { colors } = useLDM();

    const [NewAccount, setNewAccount] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [NewPassword2, setNewPassword2] = useState('');
    const [errors, setErrors] = useState({});

    const validateField = (fieldName, value) => {
        const fieldSchema = signupSchema.shape[fieldName]; 
        const result = fieldSchema.safeParse(value);

        if (!result.success) {
            setErrors(prev => ({ ...prev, [fieldName]: result. error.flatten().formErrors }));
        }
        else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const validateConfirmPassword = () => {
        if (NewPassword2 !== NewPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: ["密碼不一致"] }));
        }
        else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.confirmPassword;
                return newErrors;
            });
        }
    };

    const HandleCreate = () => {
        const formData = {
            email: NewAccount,
            password: NewPassword,
            confirmPassword: NewPassword2,
        };

        const result = signupSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            setErrors(formattedErrors);
        }
        else {
            setErrors({});
            console.log("Creating account for:", result.data.email);
        }
    };


    return(
        <View style={styles.create_account_container}>
            <TextInput
                style={[styles.create_account_input, {marginBottom: errors.email ? 0 : 10, color: colors.text, borderColor: errors.email ? '#ff0000' : colors.outline}]}
                placeholder="輸入電子郵件地址"
                placeholderTextColor="#a0a0a0"
                value={NewAccount}
                onChangeText={setNewAccount}
                onBlur={() => validateField('email', NewAccount)}
            />
            {errors.email && <Text style={{marginBottom: 10, fontSize: 15, color: 'red'}}>{errors.email[0]}</Text>}

            <TextInput
                style={[styles.create_account_input, {marginBottom: errors.password ? 0 : 10, color: colors.text, borderColor: errors.password ? '#ff0000' : colors.outline}]}
                placeholder="輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={NewPassword}
                onChangeText={setNewPassword}
                onBlur={() => validateField('password', NewPassword)}
            />
            {errors.password && <Text style={{marginBottom: 10, fontSize: 15, color: 'red'}}>{errors.password[0]}</Text>}

            <TextInput
                style={[styles.create_account_input, {marginBottom: errors.confirmPassword ? 0 : 10, color: colors.text, borderColor: errors.confirmPassword ? '#ff0000' : colors.outline}]}
                placeholder="再次輸入密碼"
                placeholderTextColor="#a0a0a0"
                value={NewPassword2}
                onChangeText={setNewPassword2}
                onBlur={validateConfirmPassword}
            />
            {errors.confirmPassword && <Text style={{marginBottom: 10, fontSize: 15, color: 'red'}}>{errors.confirmPassword[0]}</Text>}

            <Pressable 
                style={styles.create_account_button}
                onPress={HandleCreate}
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
    create_account_error: {
        fontSize: 14,
    },
});