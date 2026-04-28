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
            <View style={styles.setting_tittle_container}>
                <Text style={{color: colors.text, fontSize: 18, letterSpacing: 3}}>
                    個人資訊
                </Text>
            </View>
            <View style={[styles.setting_account_container, {borderColor: colors.outline}]}>
                <View style={styles.setting_account_img_container}>
                    {UserData[0].img ? 
                        <Image source={{ uri: UserData[0].img }} style={styles.setting_account_img} resizeMode="contain" />
                    : 
                        <Image source={colors.User_img} style={styles.setting_account_img} resizeMode="contain" />
                    }
                </View>
                <View style={styles.setting_account_info_container}>
                    <View style={styles.setting_account_info_name_container}>
                        <Text style={{color: colors.text, fontSize: 20, fontWeight: '500'}}>
                            {UserData[0].id ? 
                                UserData[0].name 
                            : 
                                '未登入'
                            }
                        </Text>
                    </View>
                    <View style={styles.setting_account_info_email_container}>
                        {UserData[0].id ? 
                            <Text style={{color: colors.text, fontSize: 20, fontWeight: '500'}}>
                                {UserData[0].email}
                            </Text>
                        :
                            <Pressable style={styles.setting_account_login_button} onPress={() => router.push('/Settings/Login')}>
                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight: '500', letterSpacing: 2}}>
                                    登入/註冊
                                </Text>
                            </Pressable>
                            }
                    </View>
                </View>
            </View>
            <View style={styles.setting_tittle_container}>
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
                <View style={styles.setting_other_items_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={colors.Contact_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                        <Text style={{color: colors.text, fontSize: 24, letterSpacing: 3}}>
                            聯絡我們
                        </Text>
                    </View>
                    <Image source={colors.Next_icon} style={styles.setting_other_items_icon} resizeMode="contain"/>
                </View>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    setting_container: {
        flex: 1,
        alignItems: 'center',
    },
    setting_tittle_container: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.05,
        marginTop: 10,
    },
    setting_account_container: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    setting_account_img_container: {
        width: height * 0.1,
        height: height * 0.1,
        marginLeft: width * 0.05,
/*         borderWidth: 1,
        borderColor: '#ffffff', */
    },
    setting_account_img: {
        width: '100%',
        height: '100%',
    },
    setting_account_info_container: {
        width: height * 0.2,
        height: height * 0.1,
        marginLeft: width * 0.05,
/*         borderWidth: 1,
        borderColor: '#ffffff', */
    },
    setting_account_info_name_container: {
        width: '100%',
        height: '50%',
        paddingLeft: 15,
    },
    setting_account_info_email_container: {
        width: '100%',
        height: '50%',
    },
    setting_account_login_button: {
        display: 'flex',
        width: '80%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8E364',
        borderRadius: height * 0.05,
    },
    setting_other_container: {
        width: width * 0.8,
        height: height * 0.4 + 4,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
    },
    setting_other_items_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: height * 0.08,
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
/*         borderWidth: 1,
        borderColor: '#ffffff' */
    },
});