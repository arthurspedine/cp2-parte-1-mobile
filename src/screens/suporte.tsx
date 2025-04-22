'use client'

import { Image } from "expo-image";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { RootStackParamList } from "../routes";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReturnButton } from "../components/return-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

type ResultScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"SuporteTab"
>;

export default function SuportePage({
	navigation,
}: { navigation: ResultScreenNavigationProp }) {

	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [mensagem, setMensagem] = useState("");
	const enviarMensagem = () => {
		Alert.alert(
			'Mensagem enviada!',
			`Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
			[
			  { text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false }
		  );
	}
	
	return (
		<SafeAreaView>
			<ReturnButton navigation={navigation} />
			<Text style={styles.titulo}>Suporte</Text>
			<View style={styles.form}>
				<View style={{width: 290, flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
					<Image 
						source={require("../../assets/customer-support.png")} 
						style={styles.img}
					/>
					<Text style={styles.txtForm}>Entre em contato</Text>
					<Image 
						source={require("../../assets/support.png")} 
						style={styles.img}
					/>
				</View>
				<TextInput
					placeholder='Nome'
					style={styles.input}
					value={nome}
					onChangeText={(value)=>setNome(value)}
				/>
				<TextInput
					placeholder="E-mail"
					style={styles.input}
					value={email}
					onChangeText={(value)=>setEmail(value)}
				/>
				<TextInput
					placeholder="Mensagem"
					style={styles.inputMaior}
					multiline={true}
					value={mensagem}
					onChangeText={(value)=>setMensagem(value)}
				/>
				<TouchableOpacity style={styles.btn} onPress={enviarMensagem}>
					<Text>Enviar</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	titulo: {
		fontWeight: "bold",
		fontSize: 28,
		textAlign: 'center',
		marginBottom: 50
	},
	form: {
		justifyContent: "center",
		alignItems: "center"
	},
	txtForm: {
		fontSize: 22
	},
	input: {
		borderWidth: 1,
		width: 300,
		height: 50,
		borderRadius: 15,
		paddingLeft: 10,
		marginTop: 10
	},
	inputMaior: {
		borderWidth: 1,
		width: 300,
		height: 200,
		borderRadius: 15,
		paddingLeft: 10,
		marginTop: 10,
		justifyContent: "flex-start",
		textAlignVertical: "top"
	},
	btn: {
		borderWidth: 1,
		backgroundColor: "lightblue",
		width: 300,
		marginTop: 30,
		borderRadius: 15,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		color: "black"
	},
	img: {
		width: 40,
		height: 40
	}
});
