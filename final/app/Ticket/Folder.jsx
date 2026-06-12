import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { router } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';


const {width, height} = Dimensions.get('window');

export default function Folder() {
    const { colors } = useLDM();

    return (
        <View style={styles.folder_container}>
            {UserData[0].ticket[0] ? 
                <View style={styles.folder_content}>
                    <FlatList
                        style = {{ width: '100%' }}
                        contentContainerStyle={{ 
                            width: width * 0.9,
                            alignItems: 'center',
                            gap: 20,
                        }}
                        data = { UserData[0].ticket }
                        renderItem={({ item }) => (
                            <Pressable 
                                style={[styles.ticket_container, {borderColor: colors.outline}]}
                                onPress = {() => router.push({
                                    pathname: '/Ticket/TicketDetail',
                                    params:{
                                        ticketnum: item,
                                        back: '/Ticket',
                                        next: '/Ticket'
                                    }
                                })}
                            >
                                <View style={styles.poster_container}>
                                    <Image source={ ExhibitData[0].poster_D } style={{ width: '100%', height: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} resizeMode="contain"/>
                                </View>
                                <View style={styles.ticket_content}>
                                    <View style={styles.name}>
                                        <Text style={[styles.name_text, {color: colors.text}]}>
                                            { ExhibitData[0].ticket_name }
                                        </Text>
                                    </View>
                                    <View style={styles.type}>
                                        <Text style={[styles.type_text, {color: colors.text}]}>
                                            {
                                                {
                                                'A': '一般票',
                                                'B': '優待票',
                                                'C': '北教大專屬票',
                                                }[item[0]]
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            :
                <View style={styles.folder_content}>
                    <Text style={[styles.empty_text, {color: colors.text}]}>
                        還沒購買門票，
                    </Text>
                    <Text style={[styles.empty_text, {color: colors.text}]}>
                        趕快去買一張吧
                    </Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    folder_container: {
        flex: 1,
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    folder_content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    empty_text: {
        fontSize: 20,
        letterSpacing: 3,
    },
    ticket_container: {
        display: 'flex',
        flexDirection: 'row',
        width: 320,
        height: 150,
        padding: 1,
        borderWidth: 1,
        borderRadius: 20
    },
    poster_container: {
        width: '40%',
        height: '100%',
        padding: 1,
/*         borderWidth: 1,
        borderColor: '#00ff00', */
    },
    ticket_content: {
        display: 'flex',
        width: '60%',
        height: '100%',
        justifyContent: 'center',
    },
    name: {
        display: 'flex',
        width: '100%',
        height: '30%',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    name_text: {
        fontSize: 20,
    },
    type: {
        display: 'flex',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000' */
    },
    type_text: {
        fontSize: 14,
        fontWeight: 'thin',
        letterSpacing: 5,
    },
});