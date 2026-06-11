import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { useLDM } from '../../components/LDM';
import Purchase from '../Ticket/Purchase';
import Folder from '../Ticket/Folder';
import { UserData } from '../../components/UserData';


const {width, height} = Dimensions.get('window');
const tablength = width * 0.6 / 2;

export default function Ticket() {
    const { colors } = useLDM();
    const [activeTab, setActiveTab] = useState(0);
    

    const translateX = useRef(new Animated.Value(activeTab * tablength)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: activeTab * (tablength + (width * 0.1)) + (width * 0.1 / 2),
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [activeTab, tablength, translateX]);

    return (
        <SafeAreaView style={[styles.setting_container, { backgroundColor: colors.bgc }]}> 
            <Header GoTo="/Home" />
            <View style={styles.tab_container}>
                <View style={styles.tab_button_container}>
                    <Pressable style={styles.tab_button} onPress={() => setActiveTab(0)}>
                        <Text style={[styles.tab_text, {color: activeTab ? colors.text : '#F8E364'}]}>
                            購買門票
                        </Text>
                    </Pressable>

                    <Pressable style={styles.tab_button} onPress={() => UserData[0].id ? setActiveTab(1) : router.push({
                                pathname: '/Settings/Login',
                                params: {
                                    back: '/Ticket',
                                    next: '/Ticket'
                                }
                            })}>
                        <Text style={[styles.tab_text, {color: activeTab ? '#F8E364' : colors.text}]}>
                            我的票匣
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.tab_line_container}>
                    <View style={styles.tab_line_deactive}/>
                    <Animated.View style={[styles.tab_line, {transform: [{translateX}]}]} />
                </View>
            </View>
            <View style={styles.ticket_content}>
                {activeTab ? 
                    <Folder/> 
                : 
                    <Purchase/>
                }
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    setting_container: {
        flex: 1,
        alignItems: 'center',
    },
    tab_container: {
        width: '80%',
        height: height * 0.1,
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    tab_button_container: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
/*         borderWidth: 1,
        borderColor: '#00ff00' */
    },
    tab_button: {
        display: 'flex',
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    tab_text: {
        fontSize: 20,
        fontWeight: '600',
    },
    tab_line_container: {
        display: 'flex',
        width: '100%',
        height: 5,
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ffffff' */
    },
    tab_line_deactive: {
        width: '100%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
    },
    tab_line: {
        position: 'absolute',
        width: tablength,
        height: 4,
        backgroundColor: '#F8E364',
    },
    ticket_content: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#00ff00' */
    },
});