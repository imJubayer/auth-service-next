import React, { ChangeEvent, useState } from 'react'
import Input from '@mui/joy/Input'
import LockIcon from '@mui/icons-material/Lock'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

type PasswordInputPropsType = {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    name: string
    placeholder?: string
}

const PasswordInput = ({
    value,
    onChange,
    name,
    placeholder,
    ...props
}: PasswordInputPropsType) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword)
    }

    return (
        <Input
            type={showPassword ? 'text' : 'password'}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            startDecorator={<LockIcon />}
            endDecorator={
                <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            }
        />
    )
}

export default PasswordInput
