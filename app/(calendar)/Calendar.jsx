import { StyleSheet, View, Text, Image, Animated, Pressable } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { past_data, now_or_upcomming_data } from '../../components/calendar/poster_data';

export default function Calendar() {
    const scrollY = useRef(new Animated.Value(0)).current;
    
    const upcommingHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [200, 0],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header Section="展覽資訊"/>
            
            <View style={styles.calendar_container}>
                
                <Animated.FlatList
                    data={past_data}
                    keyExtractor={(item) => item.id.toString()}
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
                        <Pressable
                            onPress={() => {
                                router.push(`/Poster/${item.id}`);
                            }}
                        >
                            <Image source={item.img_H} style={styles.past_image} resizeMode="cover"/>
                            <View style={styles.title_container}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subtitle}>{item.date}</Text>
                            </View>
                        </Pressable>
                        
                    )}
                />

                <View style={styles.absolute_upcoming_wrapper}>
                    <View style={styles.upcomming_container}>
                        <Text style={{ fontSize: 15, fontWeight: '600' }}>預告展覽</Text>
                        
                        <Animated.FlatList
                            data={now_or_upcomming_data}
                            keyExtractor={(item) => item.id.toString()}
                            style={{ height: upcommingHeight, overflow: 'hidden' }}

                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => {
                                        router.push(`/Poster/${item.id}`);
                                    }}
                                >
                                    <Image source={item.img_H} style={styles.past_image} resizeMode="cover"/>
                                    <View style={styles.title_container}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.subtitle}>{item.date}</Text>
                                    </View>
                                </Pressable>
                            )}
                        />

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
    },
    title_container: {
        display: 'flex',
        alignItems: 'center',
        width: 300,
        height: 35,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
    },
});