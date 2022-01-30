import { sendRequest } from '../lib/requests/requests';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ToastAndroid } from 'react-native';
import { login } from '../lib/requests/usersRequests';

export const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    async function handleLogin() {
        const res = await login(email, password);

        console.log(res);
    }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../public/favicon.png")} />
            <Text>Bem-vindo à Amiba!</Text>
            <TextInput
                style={styles.input}
                placeholder='Introduza o e-mail'
                onChangeText={text => setemail(text)}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder='Introduza a palavra-passe'
                onChangeText={text => setpassword(text)}
            />
            <Text>{email}</Text>
            <Button
                title="Entrar"
                onPress={handleLogin} />
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