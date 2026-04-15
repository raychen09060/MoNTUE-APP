import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { past_data } from '../components/calendar/poster_data';

export default function Calendar() {
    const scrollY = useRef(new Animated.Value(0)).current;
    
    const upcommingHeight = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [150, 0],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header Section="展覽資訊"/>
            
            <View style={styles.calendar_container}>
                
                <Animated.FlatList
                    data={past_data}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ marginTop: 20 }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false } 
                    )}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    
                    contentContainerStyle={{ 
                        paddingTop: 230, 
                        paddingBottom: 50,
                        alignItems: 'center'
                    }}

                    renderItem={({ item }) => (
                        <Image source={item.img} style={styles.past_image} resizeMode="cover"/>
                    )}
                />

                <View style={styles.absolute_upcoming_wrapper}>
                    <View style={styles.upcomming_container}>
                        <Text style={{ fontSize: 15, fontWeight: '600' }}>預告展覽</Text>
                        
                        <Animated.View style={{ height: upcommingHeight, overflow: 'hidden', marginTop: 10 }}>
                            <Image 
                                source={require('../images/EP_remote-viewing_H.png')} 
                                style={styles.upcomming_img} 
                                resizeMode="cover"
                            />
                        </Animated.View>
                        <Text style={{ fontSize: 15, fontWeight: '600', marginTop: 10 }}>歷史展覽</Text>
                    </View>
                </View>

            </View>
            <Footer Section="Calendar"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    calendar_container: {
        flex: 1,
        position: 'relative',
        paddingBottom: 50,
    },
    absolute_upcoming_wrapper: {
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff', 
        paddingTop: 20,
        paddingBottom: 10,
    },
    upcomming_container: {
        width: 300,
    },
    upcomming_img: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    past_image: {
        width: 300, 
        height: 150, 
        borderRadius: 5, 
        marginTop: 10 
    }
});