import { StyleSheet, View, Text, Image, ScrollView, Pressable, FlatList, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';

const { width } = Dimensions.get('window');

const carousel_data = [
    {
        id: 1,
        image: require('../images/Closed_announcement.png'),
    },
    {
        id: 2,
        image: require('../images/EP_remote-viewing_H.png'),
    },
    {
        id: 3,
        image: require('../images/Museum-indoor_H.jpg'),
    },
    {
        id: 4,
        image: require('../images/Museum-window_H.jpg'),
    },
    {
        id: 5,
        image: require('../images/Closed_announcement.png'),
    },
    {
        id: 6,
        image: require('../images/EP_remote-viewing_H.png'),
    },
];

export default function Carousel() {
    const flatListRef = useRef(null);
    const currentIndex = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = currentIndex.current + 1;

            if (nextIndex >= carousel_data.length) {
                nextIndex = 0;
            }

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            currentIndex.current = nextIndex;

            if(nextIndex == carousel_data.length - 1) {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index: 1,
                        animated: false,
                    });
                    currentIndex.current = 1;
                }, 500);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleMomentumScrollEnd = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        
        if (index === 0) {
            flatListRef.current?.scrollToIndex({ 
                index: carousel_data.length - 2, 
                animated: false 
            });
            currentIndex.current = carousel_data.length - 2;
            
        } else if (index === carousel_data.length - 1) {
            flatListRef.current?.scrollToIndex({ 
                index: 1, 
                animated: false 
            });
            currentIndex.current = 1;
            
        } else {
            // Normal scroll between real slides
            currentIndex.current = index;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={carousel_data}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={handleMomentumScrollEnd} 
        
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}

                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.image} style={{ width: width, height: '65%' }} resizeMode="cover"/>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        width: width,
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
