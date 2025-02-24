import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/src/hooks/useThemeColor'
import { TextGradient } from '@/src/components/TextGradient'
import { useNavigation } from '@react-navigation/native'
import { GradientButton } from '@/src/components/GradientButton'
import { Icon as MyIcon } from '@/src/components/Icon'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WelcomeScreen() {
    const backgroundColor = useThemeColor({}, 'background') as string
    const textColor = useThemeColor({}, 'text') as string
    const navigation = useNavigation()

    return (
    <KeyboardAvoidingView style= {{flex: 1}}>
        <SafeAreaView style={{flex: 1,height: SCREEN_HEIGHT}}>
                <View style={[styles.container]}>
                  <View style={styles.topWrapper}>
                    <MyIcon name='welcomeIcon' size={277} style={styles.banner} />
                        <View style={styles.textWrapper}>
                        <Text style={styles.heading}>Welcome, Stefani</Text>
                        <Text style={[styles.desc, { color: textColor }]}>You are all set now, let’s reach your goals together with us</Text>
                      </View>
                  </View>
          <GradientButton style= {styles.btn} >
            <Text style={styles.textInnerBtn}> Go To Home</Text>
          </GradientButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topWrapper: {
      marginTop: 102,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textWrapper: {
      marginTop: 44,
        alignItems: 'center',
        maxWidth:214,
    },
    heading: {
       fontSize:20,
       fontWeight: '700',
       lineHeight :30
    },
    desc: {
      marginTop: 5,
      fontSize: 12,
       fontWeight: '400',
       lineHeight : 20,
      textAlign: 'center'
    },
    btn: {
      width: SCREEN_WIDTH*0.9,
      marginBottom:20
    },
    textInnerBtn: {
      color: '#FFF',
      fontWeight:'700',
      fontSize: 16
    },
    banner: {
      width: 375,
      height: 350,
      flexShrink: 0
  },
})
