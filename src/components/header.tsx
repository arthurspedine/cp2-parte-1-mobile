import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { ReturnButton } from "./return-button";

type HeaderButtonProps = {
	// biome-ignore lint/suspicious/noExplicitAny: receber qualquer pagina
	navigation: NativeStackNavigationProp<RootStackParamList, any>;
	title: string;
};

export function Header({ navigation, title }: HeaderButtonProps) {
	return (
		<View style={styles.container}>
			<ReturnButton navigation={navigation} />
			<Text style={styles.title}>{title}</Text>
			<Image
				source={require("../../assets/adaptive-icon.png")}
				style={{ width: 24, height: 24 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "#EEE",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 10,
		flex: 1,
	},
});
