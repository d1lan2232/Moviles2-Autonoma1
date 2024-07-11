import { Button, StyleSheet, Text, View, TextInput, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7QKX9Tkkaryfd_PC3sIQ6y0-Q8W6d7sczg&s'}}
    style={styles.imagen}>
    <View style={styles.container}>
      <Text style={{ fontSize: 40 , paddingBottom: 5}}>Login</Text>

      <TextInput
      style={styles.input}
      placeholder='Ingresa tu correo electrónico'
      onChangeText={(texto) => setCorreo(texto)}
      keyboardType='email-address'
      />
      <TextInput
        placeholder='Ingresa contraseña'
        style={styles.input}
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => login()}>
        <Text style={styles.boton} onPress={login}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('Registro')} style={{color: 'blue'}}> 👉 Regístrate aquí 👈</Text>
    </View>

  </ImageBackground>
)}

const styles = StyleSheet.create({
  imagen: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderRadius: 15,
    borderWidth: 2,
    textAlign: 'center'
    },
  boton: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    borderRadius: 25,
    width: 100,
    margin: 15
  }
})
