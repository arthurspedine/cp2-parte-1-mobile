import { StyleSheet, Text, View } from "react-native";

export function DevsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Desenvolvedores</Text>
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
		marginBottom: 20,
	},
});
