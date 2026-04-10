import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Header({ Section }) {
    return (
        <View style={styles.header_container}>
            <Text style={styles.header_text}>
                {Section}
            </Text>
            <Image source={require('../images/Language_switch_icon_LM.png')} style={{ width: 20, height: 20, position: 'absolute', right: 20 }} resizeMode="contain"/>
        </View>
    );
}

const styles = StyleSheet.create({
    header_container: {
        width: "100%",
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#000000', */
    },
    header_text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
