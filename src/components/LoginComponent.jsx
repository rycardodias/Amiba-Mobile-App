import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ToastAndroid } from 'react-native';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-toast-message'
import useAuth from '../hooks/useAuth';

export const LoginComponent = ({ navigation }) => {
    const [email, setemail] = useState('ricardo@amiba.pt');
    const [password, setpassword] = useState('Lol123!!');
    const { login, logout } = useAuth()

    async function handleLogin() {
        const res = await login(email, password);
        if (res.error || res.data.error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Email e/ou palavra-passe inválidos!'
            });
        }

    }

    return (
        <View >
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

            <Button style={{
                margin: 10,
                backgroundColor: "red"
            }}
                title="Entrar"
                onPress={handleLogin} />
            
            <Divider width={5} color='#fff' />

            <Button style={styles.button}
                title="Sair"
                onPress={() => logout()} />

            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    },
    button: {
        // borderWidth: 1,
        // margin: 10,
        // padding: 10

    }
});