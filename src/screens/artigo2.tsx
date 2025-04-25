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
import { Image } from "expo-image";
import { Header } from "../components/header";
import { SafeAreaView } from "react-native-safe-area-context";

type Artigo1ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Artigo1"
>;

export function Article2Screen({
	navigation,
}: { navigation: Artigo1ScreenNavigationProp }) {
	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} title="Chuva na cidade de São Paulo" />
			<ScrollView style={styles.container}>

				<View style={styles.articleContent}>
					<Text style={styles.articleDate}>Janeiro 2025</Text>

					<Text style={styles.articleText}>
						Na quarta-feira, 29 de janeiro, São Paulo entrou em estado de atenção
						para alagamentos devido às chuvas que atingem a capital desde o início
						da manhã. O alerta foi decretado às 10h55 pela Defesa Civil e
						permanece ativo.
					</Text>

					<Image
						source={require("../../assets/chuva_sp.jpg")}
						style={styles.articleImage}
					/>

					<Text style={styles.articleText}>
						Segundo o CGE, as chuvas, originadas no interior, seguem de forma
						isolada, com maior intensidade nas zonas sudeste e parte da zona sul
						da cidade. Até o momento, não foram registradas ocorrências graves,
						mas há risco de transbordamentos, ventos fortes e quedas de árvores.
					</Text>

					<Text style={styles.articleText}>
						A previsão é de que o tempo continue instável nas próximas horas, com
						chuvas lentas e potencial para novos alagamentos.
					</Text>

					<TouchableOpacity
						style={styles.articleButton}
						onPress={() =>
							Linking.openURL(
								"https://agenciabrasil.ebc.com.br/geral/noticia/2025-01/chuvas-deixam-cidade-de-sp-em-estado-de-atencao-para-alagamentos",
							)
						}
					>
						<Text style={styles.articleButtonText}>Leia o artigo completo</Text>
					</TouchableOpacity>

					<Text style={styles.articleSource}>Fonte: Agência Brasil - 2025</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	articleImage: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},
	articleContent: {
		padding: 20,
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
