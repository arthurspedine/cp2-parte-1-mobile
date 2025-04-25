import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// @ts-ignore
import { Ionicons } from "react-native-vector-icons";
import type { RootStackParamList } from "../routes";
import { StyleSheet, TouchableOpacity } from "react-native";

type ReturnButtonProps = {
	// biome-ignore lint/suspicious/noExplicitAny: receber qualquer pagina
	navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

export function ReturnButton({ navigation }: ReturnButtonProps) {
	return (
		<TouchableOpacity
			style={styles.backButton}
			onPress={() => navigation.goBack()}
		>
			<Ionicons name="arrow-back" size={24} color="#0066CC" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	backButton: {
		padding: 5,
	},
});
