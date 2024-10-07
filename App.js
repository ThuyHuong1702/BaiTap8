import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello 👋</Text>
      <Text style={styles.userName}>Thuy Huong Do</Text>

      <Text style={styles.insightsTitle}>Your Insights</Text>
      <View style={styles.insightsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan-outline" size={50} color="purple" />
          <Text style={styles.cardTitle}>Scan New</Text>
          <Text style={styles.cardSubtitle}>Scanned 483</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="alert-circle" size={50} color="orange" />
          <Text style={styles.cardTitle}>Counterfeits</Text>
          <Text style={styles.cardSubtitle}>Counterfeited 32</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="checkmark-circle" size={50} color="green" />
          <Text style={styles.cardTitle}>Success</Text>
          <Text style={styles.cardSubtitle}>Checkouts 8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="clipboard" size={50} color="blue" />
          <Text style={styles.cardTitle}>Directory</Text>
          <Text style={styles.cardSubtitle}>History 26</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Notify')}>
          <Ionicons name="notifications" size={50} color="orange" />
          <Text style={styles.cardTitle}>Notify</Text>
          <Text style={styles.cardSubtitle}>Check Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={50} color="blue" />
          <Text style={styles.cardTitle}>Settings</Text>
          <Text style={styles.cardSubtitle}>Configure App</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.exploreMore}>Explore More</Text>
    </View>
  );
}

function NotifyScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>Notify Screen!</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>Settings Screen!</Text>
    </View>
  );
}

function ScanScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('./assets/scan_image.png')} 
        style={styles.scanImage} 
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: true }}>
      <HomeStack.Screen
        name="HomePage"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('User Profile')}>
              <Image
                source={require('./assets/avarta.jpg')} 
                style={styles.userAvatar}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen 
        name="Notify" 
        component={NotifyScreen} 
      />
      <HomeStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Notify':
                iconName = 'notifications';
                break;
              case 'Settings':
                iconName = focused 
                  ? require('./assets/setting_orange.png') 
                  : require('./assets/settings.png');
                return <Image style={styles.image} source={iconName} />;
              case 'Scan':
                iconName = 'scan-outline'; 
                break;
              default:
                iconName = 'home'; 
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="HomePage" component={HomeStackScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Notify" component={NotifyScreen} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, 
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    color: 'gray',
  },
  insightsTitle: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    elevation: 2,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  exploreMore: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  scanImage: {
    width: '100%',  
    height: '100%', 
    resizeMode: 'contain',  
    marginTop: 40,
  },
});
