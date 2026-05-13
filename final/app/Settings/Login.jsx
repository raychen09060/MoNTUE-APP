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

const signupSchema = z.object({
    name: z.string().min(1, {message: '請輸入姓名'}),
    account: z.string().min(1, {message: '請輸入電子郵件地址'}).email({message: '請輸入有效的電子郵件地址'}),
    password: z.string().min(1, {message: '請輸入密碼'}).min(6, {message: '密碼需至少 6 位數'}),
    confirm: z.string()
});

export default function Login() {
    const { back, next } = useLocalSearchParams();
    const { colors } = useLDM();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [activeTab, setActiveTab] = useState(0);
    const [Account, setAccount] = useState('');
    const [Password, setPassword] = useState('');
    const [Userdata, setUserdata] = useState(null);
    const [Name, setName] = useState('');
    const [NewAccount, setNewAccount] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    const frontZIndex = animatedValue.interpolate({
        inputRange: [0, 90, 91, 180],
        outputRange: [2, 2, 1, 1],
    });

    const backZIndex = animatedValue.interpolate({
        inputRange: [0, 90, 91, 180],
        outputRange: [1, 1, 2, 2],
    });

    const flipcard = () => {
        if (activeTab) {
            Animated.spring(animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } 
        else {
            Animated.spring(animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }
        Keyboard.dismiss();
        setAccount('');
        setPassword('');
        setUserdata(null);
        setName('');
        setNewAccount('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
        setActiveTab(!activeTab);
    };

    const frontAnimatedStyle = {
        zIndex: frontZIndex,
        transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
    };

    const backAnimatedStyle = {
        zIndex: backZIndex,
        transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
    };

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
            setErrors(prev => ({ ...prev, account: ['請輸入密碼'] }));
            return;
        }
        else{
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.account;
                return newErrors;
            });
        }
    };

    const Login = () => {
        if (!Password) {
            setErrors(prev => ({ ...prev, account: ['請輸入密碼'] }));
            return;
        }

        if (!Userdata) {
            setErrors(prev => ({ ...prev, account: ['電子郵件或密碼錯誤'] }));
            return;
        }

        if(Password != Userdata.password){
            setErrors(prev => ({ ...prev, account: ['電子郵件或密碼錯誤'] }));
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

        router.push(next);
    };

    const checkField = async (fieldName, value) => {
        const fieldSchema = signupSchema.shape[fieldName];
        const result = fieldSchema.safeParse(value);

        if(!result.success){
            setErrors(prev => ({ ...prev, account: result.error.flatten().formErrors }));
            return;
        }
        else{
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.account;
                return newErrors;
            });
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
            if (!NewPassword.trim()) {
                setErrors(prev => ({ ...prev, account: ['請輸入密碼'] }));
                return;
            }
            else{
                if(value != NewPassword){
                    setErrors(prev => ({ ...prev, account: ['與密碼不符'] }));
                    return;
                }
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
            confirm: ConfirmPassword,
        };

        const result = signupSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            setErrors(formattedErrors);
            return;
        }

        if (NewPassword !== ConfirmPassword) {
            setErrors(prev => ({ ...prev, account: ['與密碼不符'] }));
            return;
        }

        const usersRef = collection(db, "users");
        const emailQuery = query(usersRef, where("email", "==", NewAccount));
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
            email: NewAccount,
            password: NewPassword,
            name: Name,
            img: "",
            ticket: [],
            cart: [],
        };

        await setDoc(doc(db, "users", nextId), newUserObject);
        UserData[0] = newUserObject;

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
                        <View style={styles.login_container}>
                            <Animated.View style={[styles.login_card, frontAnimatedStyle, {height: width * 0.9, borderColor: colors.outline}]}>
                                <View style={styles.login_title_container}>
                                    <Text style={[styles.login_title, {color: colors.text}]}>
                                        登入
                                    </Text>
                                </View>
                                <View style={styles.sign_in_input_container}>
                                    <TextInput 
                                        style={[styles.sign_in_input, {color: colors.text}]} 
                                        placeholder="輸入電子郵件地址"
                                        placeholderTextColor="#a0a0a0"
                                        value={Account}
                                        onChangeText={setAccount}
                                        onBlur={checkAccount}
                                    />
                                    <View style={styles.login_input_divider} />
                                    <TextInput 
                                        style={[styles.sign_in_input, {color: colors.text}]} 
                                        placeholder="輸入密碼"
                                        placeholderTextColor="#a0a0a0"
                                        value={Password}
                                        onChangeText={setPassword}
                                        onBlur={checkPassword}
                                    />
                                </View>
                                <View style={styles.login_note_container}>
                                    <Text style={[styles.login_note, {color: colors.text}]}>
                                        忘記密碼？
                                    </Text>
                                    <View style={styles.login_flip_container}>
                                        <Text style={[styles.login_note, {color: colors.text}]}>
                                            沒有帳號？
                                        </Text>
                                        <TouchableOpacity 
                                            onPress={flipcard} 
                                            activeOpacity={1} 
                                            style={{width: '35%', height: '100%', alignItems: 'flex-end', justifyContent: 'center'}}
                                        >
                                            <Text style={[styles.login_note, {color: colors.text}]}>
                                                註冊
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {errors.account && (
                                    <Text style={styles.errorText}>
                                        {errors.account[0]}
                                    </Text>
                                )}
                                <Pressable 
                                    style={[styles.login_button, {marginTop: (errors.account) ? (width * 0.1 - 25) : (width * 0.1) }]}
                                    onPress={Login}
                                >
                                    <Text style={styles.login_button_text}> 
                                        登入
                                    </Text>
                                </Pressable>
                            </Animated.View>

                            <Animated.View style={[styles.login_card, backAnimatedStyle, {height: width * 1.15, borderColor: colors.outline, position: 'absolute'}]}>
                                <View style={styles.login_title_container}>
                                    <Text style={[styles.login_title, {color: colors.text}]}>
                                        註冊
                                    </Text>
                                </View>
                                <View style={styles.create_input_container}>
                                    <TextInput 
                                        style={[styles.create_input, {color: colors.text}]} 
                                        placeholder="輸入真實姓名"
                                        placeholderTextColor="#a0a0a0"
                                        value={Name}
                                        onChangeText={setName}
                                        onBlur={() => checkField('name', Name)}
                                    />
                                    <View style={styles.login_input_divider} />
                                    <TextInput 
                                        style={[styles.create_input, {color: colors.text}]} 
                                        placeholder="輸入電子郵件地址"
                                        placeholderTextColor="#a0a0a0"
                                        value={NewAccount}
                                        onChangeText={setNewAccount}
                                        onBlur={() => checkField('account', NewAccount)}
                                    />
                                    <View style={styles.login_input_divider} />
                                    <TextInput 
                                        style={[styles.create_input, {color: colors.text}]} 
                                        placeholder="輸入密碼"
                                        placeholderTextColor="#a0a0a0"
                                        value={NewPassword}
                                        onChangeText={setNewPassword}
                                        onBlur={() => checkField('password', NewPassword)}
                                    />
                                    <View style={styles.login_input_divider} />
                                    <TextInput 
                                        style={[styles.create_input, {color: colors.text}]} 
                                        placeholder="再次輸入密碼"
                                        placeholderTextColor="#a0a0a0"
                                        value={ConfirmPassword}
                                        onChangeText={setConfirmPassword}
                                        onBlur={() => checkField('confirm', ConfirmPassword)}
                                    />
                                </View>
                                {errors.account && (
                                    <Text style={[styles.errorText, {marginTop: 10}]}>
                                        {errors.account[0]}
                                    </Text>
                                )}
                                <Pressable 
                                    style={[styles.login_button, {marginTop: (errors.account) ? (width * 0.1 - 25) : (width * 0.1) }]}
                                >
                                    <Text style={styles.login_button_text}> 
                                        註冊
                                    </Text>
                                </Pressable>
                                <TouchableOpacity 
                                    onPress={flipcard} 
                                    activeOpacity={1} 
                                    style={[styles.login_button, {backgroundColor: '#70707080', marginTop: '5%'}]}
                                >
                                    <Text style={[styles.login_note, {color: '#ff383c'}]}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    login_page: {
        flex: 1,
        alignItems: 'center',
    },
    login_container: {
        flexGrow: 1,
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_container_content: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    login_card: {
        width: width * 0.8,
        padding: '5%',
        borderWidth: 1,
        borderRadius: 30,
        backfaceVisibility: 'hidden',
    },
    login_title:{
        fontSize: 24,
        fontWeight: '500',
    },
    login_title_container: {
        display: 'flex',
        width: '100%',
        height: width * 0.15,
        alignItems: 'center',
    },
    sign_in_input_container: {
        width: '100%',
        height: width * 0.24,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#70707080',
        borderRadius: 20,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    sign_in_input: {
        width: '100%',
        height: '50%',
        fontSize: 15,
        fontWeight: '500',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_input_divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#a0a0a0',
    },
    flipText: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },
    login_note_container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: width * 0.15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_note: {
        fontSize: 15,
    },
    login_flip_container: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 14,
        textAlign: 'center',
    },
    login_button: {
        display: 'flex',
        width: '100%',
        height: width * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.1,
        borderRadius: width * 0.9,
        backgroundColor: '#f8e364',
    },
    login_button_text:{
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    create_input_container: {
        width: '100%',
        height: width * 0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#70707080',
        borderRadius: 20,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    create_input: {
        width: '100%',
        height: '25%',
        fontSize: 15,
        fontWeight: '500',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
});