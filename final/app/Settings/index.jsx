import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch } from 'react-native';
import React, { useState, useEffect} from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { LanguageData } from '../../components/LanguageData';
import { useLDM } from '../../components/LDM';

const {width, height} = Dimensions.get('window');
const languageData = LanguageData.map((item) => ({ label: item.name, value: item.id }));

export default function Settings() {
    const [language, setLanguage] = useState(languageData[1].value);
    const { colors, isDarkMode, toggleTheme } = useLDM();

    return (
        <SafeAreaView style={[styles.setting_container, {backgroundColor: colors.bgc}]}>
            <Header GoTo="/Home"/>
            <View style={styles.setting_title_container}>
                <Text style={{color: colors.text, fontSize: 18, letterSpacing: 3}}>
                    個人資訊
                </Text>
            </View>
            <View style={[styles.setting_account_container, {borderColor: colors.outline}]}>
                <View style={styles.setting_account_icon_container}>
                        <Image source={UserData[0].id ? colors.User_img_in : colors.User_img_out} style={styles.setting_account_icon} resizeMode='contain'/>
                </View>
                <View style={styles.setting_account_name_container}>
                    {UserData[0].id ? 
                        <Text style={{fontSize: 24, color: colors.text}}>
                            {UserData[0].tel}
                        </Text>
                    :
                        <Pressable
                            style={styles.setting_account_button}
                            onPress={() => router.push({
                                pathname: '/Settings/Login',
                                params: {
                                    next: '/Settings',
                                    back: '/Settings',
                                }
                            })}
                        >
                            <Text style={{fontSize: 20, color: '#ffffff', fontWeight: '600'}}>
                                請登入
                            </Text>
                        </Pressable>
                    }
                </View>
            </View>
            <View style={styles.setting_title_container}>
                <Text style={{color: colors.text, fontSize: 18, letterSpacing: 3}}>
                    其他資訊
                </Text>
            </View>
            <View style={[styles.setting_other_container, {borderColor: colors.outline}]}>
                <View style={styles.setting_other_items_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={colors.Language_switch_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                        <Text style={{color: colors.text, fontSize: 24, letterSpacing: 3}}>
                            變更語言
                        </Text>
                    </View>
                    <Dropdown
                        style={[styles.setting_language_dropdown, {backgroundColor: colors.bgc}]}
                        selectedTextStyle={{color: colors.text, fontSize: 16, textAlign: 'right'}}
                        itemTextStyle={{color: colors.text, fontSize: 16, textAlign: 'right'}}
                        containerStyle={{ backgroundColor: colors.bgc }}
                        activeColor={colors.bgc}
                        data={languageData}
                        labelField="label"
                        valueField="value"
                        value={language}
                        onChange={item => {
                            setLanguage(item.value);
                        }}
                    />
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: colors.outline}}/>
                <View style={styles.setting_other_items_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={colors.Display_mode_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                        <Text style={{color: colors.text, fontSize: 24, letterSpacing: 3}}>
                            深色模式
                        </Text>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        thumbColor={isDarkMode ? '#F8E364' : '#ffffff'}
                        trackColor={{ false: '#999999', true: '#F8E364' }}
                    />
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: colors.outline}}/>
                <View style={styles.setting_other_items_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={colors.Notification_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                        <Text style={{color: colors.text, fontSize: 24, letterSpacing: 3}}>
                            通知設定
                        </Text>
                    </View>
                    <Image source={colors.Next_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: colors.outline}}/>
                <Pressable 
                    style={styles.setting_other_items_container}
                    onPress={() => router.push('/Settings/chatbot')}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={colors.Contact_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                        <Text style={{color: colors.text, fontSize: 24, letterSpacing: 3}}>
                            智慧客服
                        </Text>
                    </View>
                    <Image source={colors.Next_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                </Pressable>
                <View style={{width: '100%', height: 1, backgroundColor: colors.outline}}/>
                <View style={styles.setting_other_items_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={colors.Info_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                        <Text style={{color: colors.text, fontSize: 24, letterSpacing: 3}}>
                            關於
                        </Text>
                    </View>
                    <Image source={colors.Next_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                </View>
            </View>
            {UserData[0].id ? 
                <Pressable
                    style={styles.setting_logout_button}
                    onPress = {() => {
                        UserData[0].id = '';
                        UserData[0].tel = '';
                        UserData[0].ticket = [];
                        UserData[0].cart = {'A': 0, 'B': 0, 'C': 0};
                        router.push('/Settings');
                    }}
                >
                    <Text style={{fontSize: 20, color: '#ffaaaa', fontWeight: '600'}}>
                        登出
                    </Text>
                </Pressable>
            :
                <></>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    setting_container: {
        flex: 1,
        alignItems: 'center',
    },
    setting_title_container: {
        display: 'flex',
        flexDirection: 'row',
        width: width * 0.8,
        height: height * 0.05,
        marginTop: 10,
    },
    setting_title_icon_container: {
        display: 'flex',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    setting_title_icon: {
        display: 'flex',
        width: 15,
        height: 15,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    setting_account_container: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
    },
    setting_account_icon_container: {
        display: 'flex',
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    setting_account_icon: {
        display: 'flex',
        width: '100%',
        height: '60%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    setting_account_name_container: {
        display: 'flex',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        marginRight: '5%',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    setting_account_button: {
        display: 'flex',
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: '#f8e364',
    },
    setting_other_container: {
        width: width * 0.8,
        height: height * 0.4 + 4,
        borderWidth: 1,
        borderRadius: 30,
    },
    setting_other_items_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: height * 0.08,
        paddingRight: 15,
    },
    setting_other_items_icon: {
        width: width * 0.06,
        height: width * 0.06,
        marginHorizontal: width * 0.03,
    },
    setting_language_dropdown: {
        width: width * 0.3,
        height: 50,
        marginLeft: 15,
        borderRadius: 30,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    setting_logout_button: {
        display: 'flex',
        width: width * 0.7,
        height: height * 0.06,
        marginTop: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
});