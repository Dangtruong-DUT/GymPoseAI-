import GradientButton from '@/src/components/GradientButton'
import TextInputCustom from '@/src/components/TextInput'
import { SCREEN_WIDTH } from '@/src/constants/devices.constant'
import { targetApi } from '@/src/services/rest'
import handleFormError from '@/src/utils/handleFormError'
import { targetSchema, TargetSchemaType } from '@/src/utils/rules.util'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import Toast from 'react-native-toast-message'

interface FormUpdateTodayTargetProps {
    waterVal: number
    caloriesVal: number
    onUpdate: () => void
    onCancel: () => void
}

function FormUpdateTodayTarget({ waterVal, caloriesVal, onUpdate, onCancel }: FormUpdateTodayTargetProps) {
    const methods = useForm<TargetSchemaType>({
        defaultValues: {
            calories: caloriesVal,
            water: waterVal
        },
        mode: 'onBlur',
        resolver: yupResolver(targetSchema),
        shouldUnregister: false
    })

    const updateTargetMutation = useMutation({
        mutationFn: targetApi.updateTodayTarget
    })
    const onUpdateForm = methods.handleSubmit((data) => {
        onUpdate()
        updateTargetMutation.mutate(data, {
            onSuccess: () => {
                Toast.show({
                    type: 'success',
                    text1: 'Target Updated',
                    text2: 'Your daily target has been successfully updated.'
                })
            },
            onError: () => {
                Alert.alert('Oops!', 'We couldn’t update your target. Give it another try.', [{ text: 'OK' }])
            }
        })
    })

    return (
        <View style={styles.wrapper}>
            <FormProvider {...methods}>
                <View style={styles.header}>
                    <Text style={styles.title}>Update Today Target</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
                        <Ionicons name='close-sharp' size={16} color='#ADA4A5' />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputWrapper}>
                    <TextInputCustom
                        name='water'
                        icon='glassOfWater'
                        type='numeric'
                        placeholder='Water (l)'
                        autoFocus
                    />
                    <TextInputCustom name='calories' icon='boots' type='numeric' placeholder='Calories (cal)' />
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <GradientButton
                        Square
                        style={styles.submitBtn}
                        containerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
                        onPress={onUpdateForm}
                        disabled={!methods.formState.isValid}
                    >
                        <Text style={styles.updateText}>Update</Text>
                    </GradientButton>
                </View>
            </FormProvider>
        </View>
    )
}

export default FormUpdateTodayTarget

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: SCREEN_WIDTH * 0.8
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
        borderBottomColor: '#DDDADA',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617'
    },
    closeBtn: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputWrapper: {
        gap: 16,
        marginBottom: 24
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cancelBtn: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
        backgroundColor: '#FFF',
        borderColor: '#DDDADA',
        borderWidth: 1
    },
    submitBtn: {
        height: 45
    },
    cancelText: {
        color: '#ADA4A5',
        fontWeight: '600'
    },
    updateText: {
        color: '#fff',
        fontWeight: '600'
    }
})
