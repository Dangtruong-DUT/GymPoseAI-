import * as Notifications from 'expo-notifications'
import { Path, UseFormSetError } from 'react-hook-form'
import { ResponseApi } from '@/src/types/utils.type'
import { isAxiosUnauthorizedError, isAxiosUnprocessableEntityError } from './common.util'

import { FieldValues } from 'react-hook-form'
import { Alert } from 'react-native'

export default function handleFormError<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
    if (isAxiosUnprocessableEntityError<ResponseApi<T, any>>(error)) {
        const formError = error.response?.data.errors
        if (formError != undefined) {
            formError.forEach((element) => {
                const key = element.field as keyof T
                setError(key as Path<T>, {
                    message: element.message,
                    type: 'Server'
                })
            })
        }
    } else if (isAxiosUnauthorizedError<ResponseApi<T, any>>(error)) {
        Alert.alert('Unauthorize', error.response?.data.message, [{ text: 'OK' }])
    }
}

//UseFormSetError<TFieldValues>
