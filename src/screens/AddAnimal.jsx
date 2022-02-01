import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { HelperText, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import * as Yup from "yup";
import { Formik } from 'formik';
// import DateTimePicker from '@react-native-community/datetimepicker';


export const AddAnimal = () => {
    const { t } = useTranslation()
    const emptyObject = {
        identifier: "",
        ExplorationId: "",
        race: "",
        gender: "",
        birthDate: "",
        weight: "",
        slaughterDate: "",
        slaughterWeight: "",
        slaughterLocal: "",
        breeder: "",
    }

    const [animal, setanimal] = useState(emptyObject);
    // const [showDate, setshowDate] = useState(false);

    const fieldValidationSchema = Yup.object().shape({
        identifier: Yup.string().min(3, t("Too Short")).required(`${t('Identifier')} ${t('is required!')}`),
        race: Yup.string().required(`${t('Race')} ${t('is required!')}`),
        ExplorationId: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
        birthDate: Yup.date().required(`${t('Birth Date')} ${t('is required!')}`),
        weight: Yup.string().required(`${t('Weight')} ${t('is required!')}`),
    });

    async function handleAddAnimal() {
        try {
            const { identifier, race, birthDate, weight } = animal

            const ExplorationId = await AsyncStorage.getItem('ExplorationId')

            if (!(identifier, race, ExplorationId, birthDate, weight)) {
                return Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: 'Parametros em falta!'
                });
            }

            let animalAux = { ...animal, ExplorationId: ExplorationId }

            let newArray = []

            const existingData = await AsyncStorage.getItem('AnimalStorage')

            if (!existingData) {
                await AsyncStorage.setItem('AnimalStorage', JSON.stringify([animalAux]))
            } else {
                const parsed = JSON.parse(existingData)

                for (const element of parsed) {
                    newArray.push(element)
                }
                newArray.push(animalAux)

                await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newArray))
            }
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Registo adicionado com sucesso!'
            });
            await setanimal(emptyObject)
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao adicionar registo!'
            });
        }
    }

    async function handleList() {
        const existingData = await AsyncStorage.getItem('AnimalStorage')
        console.log("existingData", JSON.parse(existingData));
    }

    async function handleDelete() {
        await AsyncStorage.removeItem('AnimalStorage')
    }

    // return <View style={styles.container}>
    //     <Button
    //         title='Eliminar Animal'
    //         onPress={handleDelete} />
    //     <Toast /> 

    //     <Button
    //         title='Listar Animal'
    //         onPress={handleList} />
    return (
        <Formik
            style={styles.container}
            validationSchema={fieldValidationSchema}
            initialValues={emptyObject}
            onSubmit={handleAddAnimal}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                <View>
                    <TextInput style={styles.input} name="identifier" placeholder={t('Identifier')}
                        onChangeText={handleChange('identifier')}
                        onBlur={handleBlur('identifier')}
                        value={values.identifier} />
                    <HelperText type="error" visible={Boolean(errors.identifier && touched.identifier)}>{errors.identifier}</HelperText>

                    <TextInput style={styles.input} name="race" placeholder={t('Race')}
                        onChangeText={handleChange('race')}
                        onBlur={handleBlur('race')}
                        value={values.race} />
                    <HelperText type="error" visible={Boolean(errors.race && touched.race)}>{errors.race}</HelperText>

                    <TextInput style={styles.input} name="birthDate" placeholder={t('BirthDate')}
                        type="date"
                        onChangeText={handleChange('birthDate')}
                        // onPress={setshowDate(true)}
                        onBlur={handleBlur('birthDate')}
                        value={values.birthDate} />
                    <HelperText type="error" visible={Boolean(errors.birthDate && touched.birthDate)}>{errors.birthDate}</HelperText>

                    {/* {showDate && <DateTimePicker 
                        value={values.birthDate}
                        display="calendar"
                    />} */}

                    <TextInput style={styles.input} name="weight" placeholder={t('Weight')}
                        onChangeText={handleChange('weight')}
                        onBlur={handleBlur('weight')}
                        value={values.weight} />
                    <HelperText type="error" visible={Boolean(errors.weight && touched.weight)}>{errors.weight}</HelperText>


                    <Button onPress={handleSubmit} title={t("Save")} disabled={!isValid} />
                </View>
            )}
        </Formik>
    )

    {/* </View>; */ }
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
