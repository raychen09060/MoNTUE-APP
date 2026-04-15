import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScanArea = 250;

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    
    const [cameraLayout, setCameraLayout] = useState(null);
    
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={ styles.permission_container }>
                <Text style={{  fontSize: 12 }}>抱歉，我們需要相機權限才能掃描 QR code!</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const handleLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setCameraLayout({ width, height });
    };

    const handleBarCodeScanned = ({ type, data, bounds }) => {
        if(scanned){
            return;
        }

        if(!cameraLayout){
            return;
        }

        //This may not work on certain devices.
        if(bounds && bounds.origin){
            const { x, y } = bounds.origin;

            const minX = (cameraLayout.width - ScanArea) / 2;
            const maxX = minX + ScanArea;
            const minY = (cameraLayout.height - ScanArea) / 2;
            const maxY = minY + ScanArea;

            if(x < minX || x > maxX || y < minY || y > maxY){
                return;
            }
        }

        setScanned(true);
        Alert.alert('QR Code Scanned!', `Data: ${data}`);
    };

    return (
        <View style={styles.camera_container}>
            <CameraView 
                style = {styles.camera}
                facing = 'back'
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                onLayout={handleLayout}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />
            <View style={styles.camera_shade_container}>
                <View style={[styles.camera_shade, { justifyContent: 'flex-end' }]}>
                    <Text style={{ fontSize: 15, color: '#ffffff', paddingBottom: 10 }}>請掃描作品說明板上的 QR code</Text>
                </View>
                <View style={styles.camera_shade_mid}>
                    <View style={styles.camera_shade}/>
                    <View style={styles.camera_clear}/>
                    <View style={styles.camera_shade}/>
                </View>
                <View style={styles.camera_shade}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    camera_container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    camera_shade_container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    camera_shade: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera_shade_mid: {
        display: 'flex',
        flexDirection: 'row',
        height: ScanArea,    
    },
    camera_clear:{
        width: ScanArea,
        height: ScanArea,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 5,
    },
});