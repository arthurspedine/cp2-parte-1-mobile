import { NativeStackNavigationProp } from "@react-navigation/native-stack"
// @ts-ignore
import { Ionicons } from "react-native-vector-icons"
import { RootStackParamList } from "../routes"

type ReturnButtonProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, any>
}

export function ReturnButton({navigation}: ReturnButtonProps) {
    return (
        <Ionicons
        name="chevron-back"
        size={40}
        color="black"
        onPress={() => navigation.goBack()}
        />
    )
}