import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

//FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';



export default function RegistroScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user)
          navigation.navigate("Login")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode);
          
          // ..
        });
        setCorreo("");
        setContrasenia("")
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>REGISTRO</Text>

            <TextInput
                placeholder='Ingresa tu correo electrónico'
                onChangeText={(texto) => (setCorreo(texto))}
                keyboardType='email-address'
            />
            <TextInput
                placeholder='Ingresa contraseña'
                onChangeText={(texto) => (setContrasenia(texto))}
            />

            <Button title='Registrar' onPress={() => registro()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})