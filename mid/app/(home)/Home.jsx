import { StyleSheet, View, Text, Image, Pressable, Animated, Modal, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../../components/Footer';
import Carousel from '../../components/home/Carousel';
import { NEWS } from '../../components/home/news_data';
import { router } from 'expo-router';

export default function News() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const carouselHeight = scrollY.interpolate({
        inputRange: [0, 195],
        outputRange: [195, 0], 
        extrapolate: 'clamp', 
    });

    const openNews = (item) => {
        setSelectedNews(item);
        setModalVisible(true);
    };

    const closeNews = () => {
        setModalVisible(false);
        setSelectedNews(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.home_header_container}>
                <Image source={require('../../images/logo_LM.png')} style={{ width: 200, height: 100 }} resizeMode="contain"/>
                <Pressable style={styles.home_header_button_container}>
                    <Image source={require('../../images/Language_switch_icon_LM.png')} style={{ width: 20, height: 20 }} resizeMode="contain"/>
                </Pressable>
            </View>

            <View style={styles.main_content}>
                
                <Animated.FlatList
                    data={NEWS}
                    keyExtractor={(item) => item.id.toString()}
                    style={{width: 300, alignSelf: 'center'}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    showsVerticalScrollIndicator={false}
                    
                    contentContainerStyle={{ 
                        paddingTop: 230,
                        paddingBottom: 50,
                        alignItems: 'center'
                    }} 

                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => openNews(item)}
                        >
                            <View style={styles.news_item_container}>
                                <Text style={{ fontSize: 12, fontWeight: '600', letterSpacing: 3, lineHeight: 20 }}>{item.title}</Text>
                                <Text style={{ fontSize: 10, color: '#666666', letterSpacing: 2, lineHeight: 15 }}>{item.date}</Text>
                                <Text style={{ fontSize: 10, letterSpacing: 2, lineHeight: 18 }}>{item.description.substring(0, 15) + '......'}</Text>
                            </View>
                        </Pressable>
                        
                    )}
                />
                <View style={styles.carousel_wrapper}>
                    <Animated.View style={{ height: carouselHeight, overflow: 'hidden' }}>
                        <Carousel />
                    </Animated.View>
                    <View style={{width: 300, alignSelf: 'center' }}>
                        <Text style={{fontSize: 15, fontWeight: '600', marginVertical: 10 }}>最新公告</Text>
                    </View>
                </View>
            </View>            
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeNews}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedNews && (
                            <>
                                <ScrollView>
                                    <Text style={styles.modalTitle}>{selectedNews.title}</Text>
                                    <Text style={styles.modalDate}>{selectedNews.date}</Text>
                                    <Text style={styles.modalDesc}>{selectedNews.description}</Text>
                                </ScrollView>
                                <Pressable style={styles.closeButton} onPress={closeNews}>
                                    <Text style={{ fontSize: 16, color: '#ffffff' }}>關閉</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
            <Footer Section="Home"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    home_header_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#ffffff',
        zIndex: 2,
    },
    home_header_button_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginRight: 10,
    },
    main_content: {
        flex: 1,
        position: 'relative',
        paddingBottom: 50,
    },
    carousel_wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        zIndex: 1, 
    },
    news_item_container: {
        width: 300,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
        marginTop: 10,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        height: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        paddingBottom: 0,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    modalDesc: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    closeButton: {
        height: 45,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c8c8c8',
        borderRadius: 10,
        marginVertical: 10,
    }
});