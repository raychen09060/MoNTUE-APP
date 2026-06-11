import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { z } from 'zod';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../components/FirebaseConfig';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { useLDM } from '../../components/LDM';

const {width, height} = Dimensions.get('window');

const phoneSchema = z.string().regex(/^09\d{8}$/, {
    message: "手機號碼格式不正確",
});

export default function Login() {
    const { colors } = useLDM();
    const {next, back} = useLocalSearchParams();
    const [phone, setPhone] = useState('');
    const [activeCertify, SetActiveCertify] = useState(false);
    const [certify, setCertify] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [checked, setChecked] = useState(false);
    const [Userdata, setUserdata] = useState(null);

    const checkPhone = (value) => {
        if (!value) {
            setPhoneError('');
            SetActiveCertify(false);
            setChecked(true);
            setCertify('');
            return false;
        }
        const result = phoneSchema.safeParse(value);
        if (!result.success) {
            setPhoneError(result.error.issues[0]?.message || '手機號碼格式不正確');
            return false;
        } else {
            setPhoneError('');
            SetActiveCertify(false);
            setChecked(true);
            return true;
        }
    }
    const checkUser = async() => {
        SetActiveCertify(true);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("tel", "==", phone));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
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
                tel: phone,
                ticket: [],
                cart: {
                    'A': 0,
                    'B': 0,
                    'C': 0,
                },
            };

            await setDoc(doc(db, "users", nextId), newUserObject);
            setUserdata({
                id: nextId,
                tel: phone,
                ticket: [],
                cart: {
                    'A': 0,
                    'B': 0,
                    'C': 0,
                },
            });
        }
        else{
            const fetchedData = querySnapshot.docs[0].data()
            setUserdata(fetchedData);
        }
    };

    const login = () => {
        if (!Userdata) {
            return;
        }
        UserData[0] = {
            id: Userdata.id || '',
            tel: Userdata.tel || phone,
            ticket: Userdata.ticket || [],
            cart: Userdata.cart || {'A': 0, 'B': 0, 'C': 0},
        };
        router.push(next);
    };

    return (
        <SafeAreaView style={[styles.login_page, {backgroundColor: colors.bgc}]}>
            <Header GoTo={ back }/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView 
                        contentContainerStyle={styles.login_container}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                    >
                        <Shadow distance={20} startColor={'#ffffff55'} offset={[0, 0]} style={{ borderRadius: width * 0.1 }}>
                            <View style={[styles.login_card, {borderColor: colors.outline, backgroundColor: colors.bgc}]}>
                                <View style={styles.login_card_title_container}>
                                    <Text style={{color: colors.text, fontSize: 24}}>
                                        手機號碼登入
                                    </Text>
                                </View>
                                <View style={styles.login_card_input_container}>
                                    <Text style={{color: colors.text, fontSize: 16}}>
                                        請輸入手機號碼以發送驗證碼
                                    </Text>
                                    <TextInput
                                        style={[styles.login_card_input, {backgroundColor: colors.input, color: colors.text, fontSize: 16, letterSpacing: 1}]}
                                        placeholder="09xxxxxxxx"
                                        placeholderTextColor={colors.dim}
                                        value={phone}
                                        onChangeText={(text) => {
                                            setPhone(text)
                                            setChecked(false)
                                            if(phoneError){
                                                setPhoneError('');
                                            }
                                        }}
                                        onBlur={() => checkPhone(phone)}
                                        keyboardType="phone-pad"
                                    />
                                    {phoneError ?
                                        <View style={{height: 25}}>
                                            <Text style={{color: '#ff0000', fontSize: 12}}>
                                                {phoneError}
                                            </Text>
                                        </View>
                                    :   
                                        <View style={{height: 25}}></View>
                                    }
                                    {checked && phone && !phoneError && !activeCertify ? 
                                        <Pressable
                                            style={[styles.login_card_certify_button, {height: 40,}]}
                                            onPress={checkUser}
                                        >
                                            <Text style={{color: colors.text, fontSize: 16}}>
                                                發送驗證碼
                                            </Text>
                                        </Pressable>
                                    :
                                        <View style={[styles.login_card_certify_button, {height: 40,}]}>
                                            <Text style={{color: colors.dim, fontSize: 16}}>
                                                發送驗證碼
                                            </Text>
                                        </View>
                                    }
                                </View>
                                <View style={[styles.login_card_input_container, {height: '45%'}]}>
                                    {checked && phone && !phoneError && activeCertify ? 
                                        <>
                                            <Text style={{color: colors.text, fontSize: 16}}>
                                                請輸入驗證碼
                                            </Text>
                                            <TextInput
                                            style={[styles.login_card_input, {backgroundColor: colors.input, color: colors.text, fontSize: 16, letterSpacing: 1}]}
                                            placeholderTextColor={colors.dim}
                                            value={certify}
                                            onChangeText={setCertify}
                                            keyboardType="phone-pad"
                                            />
                                            {certify.length == 4 ? 
                                                <Pressable
                                                    style={[styles.login_card_certify_button, {backgroundColor: '#f8e364', marginTop: 20}]}
                                                    onPress = {login}
                                                >
                                                    <Text style={{color: colors.text, fontSize: 16}}>
                                                        登入
                                                    </Text>
                                                </Pressable>
                                            :
                                                <View style={styles.login_card_certify_button}>
                                                    <Text style={{color: colors.dim, fontSize: 16}}>
                                                        登入
                                                    </Text>
                                                </View>
                                            }
                                        </>
                                    :
                                        <>
                                            <Text style={{color: colors.dim, fontSize: 16}}>
                                                請輸入驗證碼
                                            </Text>
                                            <View style={[styles.login_card_input, {backgroundColor: colors.input}]}>
                                            </View>
                                            <View style={styles.login_card_certify_button}>
                                                <Text style={{color: colors.dim, fontSize: 16}}>
                                                    登入
                                                </Text>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                        </Shadow>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    login_page: {
        display: 'flex',
        width: width,
        height: height,
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_container: {
        width: width,
        height: height * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_card: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.55,
        padding: '5%',
        borderWidth: 1,
        borderRadius: 30,
        backfaceVisibility: 'hidden',
    },
    login_card_title_container: {
        display: 'flex',
        width: '100%',
        height: '15%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_card_input_container: {
        display: 'flex',
        width: '100%',
        height: '40%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_card_input: {
        display: 'flex',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        paddingHorizontal: '10%',
        borderRadius: 999,
    },
    login_card_certify_button: {
        display: 'flex',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
});