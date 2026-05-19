import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const useLogout = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate('/', { replace: true })
        }
    })
}