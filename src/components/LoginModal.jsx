import React from 'react'
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as Yup from "yup";
import { Input, Text, Button, } from 'react-native-elements';
import useAuth from '../hooks/useAuth';
import Toast from 'react-native-toast-message'

export const LoginModal = (props) => {
    const { t } = useTranslation()
    const { login, logout } = useAuth()

    const emptyObject = {
        email: "ricardo@amiba.pt",
        password: "Lol123!!",
    }

    const fieldValidationSchema = Yup.object().shape({
        email: Yup.string().email(t('Should be a valid email address')).required(`${t('Email')} ${t('is required!')}`),
        password: Yup.string().min(6, t("Too Short")).required(`${t('Password')} ${t('is required!')}`),
    });

    async function handleSubmit(values) {
        const request = await login(values.email, values.password)
        if (request.data.error || request.error) {
            return Toast.show({ type: 'error', text1: 'Erro!', text2: 'Dados de acesso incorrectos!' });
        }
        await props.showModal()
        await props.loggedIn()
        Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Login efetuado com sucesso!' });
    }

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                //     props.showModal()
                // }}
            >
                <View style={styles.centeredView}>
                    <TouchableOpacity onPress={() => props.showModal()}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>

                                {/* <View style={styles.modalHeader}> 
                            <Pressable style={styles.pressableClose}><Text>X</Text></Pressable>
                        </View>
                        <View> */}
                                <Formik
                                    validationSchema={fieldValidationSchema}
                                    initialValues={emptyObject}
                                    onSubmit={(values, { resetForm }) => { handleSubmit(values); resetForm() }}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                                        <View >
                                            <Text style={styles.text}>{t("Email")}</Text>
                                            <Input
                                                style={styles.input}
                                                placeholder={t('Email')}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                errorMessage={Boolean(errors.email && touched.email) && errors.email}
                                            />
                                            <Text style={styles.text}>{t("Password")}</Text>
                                            <Input
                                                placeholder={t('Password')}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                errorMessage={Boolean(errors.password && touched.password) && errors.password}
                                            />

                                            <Button onPress={handleSubmit} title={t("Login")} disabled={!isValid} />
                                        </View>
                                    )}
                                </Formik >
                                {/* </View> */}


                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </View>


            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    text: {
        fontSize: 18,
        paddingStart: 10,
        fontWeight: 'bold',
    },
    pressableClose: {
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5
    },
    modalContent: {
        flex: 1
    },
    modalHeader: {
        flexDirection: "row",
    },
    // button: {
    //     borderRadius: 20,
    //     padding: 10,
    //     elevation: 2
    // },
    // buttonOpen: {
    //     backgroundColor: "#F194FF",
    // },
    // buttonClose: {
    //     backgroundColor: "#2196F3",
    // },
    // textStyle: {
    //     color: "white",
    //     fontWeight: "bold",
    //     textAlign: "center"
    // },
    // modalText: {
    //     marginBottom: 15,
    //     textAlign: "center"
    // }
});
