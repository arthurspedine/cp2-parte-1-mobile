import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import type { RootStackParamList } from "../routes";
import { useState } from "react";
// @ts-ignore
import { Ionicons } from "react-native-vector-icons";
import type { OpenMeteoResponse, ViaCepResponse } from "../types";
import { Image } from "expo-image";

type MainScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"MainTab"
>;

export function HomeScreen({
	navigation,
}: { navigation: MainScreenNavigationProp }) {
	const [cep, setCep] = useState("");
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState<ViaCepResponse | null>(null);
	const [weatherData, setWeatherData] = useState<OpenMeteoResponse | null>(
		null,
	);
	const [floodRisk, setFloodRisk] = useState<string | null>(null);

	const searchCEP = async () => {
		if (cep.length !== 8) return;
		const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		const cepData: ViaCepResponse = await cepResponse.json();

		if (cepData.erro) {
			Alert.alert("CEP não encontrado", "O CEP informado não foi encontrado");
			setLoading(false);
			return;
		}

		setAddress(cepData);
		setLoading(true);
		try {
			const locationResponse = await fetch(
				`https://nominatim.openstreetmap.org/search?city=${cepData.localidade}&state=${cepData.uf}&country=Brasil&format=json`,
				{ headers: { "User-Agent": "MeuAppAlagamento/1.0" } },
			);
			const locationData = await locationResponse.json();

			if (!locationData || locationData.length === 0) {
				Alert.alert("Erro", "Não foi possível localizar a cidade no mapa.");
				setLoading(false);
				return;
			}

			const { lat, lon } = locationData[0];

			const weatherResponse = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=precipitation,temperature_2m,relative_humidity_2m,rain,weather_code&daily=precipitation_sum`,
			);

			const weather: OpenMeteoResponse = await weatherResponse.json();
			console.log(weather);
			setWeatherData(weather);

			evaluateFloodRisk(weather);
		} catch (error) {
			Alert.alert("Erro", "Ocorreu um erro ao buscar os dados");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const evaluateFloodRisk = (weather: OpenMeteoResponse) => {
		if (!weather || !weather.current) {
			setFloodRisk("Dados meteorológicos indisponíveis");
			return;
		}

		const dailyPrecipitationSum =
			weather.daily.precipitation_sum &&
			weather.daily.precipitation_sum.length > 0
				? weather.daily.precipitation_sum[0]
				: 0;

		const currentPrecipitation = weather.current.precipitation || 0;
		const currentRain = weather.current.rain || 0;

		if (currentPrecipitation > 10 || currentRain > 10) {
			setFloodRisk(
				"Alto risco de alagamento! Precipitação intensa registrada.",
			);
		} else if (currentPrecipitation > 5 || currentRain > 5) {
			setFloodRisk("Risco moderado de alagamento. Fique atento.");
		} else if (currentPrecipitation > 0 || currentRain > 0) {
			setFloodRisk("Baixo risco de alagamento, mas há precipitação.");
		} else if (dailyPrecipitationSum > 20) {
			setFloodRisk("Risco moderado. Volume alto de chuva previsto para hoje.");
		} else {
			setFloodRisk(
				"Sem risco de alagamento. Não há previsão de chuva significativa.",
			);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Alerta Enchentes</Text>
				<Text style={styles.subtitle}>
					Prevenção e monitoramento de alagamentos no Brasil
				</Text>
			</View>

			<View style={styles.infoBox}>
				<Text style={styles.infoTitle}>
					O problema dos alagamentos no Brasil
				</Text>
				<Text style={styles.infoText}>
					O Brasil é constantemente afetado por desastres de alagamentos e
					enchentes, especialmente durante a temporada de chuvas. Esses eventos
					não apenas causam danos materiais, mas também ameaçam a segurança e a
					saúde das pessoas. Entre as principais causas, destacam-se a
					urbanização desordenada, sistemas de drenagem ineficazes e as mudanças
					climáticas, que intensificam o risco de calamidades.
				</Text>
				<Text style={styles.infoText}>
					Anualmente, milhões de brasileiros são afetados por estas catástrofes,
					resultando em perdas materiais, problemas de saúde pública e, em casos
					mais graves, perda de vidas humanas.
				</Text>
			</View>

			<View style={styles.articleButtons}>
				<TouchableOpacity
					style={styles.articleButton}
					onPress={() => navigation.navigate("Artigo1")}
				>
					<Image
						source={require("../../assets/enchente_rs.jpg")}
						style={styles.articleImage}
					/>
					<Text style={styles.articleButtonText}>
						Rio Grande do Sul tem 616 mil pessoas fora de casa pela calamidade
					</Text>
					<Text style={styles.articleButtonSubtext}>Junho 2024</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.articleButton}
					onPress={() => navigation.navigate("Artigo2")}
				>
					<Image
						source={require("../../assets/chuva_sp.jpg")}
						style={styles.articleImage}
					/>
					<Text style={styles.articleButtonText}>
						Chuvas deixam cidade de SP em estado de atenção para alagamentos
					</Text>
					<Text style={styles.articleButtonSubtext}>Janeiro 2025</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.searchSection}>
				<Text style={styles.searchTitle}>
					Consulte o risco de alagamento na sua região
				</Text>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Digite seu CEP (somente números)"
						keyboardType="numeric"
						value={cep}
						onChangeText={setCep}
						maxLength={8}
					/>
					<TouchableOpacity
						style={styles.searchButton}
						onPress={searchCEP}
						disabled={loading}
					>
						<Ionicons name="search" size={24} color="white" />
					</TouchableOpacity>
				</View>

				{loading && (
					<ActivityIndicator
						size="large"
						color="#0066CC"
						style={styles.loader}
					/>
				)}

				{address && weatherData && (
					<View style={styles.resultContainer}>
						<Text style={styles.locationTitle}>
							{address.logradouro}, {address.bairro}
						</Text>
						<Text style={styles.locationSubtitle}>
							{address.localidade} - {address.uf}
						</Text>

						<View style={styles.weatherContainer}>
							<View style={styles.weatherInfo}>
								<Text style={styles.weatherTemp}>
									{Math.round(weatherData.current.temperature_2m)}°C
								</Text>
								<Text style={styles.weatherDetails}>
									Umidade: {weatherData.current.relative_humidity_2m}%
								</Text>
								<Text style={styles.weatherDetails}>
									Precipitação: {weatherData.current.precipitation || 0}mm
								</Text>
								{weatherData.current.rain > 0 && (
									<Text style={styles.weatherDetails}>
										Chuva: {weatherData.current.rain}mm
									</Text>
								)}
							</View>

							<View style={styles.weatherIconContainer}>
								<Ionicons
									name={
										weatherData.current.precipitation > 0 ||
										weatherData.current.rain > 0
											? "rainy"
											: "sunny"
									}
									size={60}
									color="#0066CC"
								/>
							</View>
						</View>

						<View
							style={[
								styles.riskContainer,
								floodRisk?.includes("Alto")
									? styles.highRisk
									: floodRisk?.includes("moderado")
										? styles.mediumRisk
										: styles.lowRisk,
							]}
						>
							<Text style={styles.riskText}>{floodRisk}</Text>
						</View>
					</View>
				)}
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					Mande sua mensagem agora para o nosso suporte
				</Text>
				<TouchableOpacity
					style={styles.footerButton}
					onPress={() => navigation.navigate("SuporteTab")}
				>
					<Text style={{ color: "#fff" }}>Clique aqui</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	header: {
		padding: 20,
		backgroundColor: "#0066CC",
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "white",
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 16,
		color: "white",
		textAlign: "center",
	},
	infoBox: {
		backgroundColor: "white",
		margin: 15,
		padding: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	infoTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
		color: "#333",
	},
	infoText: {
		fontSize: 15,
		color: "#444",
		lineHeight: 22,
		marginBottom: 10,
	},
	articleButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15,
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
		marginBottom: 5,
	},
	articleButtonSubtext: {
		color: "white",
		fontSize: 14,
	},
	searchSection: {
		backgroundColor: "white",
		margin: 15,
		padding: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	searchTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		color: "#333",
		textAlign: "center",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	input: {
		flex: 1,
		height: 50,
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 10,
		paddingHorizontal: 15,
		fontSize: 16,
		backgroundColor: "#F9F9F9",
	},
	searchButton: {
		backgroundColor: "#0066CC",
		height: 50,
		width: 50,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 10,
	},
	loader: {
		marginVertical: 20,
	},
	resultContainer: {
		backgroundColor: "#F0F8FF",
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#E0E0E0",
	},
	locationTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 5,
	},
	locationSubtitle: {
		fontSize: 16,
		color: "#666",
		marginBottom: 15,
	},
	weatherContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	weatherInfo: {
		flex: 1,
	},
	weatherTemp: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#333",
	},
	weatherDetails: {
		fontSize: 14,
		color: "#777",
		marginBottom: 2,
	},
	weatherIconContainer: {
		width: 80,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
	},
	weatherIcon: {
		width: 100,
		height: 100,
	},
	riskContainer: {
		padding: 15,
		borderRadius: 10,
		marginTop: 10,
	},
	highRisk: {
		backgroundColor: "#FFEBEE",
		borderWidth: 1,
		borderColor: "#FFCDD2",
	},
	mediumRisk: {
		backgroundColor: "#FFF8E1",
		borderWidth: 1,
		borderColor: "#FFECB3",
	},
	lowRisk: {
		backgroundColor: "#E8F5E9",
		borderWidth: 1,
		borderColor: "#C8E6C9",
	},
	riskText: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	articleImage: {
		width: "100%",
		height: 100,
		borderRadius: 10,
		marginBottom: 10,
	},
	footer: {
		padding: 15,
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20,
	},
	footerText: {
		fontSize: 12,
		color: "#777",
		textAlign: "center",
		marginBottom: 5,
	},
	footerButton: {
		backgroundColor: "#0066cc",
		height: 28,
		width: 90,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
