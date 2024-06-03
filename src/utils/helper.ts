import Swal from 'sweetalert2'
import { IRole, IUser } from '@/types/common'

export type FormDataType = {
    key: string
    value: string | number | string[] | number[]
}

export const makeFormData = (data: FormDataType[]) => {
    const formData = new FormData()
    data.forEach((item: any) => {
        if (Array.isArray(item.value)) {
            const arrayKey = `${item.key}[]`
            item.value.forEach((el: any) =>
                formData.append(arrayKey, el.toString()),
            )
        } else {
            formData.append(item.key, item.value?.toString())
        }
    })
    return formData
}

export const showConfirmationAlert = async (
    title: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText,
    })

    return result.isConfirmed
}

export function hasRole(user: IUser, roleName: string): boolean {
    // Check if the user has a role with the specified name
    return user.roles.some((role: IRole) => role.name === roleName)
}

export const checkNullInfo = (info: string | number | null | undefined) => {
    if (info || typeof info == 'number') {
        return info
    }
    return '---'
}

export function checkDecimal(inputValue: any) {
    const decimal = /^[-+]?[0-9]+\.[0-9]+$/
    if (inputValue && inputValue.length && inputValue.match(decimal)) {
        return parseFloat(inputValue).toFixed(2)
    }
    if (inputValue) {
        return inputValue
    }
    return 0
}
