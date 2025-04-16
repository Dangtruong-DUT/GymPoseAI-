import type { StackScreenProps } from '@react-navigation/stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'

/**
 * Root stack navigator parameter list
 */
export type RootStackParamList = {
    // Authentication screens
    Login: undefined
    CreateAccount: undefined
    CompleteProfile: undefined
    ConfirmYourGoal: undefined
    ForgotPassword: undefined

    // Main app entry points
    Welcome: undefined
    MainTab: undefined

    // Feature-specific screens
    Notification: undefined
    WorkoutHistoryCenter: undefined
    WorkoutHistoryDetail: { workout_id: string }
    CategoryDetail: { category_id: string; exercise_id?: string }
    WorkoutDetail: { workout_id: string }
    ActivityTracker: undefined
    Setting: undefined
    ProfileManager: undefined

    // Common information screens
    ContactUs: undefined
    PrivacyPolicy: undefined
}

/**
 * Bottom tab navigator parameter list
 */
export type MainTabParamList = {
    Home: undefined
    WorkoutTracker: undefined
    Search: undefined
    StoryTaker: undefined
    Profile: undefined
}

/**
 * Props for screens in the root stack navigator
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>

/**
 * Props for screens in the main tab navigator, composed with root stack props
 */
export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>

/**
 * Extending the global ReactNavigation namespace for type safety with useNavigation and related hooks
 */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
