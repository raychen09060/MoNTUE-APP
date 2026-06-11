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
    }
    