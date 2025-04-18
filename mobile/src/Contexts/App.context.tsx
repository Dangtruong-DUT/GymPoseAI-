import { createContext, useState } from 'react'
import { User } from '@/types/user.type'
import storage from '@/utils/StorageManager.util'
interface AppContextInterface {
    isAuthenticated: boolean
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(storage.getRefreshToken()),
    setAuthenticated: () => null,
    profile: storage.getProfile(),
    setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                setProfile,
                profile
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
