import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type { RootStackParamList } from "../routes";
// @ts-ignore
import { Image } from "expo-image";
import { Header } from "../components/header";

type Artigo1ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Artigo1"
>;

export function Article1Screen({
	navigation,
}: { navigation: Artigo1ScreenNavigationProp }) {
	return (
		<ScrollView style={styles.container}>
			<Header navigation={navigation} title="Enchente no Rio Grande do Sul" />

			<View style={styles.articleContent}>
				<Text style={styles.articleDate}>Junho 2024</Text>

				<Text style={styles.articleText}>
					A calamidade no Rio Grande do Sul, causada por intensas chuvas entre o
					final de abril e maio de 2024, deixou mais de 616 mil pessoas fora de
					suas casas. As enchentes provocaram 172 mortes e 42 desaparecidos. O
					estado registrou um total de 2,39 milhões de pessoas afetadas
					diretamente, o que representa quase 22% da população do estado. Além
					disso, os níveis dos rios, como o Guaíba, continuam a subir,
					impactando ainda mais a infraestrutura e a vida das pessoas.
				</Text>

				<Image
					source={require("../../assets/enchente_rs.jpg")}
					style={styles.articleImage}
				/>

				<Text style={styles.articleSubtitle}>Situação Atual</Text>

				<Text style={styles.articleText}>
					Até agora, mais de 77 mil pessoas foram resgatadas, junto com 12,5 mil
					animais. O nível dos rios como o Guaíba e a Lagoa dos Patos continua
					preocupando, com algumas áreas ainda alagadas. A situação é crítica,
					mas há uma tendência de queda dos níveis de alguns rios, como o Rio
					dos Sinos e o Taquari.
				</Text>

				<TouchableOpacity
					style={styles.articleButton}
					onPress={() =>
						Linking.openURL(
							"https://agenciabrasil.ebc.com.br/geral/noticia/2024-06/rio-grande-do-sul-tem-616-mil-pessoas-fora-de-casa-pela-calamidade",
						)
					}
				>
					<Text style={styles.articleButtonText}>Leia o artigo completo</Text>
				</TouchableOpacity>

				<Text style={styles.articleSource}>Fonte: Agência Brasil – 2024</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	articleContent: {
		padding: 20,
	},
	articleImage: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},
	articleDate: {
		fontSize: 14,
		color: "#888",
		marginBottom: 15,
	},
	articleText: {
		fontSize: 16,
		color: "#333",
		lineHeight: 24,
		marginBottom: 15,
	},
	articleSubtitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginTop: 10,
		marginBottom: 15,
	},
	articleButton: {
		backgroundColor: "#0066CC",
		padding: 15,
		borderRadius: 10,
		width: "48%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},
	articleButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
	articleSource: {
		marginTop: 20,
		fontSize: 14,
		color: "#888",
		textAlign: "center",
	},
});
