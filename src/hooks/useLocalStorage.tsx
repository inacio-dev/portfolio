'use client'

import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, fallbackValue: T) {
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

  const [value, setValue] = useState(() => {
    if (isLocalStorageAvailable) {
      try {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : fallbackValue
      } catch (error) {
        console.error(`Error parsing value for key '${key}' from Local Storage:`, error)
      }
    }
    return fallbackValue
  })

  useEffect(() => {
    if (isLocalStorageAvailable) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key && e.newValue !== null) {
          try {
            const newValue = JSON.parse(e.newValue)
            setValue(newValue)
          } catch (error) {
            console.error(`Error parsing updated value for key '${key}' from Local Storage:`, error)
          }
        }
      }

      // Adicionar ouvinte de evento de mudança de armazenamento
      window.addEventListener('storage', handleStorageChange)

      return () => {
        // Remover o ouvinte de evento ao desmontar o componente
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [key, isLocalStorageAvailable])

  const setSharedValue = (newValue: T) => {
    if (isLocalStorageAvailable) {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
        // Notificar outros componentes quando o valor for atualizado
        window.dispatchEvent(
          new StorageEvent('storage', { key, newValue: JSON.stringify(newValue) }),
        )
      } catch (error) {
        console.error(`Error saving value for key '${key}' to Local Storage:`, error)
      }
    }
  }

  return [value, setSharedValue] as const
}
