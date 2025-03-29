import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DevsScreen } from "../screens/devs";
import { MainTabNavigator } from "./tab.router";

export type RootStackParamList = {
    MainTab: undefined
    DesenvolvedoresTab: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTab">
                <Stack.Screen 
                    name="MainTab" 
                    component={MainTabNavigator} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="DesenvolvedoresTab" 
                    component={DevsScreen} 
                    options={{ headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}