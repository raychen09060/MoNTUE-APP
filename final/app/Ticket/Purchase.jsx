import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { router } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';
import Select from '../Ticket/Select'

const {width, height} = Dimensions.get('window');

export default function Purchase({ initialSubTab = 0, onSubTabChange }) {
    const { colors } = useLDM();
    const [activesubTab, setActivesubTab] = useState(Number.isInteger(initialSubTab) ? initialSubTab : 0);

    useEffect(() => {
        setActivesubTab(Number.isInteger(initialSubTab) ? initialSubTab : 0);
    }, [initialSubTab]);

    return (
        <View style={styles.purchase_container}>
            {activesubTab ?
                <Select/>
            :
                <>
                    <Shadow distance={10} startColor={colors.glow} offset={[0, 0]}>
                        <View style={[styles.purchase_card, {backgroundColor: colors.bgc, borderColor: colors.glow_outline}]}>
                            <ScrollView>
                                <Text style={[styles.exhibit_describe_text, {color: colors.text}]}>
                                    { ExhibitData[0].description }
                                </Text>
                            </ScrollView>
                        </View>
                    </Shadow>
                    <Pressable 
                        style={{marginTop: '5%'}}
                        onPress={() => {
                            if (UserData[0].id) {
                                onSubTabChange?.(1);
                                setActivesubTab(1);
                            } else {
                                router.push({
                                    pathname: '/Settings/Login',
                                    params: {
                                        back: '/Ticket',
                                        next: '/Ticket?activeTab=0&activesubTab=1'
                                    }
                                });
                            }
                        }}>
                        <Text style={[styles.tab_text, {color: colors.text}]}>
                            立即購票
                        </Text>
                    </Pressable>
                </>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    purchase_container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    purchase_card: {
        display: 'flex',
        width: width * 0.75,
        height: height * 0.6,
        padding: '4%',
        borderWidth: 1,
        borderRadius: 20,
    },
    exhibit_describe_text: {
        textAlign: 'justify',
        fontSize: 12,
    },
});