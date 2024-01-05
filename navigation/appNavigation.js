import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../src/screens/HomeScreen'
import SearchScreen from '../src/screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MovieScreen from '../src/screens/MovieScreen';
import FavouritesScreen from '../src/screens/FavouritesScreen';
import { fontScale } from 'nativewind';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'gray',
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

        tabBarIcon: ({focused, color}) => (
          <Ionicons name="home-outline" size={30} color={focused ? ("gray") : ("#f1f5f9")} />
        ), 
      }} />

      <Tab.Screen name='Search' component={SearchScreen} options={{
        tabBarLabel: 'Search', tabBarLabelStyle: {fontSize: 13, marginTop: 5, left: 3},

        tabBarIcon: ({ focused, color }) => (
          <Ionicons name="search-outline" size={30} color={focused ? ("gray") : ("#f1f5f9")} />
        ),
      }} />

      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{
        tabBarLabel: 'Favourites', tabBarLabelStyle: {fontSize: 13, marginTop: 5, left: 1},

        tabBarIcon: ({focused, color}) => (
          <Ionicons name="heart-outline" size={30} color={focused ? ("gray") : ("#f1f5f9")} />
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