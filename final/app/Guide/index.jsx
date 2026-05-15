import { StyleSheet, View, Text, Image, ScrollView, Pressable, TextInput, Alert, Dimensions,  } from 'react-native';
import React, { useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { useLDM } from '../../components/LDM';
import Scanner from '../../components/scanner'

const {width, height} = Dimensions.get('window');

export default function Intro() {
    const { colors } = useLDM();
    const [manualInput, setManualInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    
    const handleinput = () => {
        Alert.alert(`Starting guide track : ${manualInput}`);
        setManualInput('');
    };

    const handleScanSuccess = (data) => {
        setManualInput(data);
        setIsScanning(false);
    };
    
    return (
        <SafeAreaView style={[styles.setting_container, {backgroundColor: colors.bgc}]}>
            <Header GoTo="/Home"/>
            {isScanning ? (
                <Scanner 
                    onScan={handleScanSuccess} 
                    onCancel={() => setIsScanning(false)} 
                />
                ) : 
                (
                    <View style={styles.guide_container}>
                        <View style={styles.guide_text_container}>
                            <Text style={[styles.guide_text, {color: colors.text}]}>輸入作品編號或</Text>
                            <Text style={[styles.guide_text, {color: colors.text}]}>掃描作品說明板上的 QR code </Text>
                        </View>
                        <View style={styles.input_container}>
                            <TextInput
                                style={[styles.input, {backgroundColor: colors.input}]}
                                placeholder="輸入編號"
                                placeholderTextColor={ colors.text }
                                value={manualInput}
                                onChangeText={setManualInput}
                                keyboardType="number-pad"
                                returnKeyType="send"
                                onSubmitEditing={handleinput}
                            />
                            <Pressable
                                style={styles.icon_container}
                                onPress={() => setIsScanning(true)}
                            >
                                <Image source={colors.Scanner_icon} style={styles.icon} resizeMode='cover'/>
                            </Pressable>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    setting_container: {
        flex: 1,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    guide_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60,
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    guide_text_container: {
        display: 'flex',
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#00ff00', */
    },
    guide_text: {
        display: 'flex',
        width: 250,
        textAlign: 'center',
        fontSize: 14,
/*         borderWidth: 1,
        borderColor: '#0000ff', */
    },
    input_container: {
        display: 'flex',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    input: {
        width: 200,
        height: 50,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        fontSize: 18,
    },
    icon_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#d0d0d0',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    icon: {
        width: 40,
        height: 40,
    },
});