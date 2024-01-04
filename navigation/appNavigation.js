import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../src/screens/HomeScreen'
import SearchScreen from '../src/screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MovieScreen from '../src/screens/MovieScreen';
import FavouritesScreen from '../src/screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: 'lightgrey',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Home',

        tabBarIcon: () => (
          <Ionicons name="home-outline" color={'black'} size={30} />
        ),
      }} />

      <Tab.Screen name='Search' component={SearchScreen} options={{
        tabBarLabel: 'Search',

        tabBarIcon: () => (
          <Ionicons name="search-outline" size={30} color="black" />
        ),
      }} />

      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{
        tabBarLabel: 'Favourites',

        tabBarIcon: () => (
          <Ionicons name="heart-outline" size={30} color="black" />
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