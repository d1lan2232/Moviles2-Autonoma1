import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';

import {  ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';

export default function GaleriaScreen() {

    const [image, setImage] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    async function subir() {
        const storageRef = ref(storage, 'avatars/'+ "temporal");

        const response = await fetch(image);
        const blob = await response.blob();

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }


    return (
        <View style={styles.container}>
            <Button title="BUSCAR IMAGEN EN GALERIA" onPress={pickImage} />
            <Image source={{ uri: image }} style={styles.image} />
            <Button title='SUBIR IMAGEN' color={'green'} onPress={ ()=> subir()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
})