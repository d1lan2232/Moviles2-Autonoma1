import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Audio } from 'expo-av';


export default function CamaraScreen() {

    const [image, setImage] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            playSound()
        }
    };
    ///////////////////////////////////////
    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound }: any = await Audio.Sound.createAsync(require('../assets/sounds/risa.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    return (
        <View>
            <Button title="IMAGEN DESDE CAMARA" onPress={pickImage} color={'#4f6c3d'} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
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
        width: 200,
        height: 200,
    },
})