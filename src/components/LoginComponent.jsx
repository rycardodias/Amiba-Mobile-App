import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ToastAndroid } from 'react-native';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-toast-message'
import useAuth from '../hooks/useAuth';
import { Formik } from 'formik';
import { Input, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";

export const LoginComponent = ({ navigation }) => {
    const emptyObject = {
        email: "",
        password: "",
    }
    const { t } = useTranslation()
    // const [email, setemail] = useState('ricardo@amiba.pt');
    // const [password, setpassword] = useState('Lol123!!');
    const { login, logout } = useAuth()

    const fieldValidationSchema = Yup.object().shape({
        email: Yup.string().email().required(`${t('Email')} ${t('is required!')}`),
        password: Yup.string().required(`${t('Password')} ${t('is required!')}`),
    });

    async function handleSubmit(values) {
        const res = await login(values.email, values.password);
        if (res.error || res.data.error) {
            return Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Email e/ou palavra-passe inválidos!'
            });
        }

        return Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Login efetuado com sucesso!'
        });
    }

    return (
        <View >
            <Formik
                validationSchema={fieldValidationSchema}
                initialValues={emptyObject}
                onSubmit={(values, { resetForm }) => { handleSubmit(values); resetForm() }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                    <View >
                        <Input
                            placeholder={t('Email')}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            errorMessage={Boolean(errors.email && touched.email) && errors.email}
                        />

                        <Input
                            secureTextEntry
                            placeholder={t('Password')}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            errorMessage={Boolean(errors.v && touched.password) && errors.password}
                        />

                        <Button onPress={handleSubmit} title={t("Login")} disabled={!isValid} />
                    </View>
                )}
            </Formik >

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