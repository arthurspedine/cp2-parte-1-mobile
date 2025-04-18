import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button } from "react-native";
import type { RootStackParamList } from "../routes";

type MainScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"MainTab"
>;

export function HomeScreen({
	navigation,
}: { navigation: MainScreenNavigationProp }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tela principal</Text>
			<Button
				title="Suporte"
				onPress={() => navigation.navigate("SuporteTab")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
