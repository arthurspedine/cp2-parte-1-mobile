import { Button, StyleSheet, Text, View } from "react-native";
import type { RootStackParamList } from "../routes";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ResultScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"SuporteTab"
>;

export default function SuportePage({
	navigation,
}: { navigation: ResultScreenNavigationProp }) {
	return (
		<View>
			<Text>Suporte</Text>
			<Button title="Voltar" onPress={() => navigation.navigate("MainTab")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingVertical: 32,
		paddingHorizontal: 10,
		gap: 12,
	},
});
