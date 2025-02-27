import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'
import registerIcon from '@/src/assets/Icons/registerIcon.svg'
import MessageIcon from '@/src/assets/Icons/Message.svg'
import LockIcon from '@/src/assets/Icons/Lock.svg'
import LoginIcon from '@/src/assets/Icons/Login.svg'
import ProfileIcon from '@/src/assets/Icons/Profile.svg'
import WelcomeIcon from '@/src/assets/Icons/Welcome.svg'
import weightScaleIcon from '@/src/assets/Icons/weight-scale 1.svg'
import ArrowRightIcon from '@/src/assets/Icons/Arrow - Right 2.svg'
import SwapIcon from '@/src/assets/Icons/Swap.svg'
import CalendarIcon from '@/src/assets/Icons/Calendar.svg'
import TwoUserIcon from '@/src/assets/Icons/2 User.svg'
import ArrowDown from '@/src/assets/Icons/Arrow - Down 2.svg'
import movement1 from '@/src/assets/Icons/movement1.svg'
import movement2 from '@/src/assets/Icons/movement2.svg'
import movement3 from '@/src/assets/Icons/movement3.svg'
import FitnessX from '@/src/assets/Icons/FitnessX.svg'
import logoX from '@/src/assets/Icons/X.svg'
import homeIcon from '@/src/assets/Icons/Home.svg'
import cameraIcon from '@/src/assets/Icons/Camera.svg'
import searchIcon from '@/src/assets/Icons/Search.svg'
import activity from '@/src/assets/Icons/Activity.svg'
import ProfileLight from '@/src/assets/Icons/ProfileLight.svg'
import homeIconFilled from '@/src/assets/Icons/HomeFilled.svg'
import cameraIconFilled from '@/src/assets/Icons/CameraFilled.svg'
import activityFilled from '@/src/assets/Icons/ActivityFilled.svg'
import ProfileLightFilled from '@/src/assets/Icons/ProfileFilled.svg'
import dotGradient from '@/src/assets/Icons/Ellipse 63.svg'
export type IconName =
    | 'registerIcon'
    | 'lockIcon'
    | 'messageIcon'
    | 'loginIcon'
    | 'profileIcon'
    | 'welcomeIcon'
    | 'weightScaleIcon'
    | 'arrowRightIcon'
    | 'swapIcon'
    | 'calendarIcon'
    | 'twoUserIcon'
    | 'arrowDown'
    | 'movement1'
    | 'movement2'
    | 'movement3'
    | 'fitnessX'
    | 'logoX'
    | 'homeIcon'
    | 'cameraIcon'
    | 'searchIcon'
    | 'activity'
    | 'profileLight'
    | 'homeIconFilled'
    | 'cameraIconFilled'
    | 'activityFilled'
    | 'profileLightFilled'
    | 'dotGradient'

// Add more icons here...

interface IconProps {
    name: IconName
    size?: number
    width?: number
    fill?: string
    stroke?: string
    [key: string]: any
}

const Icon: React.FC<IconProps> = ({ name, size = 24, width, fill, stroke, ...props }) => {
    const icons: { [key in IconName]: React.ComponentType<SvgProps> } = useMemo(
        () => ({
            registerIcon: registerIcon,
            lockIcon: LockIcon,
            messageIcon: MessageIcon,
            loginIcon: LoginIcon,
            profileIcon: ProfileIcon,
            welcomeIcon: WelcomeIcon,
            weightScaleIcon: weightScaleIcon,
            arrowRightIcon: ArrowRightIcon,
            swapIcon: SwapIcon,
            calendarIcon: CalendarIcon,
            twoUserIcon: TwoUserIcon,
            arrowDown: ArrowDown,
            movement1: movement1,
            movement2: movement2,
            movement3: movement3,
            fitnessX: FitnessX,
            logoX: logoX,
            homeIcon: homeIcon,
            cameraIcon: cameraIcon,
            searchIcon: searchIcon,
            activity: activity,
            profileLight: ProfileLight,
            homeIconFilled: homeIconFilled,
            cameraIconFilled: cameraIconFilled,
            activityFilled: activityFilled,
            profileLightFilled: ProfileLightFilled,
            dotGradient: dotGradient
            // Add more icons here...
        }),
        []
    )

    const SelectedIcon = useMemo(() => icons[name], [name, icons])

    const fillColor = fill ? { fill } : {}
    const strokeColor = stroke ? { stroke: stroke } : {}

    return <SelectedIcon height={size} width={width ? width : size} {...fillColor} {...strokeColor} {...props} />
}

export default Icon
