import { Stack, router, UseLocalParams } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen 
                name="Home" 
                options={{ 
                    headerShown: false,
                    title: '',
                }} 
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    icon_container:{
        display: "flex",
        width: 40,
        height: 40,
/*         alignItems: "center",
        justifyContent: "center", */
    },
    icon:{
        width: "80%",
        height: "80%",
    }
});