import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DevsScreen } from "../screens/devs";
import { MainTabNavigator } from "./tab.router";
import SuporteScreen from "../screens/suporte";
import { Article1Screen } from "../screens/artigo1";
import { Article2Screen } from "../screens/artigo2";

export type RootStackParamList = {
	MainTab: undefined;
	DesenvolvedoresTab: undefined;
	SuporteTab: undefined;
	Artigo1: undefined;
	Artigo2: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SuporteTab"
					component={SuporteScreen}
					options={{ headerShown: false, title: "Suporte" }}
				/>
				<Stack.Screen
					name="Artigo1"
					component={Article1Screen}
					options={{
						headerShown: false,
						title: "Enchente no Rio Grande do Sul",
					}}
				/>
				<Stack.Screen
					name="Artigo2"
					component={Article2Screen}
					options={{ headerShown: false, title: "Chuvas São Paulo" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
