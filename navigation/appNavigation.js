import HomeScreen from '../src/screens/HomeScreen'
import SearchScreen from '../src/screens/SearchScreen';
import MovieScreen from '../src/screens/MovieScreen';
import TopScreen from '../src/screens/TopScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0284c7',
        tabBarInactiveTintColor: '#f1f5f9',
        tabBarActiveBackgroundColor: 'rgba(17, 18, 16, .1)',
        headerShown: false,
        tabBarStyle:{
          backgroundColor: "rgba(17, 18, 16, 1)",
          borderBlockColor: "rgba(17, 18, 16, 1)",
        },
        
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Home', tabBarLabelStyle: {fontSize: 13, marginTop: 5, left: 1},

        tabBarIcon: ({ focused }) => (
          <Ionicons name="home-outline" size={30} color={focused ? ("#0284c7") : ("#f1f5f9")} />
        ), 
      }} />

      <Tab.Screen name='Search' component={SearchScreen} options={{
        tabBarLabel: 'Search', tabBarLabelStyle: {fontSize: 13, marginTop: 5, left: 3},

        tabBarIcon: ({ focused }) => (
          <Ionicons name="search-outline" size={30} color={focused ? ("#0284c7") : ("#f1f5f9")} />
        ),
      }} />

      <Tab.Screen name="Top" component={TopScreen} options={{
        tabBarLabel: 'Best Movies', tabBarLabelStyle: {fontSize: 13, marginTop: 5, left: 1},

        tabBarIcon: ({ focused }) => (
          <Ionicons name="medal-outline" size={30} color={focused ? ("#0284c7") : ("#f1f5f9")} />
        ),
      }} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name='Movie' component={MovieScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}