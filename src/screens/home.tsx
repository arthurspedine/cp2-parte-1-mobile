import { View, Text, StyleSheet } from 'react-native';
 
export function HomeScreen() {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Tela principal</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       padding: 20
   },
   title: {
       fontSize: 24,
       fontWeight: 'bold'
   }
})