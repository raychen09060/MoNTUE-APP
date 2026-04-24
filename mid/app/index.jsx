import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
//testing
export default function Intro() {
  return (
    <SafeAreaView style={styles.intro_container}>
      <Pressable style={styles.intro_logo_container} onPress={() => router.push('/Home')}>
        <Image source={require('../images/logo_LM.png')} style={styles.intro_logo} resizeMode="contain"/>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  intro_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  intro_logo_container: {
    width: 350,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  intro_logo: {
    width: "100%",
    height: "100%",
  }
});