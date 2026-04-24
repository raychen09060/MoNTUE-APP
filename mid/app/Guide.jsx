import { StyleSheet, View, Text, Image, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Scanner from '../components/guide/scanner'

export default function Guide() {
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
        <SafeAreaView style={styles.container}>
            <Header Section="語音導覽"/>
            {isScanning ? (
                <Scanner 
                    onScan={handleScanSuccess} 
                    onCancel={() => setIsScanning(false)} 
                />
                ) : 
                (
                    <View style={styles.guide_container}>
                        <View style={styles.guide_text_container}>
                            <Text style={styles.guide_text}>輸入作品編號或</Text>
                            <Text style={styles.guide_text}>掃描作品說明板上的 QR code </Text>
                        </View>
                        <View style={styles.input_container}>
                            <TextInput
                                style={styles.input}
                                placeholder="輸入編號"
                                placeholderTextColor="#a0a0a0"
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
                                <Image source={require('../images/Scanner_icon_LM.png')} style={styles.icon} resizeMode='cover'/>
                            </Pressable>
                        </View>
                    </View>
                )
            }
            <Footer Section="Guide"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        backgroundColor: '#d0d0d0',
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