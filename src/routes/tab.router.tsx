import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { HomeScreen } from "../screens/home";
import { DevsScreen } from "../screens/devs";

type TabParamList = {
    Home: undefined
    Devs: undefined
}

const Tab = createBottomTabNavigator<TabParamList>();

export function MainTabNavigator() {
    return (
        <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-filled';
          } else {
            iconName = focused ? 'people' : 'people-outline';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Devs" component={DevsScreen} />
    </Tab.Navigator>
    )
}