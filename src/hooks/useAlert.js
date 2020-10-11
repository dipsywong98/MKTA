import { useContext } from 'react'
import { AlertContext } from '../components/common/AlertContext'

export const useAlert = () => useContext(AlertContext)
