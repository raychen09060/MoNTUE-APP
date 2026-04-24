import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScanArea = 250;

export default function Scanner({ onScan, onCancel}) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    
    const [cameraLayout, setCameraLayout] = useState(null);
    
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={ styles.permission_container }>
                <Text style={{  fontSize: 16 }}>抱歉，我們需要相機權限才能掃描 QR code!</Text>
                <View style={styles.permission_buttom_container}>
                    <Pressable 
                        style={[styles.cancel_button, {backgroundColor: '#c8c8c8'}]}
                        onPress={requestPermission} 
                    >
                        <Text style={{ fontSize: 16, color: '#000000' }}>同意</Text>
                    </Pressable>
                    <Pressable 
                            style={styles.cancel_button}
                            onPress={onCancel} 
                        >
                        <Text style={{ fontSize: 16, color: '#000000' }}>取消</Text>
                    </Pressable>
                </View>
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
        if (onScan) {
            onScan(data);
        }
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
                <View style={[styles.camera_shade, { paddingBottom: 40 }]}>
                    <Pressable 
                        style={styles.cancel_button}
                        onPress={onCancel} 
                    >
                        <Text style={{ fontSize: 16, color: '#000000' }}>取消</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    permission_container: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    permission_buttom_container: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
/*         borderWidth: 1,
        borderColor: '#00ff00', */
    },
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
    cancel_button: {
        display: 'flex',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(200, 200, 200)',
        borderRadius: 5,
    },
});