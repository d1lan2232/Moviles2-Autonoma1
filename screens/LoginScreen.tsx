import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user);
        navigation.navigate('Drawer')
        //Alert.alert("ACCESO")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        
        let titulo = "";
        let mensaje = "";

        switch (errorCode) {
          case "auth/wrong-password":
            titulo = "Error de contraseña";
            mensaje = "Contraseña incorrecta, revisar credenciales";
            break;
          case "auth/user-not-found":
            titulo = "Error de usuario";
            mensaje = "Usuario no encontrado, revisar el correo electrónico";
            break;
          default:
            titulo = "Error de acceso";
            mensaje = "Revisar credenciales de correo y contraseña";
            break;
        }


        Alert.alert(titulo, mensaje);
      });

      setCorreo("");
      setContrasenia("")
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Login</Text>

      <TextInput
        placeholder='Ingresa tu correo electrónico'
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
      />
      <TextInput
        placeholder='Ingresa contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
      />

      <Button title='Ingresar' onPress={() => login()} />

      <Text onPress={() => navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
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
