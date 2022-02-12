import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ToastAndroid } from 'react-native';
import { getUsers } from '../lib/requests/usersRequests';
import Toast from 'react-native-toast-message'
import useAuth from '../hooks/useAuth';

export const Login = ({ navigation }) => {
    const [email, setemail] = useState('ricardo@amiba.pt');
    const [password, setpassword] = useState('Lol123!!');
    const { login, logout } = useAuth()

    async function handleLogin() {
        const res = await login(email, password);
        // if(res.error)
        if (res.error || res.data.error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Email e/ou palavra-passe inválidos!'
            });
        }

        // navigation.navigate('Home')
    }

    async function handlegetUsers() {
        const res = await getUsers()
    }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../public/favicon.png")} />
            <Text>Bem-vindo à Amiba!</Text>
            <TextInput
                style={styles.input}
                value={email}
                placeholder='Introduza o e-mail'
                onChangeText={text => setemail(text)}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                placeholder='Introduza a palavra-passe'
                onChangeText={text => setpassword(text)}
            />
            <Button
                title="Entrar"
                onPress={handleLogin} />

            <Button
                title="Users"
                onPress={() => navigation.navigate('Home')} />
            <Button
                title="Sair"
                onPress={() => logout()} />

            {/* <Toast /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        height: 30,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
});