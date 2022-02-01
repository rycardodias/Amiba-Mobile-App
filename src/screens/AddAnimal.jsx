import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { HelperText, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import * as Yup from "yup";
import { Formik } from 'formik';
import { genders, races } from '../lib/values/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';


export const AddAnimal = () => {
    const { t } = useTranslation()
    const isFocused = useIsFocused()
    const emptyObject = {
        identifier: "",
        ExplorationId: "",
        race: "",
        gender: "",
        birthDate: "02-01-2022",
        weight: "",
        slaughterDate: "",
        slaughterWeight: "",
        slaughterLocal: "",
        breeder: "",
    }

    // const [animal, setanimal] = useState(emptyObject);
    // const [show, setshow] = useState(false);
    // const [newDate, setnewDate] = useState(new Date());


    const fieldValidationSchema = Yup.object().shape({
        identifier: Yup.string().min(3, t("Too Short")).required(`${t('Identifier')} ${t('is required!')}`),
        race: Yup.string().required(`${t('Race')} ${t('is required!')}`),
        // ExplorationId: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
        // birthDate: Yup.date().required(`${t('Birth Date')} ${t('is required!')}`),
        weight: Yup.string().required(`${t('Weight')} ${t('is required!')}`),
    });

    async function handleSubmit(values) {
        try {
            const { identifier, race, gender, birthDate, weight } = values

            const ExplorationId = await AsyncStorage.getItem('ExplorationId')
            if (!(identifier && race && ExplorationId && birthDate && weight)) {

                return Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: 'Parametros em falta!'
                });
            }

            const animalAux = { ...values, ExplorationId: ExplorationId }

            const existingData = await AsyncStorage.getItem('AnimalStorage')

            if (!existingData) {
                await AsyncStorage.setItem('AnimalStorage', JSON.stringify([animalAux]))
            } else {
                let newArray = []

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

        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao adicionar registo!'
            });
        }
    }

    return (
        <>
            <Formik
                validationSchema={fieldValidationSchema}
                initialValues={emptyObject}
                onSubmit={(values, { resetForm }) => { handleSubmit(values); resetForm() }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (

                    <View>
                        <TextInput style={styles.input} name="identifier" placeholder={t('Identifier')}
                            onChangeText={handleChange('identifier')}
                            onBlur={handleBlur('identifier')}
                            value={values.identifier} />
                        <HelperText type="error" visible={Boolean(errors.identifier && touched.identifier)}>{errors.identifier}</HelperText>

                        <Picker name="race"
                            selectedValue={values.race} value={values.race}
                            onValueChange={handleChange('race')} onBlur={handleBlur('race')} >
                            <Picker.Item key="" value="" label={t("Race")} />
                            {races && races.map(item => {
                                return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                            })}
                        </Picker>
                        <HelperText type="error" visible={Boolean(errors.race && touched.race)}>{errors.race}</HelperText>

                        <Picker name="gender"
                            selectedValue={values.gender} value={values.gender}
                            onValueChange={handleChange('gender')} onBlur={handleBlur('gender')} >
                            <Picker.Item key="" value="" label={t("Gender")} />
                            {genders && genders.map(item => {
                                return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                            })}
                        </Picker>
                        <HelperText type="error" visible={Boolean(errors.race && touched.race)}>{errors.race}</HelperText>

                        <TextInput style={styles.input} name="weight" placeholder={t('Weight')}
                            onChangeText={handleChange('weight')}
                            onBlur={handleBlur('weight')}
                            value={values.weight} />
                        <HelperText type="error" visible={Boolean(errors.weight && touched.weight)}>{errors.weight}</HelperText>

                        <Button onPress={handleSubmit} title={t("Save")} disabled={!isValid} />
                    </View>
                )
                }
            </Formik >
            <Toast />
        </>
    )
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
