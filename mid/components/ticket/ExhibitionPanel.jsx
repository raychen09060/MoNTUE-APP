import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import React, { useRef }from 'react';
import BuyTicket from './BuyTicket';

export default function ExhibitionPanel() {
    const scrollY = useRef(new Animated.Value(0)).current;

    const imageHeight = scrollY.interpolate({
        inputRange: [0, 190],
        outputRange: [190, 0], 
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                
                contentContainerStyle={{
                    paddingTop: 210,
                    paddingBottom: 60,
                }}
            >
                <Text style={styles.title}>《遙視》(Remote Viewing)</Text>

                <Text style={styles.note}>未滿六歲兒童、持本國身心障礙手冊者免費入場</Text>

                <View style={styles.divider}/>
                <BuyTicket />
            </Animated.ScrollView>

            <Animated.View style={[styles.absolute_header, { height: imageHeight }]}>
                <Image
                    source={require('../../images/EP_remote-viewing_H.png')}
                    style={styles.poster}
                    resizeMode="cover"
                />
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        width: 300,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    absolute_header: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        zIndex: 1,
    },
    poster: {
        width: '100%',
        height: 190,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        color: '#111111',
        textAlign: 'center',
        letterSpacing: 2,
        fontWeight: '600',
        marginVertical: 10,
    },
    note: {
        fontSize: 10,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#BDBDBD',
    },
});