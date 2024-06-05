import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDimensions } from '@react-native-community/hooks';

const App = () => {
  const { width } = useDimensions().window;

  const isDesktop = width > 1024;
  const isTablet = width <= 1024 && width > 768;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => console.log('Navigate to Dashboard')}>
            <FontAwesome5 name="home" size={24} color="white" />
            <Text style={styles.sidebarText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => console.log('Navigate to Chat')}>
            <FontAwesome5 name="comments" size={24} color="white" />
            <Text style={styles.sidebarText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => console.log('Navigate to Team')}>
            <FontAwesome5 name="users" size={24} color="white" />
            <Text style={styles.sidebarText}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => console.log('Navigate to Tasks')}>
            <FontAwesome5 name="tasks" size={24} color="white" />
            <Text style={styles.sidebarText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => console.log('Navigate to Reports')}>
            <FontAwesome5 name="chart-line" size={24} color="white" />
            <Text style={styles.sidebarText}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => console.log('Navigate to Settings')}>
            <FontAwesome5 name="cogs" size={24} color="white" />
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.greeting}>Hello Jacob</Text>
          <Text style={styles.date}>October 26</Text>
          <View style={styles.dashboard}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Jane Cooper</Text>
              <Text style={styles.cardSubtitle}>3 from 6 tasks completed</Text>
              <Text style={styles.cardValue}>$3490.00</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Savannah Nguyen</Text>
              <Text style={styles.cardSubtitle}>3 from 6 tasks completed</Text>
              <Text style={styles.cardValue}>$590.00</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Bessie Cooper</Text>
              <Text style={styles.cardSubtitle}>1 from 6 tasks completed</Text>
              <Text style={styles.cardValue}>$2600.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#2E2E2E',
    padding: 10,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarText: {
    color: 'white',
    marginLeft: 10,
  },
  mainContent: {
    width: '80%',
    padding: 20,
  },
  greeting: {
    color: 'white',
    fontSize: 24,
  },
  date: {
    color: 'grey',
    fontSize: 18,
  },
  dashboard: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
  },
  cardSubtitle: {
    color: 'grey',
    fontSize: 14,
  },
  cardValue: {
    color: 'lightgreen',
    fontSize: 22,
  },
});

export default App;
