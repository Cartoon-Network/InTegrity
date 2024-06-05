import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = useRef(new Animated.Value(0)).current;
  const mainContentMargin = useRef(new Animated.Value(0)).current;

  const toggleSidebar = () => {
    const newWidth = isSidebarOpen ? 0 : 250;
    const newMargin = isSidebarOpen ? 0 : 250;
    Animated.parallel([
      Animated.timing(sidebarWidth, {
        toValue: newWidth,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(mainContentMargin, {
        toValue: newMargin,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <FontAwesome5 name={isSidebarOpen ? "times" : "bars"} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <Animated.View style={[styles.sidebar, { width: sidebarWidth }]}>
        {isSidebarOpen && (
          <View style={styles.sidebarContent}>
            <View style={styles.sidebarHeader}>
              <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}} style={styles.profileImage} />
              <Text style={styles.profileName}>Jacob Jones</Text>
            </View>
            <SidebarItem icon={require('./assets/grafic.png')} text="Dashboard" />
            <SidebarItem icon={require('./assets/over.png')} text="Overview" />
            <SidebarItem icon={require('./assets/chat.png')} text="Chat" />
            <SidebarItem icon={require('./assets/team.png')} text="Team" />
            
          </View>
        )}
      </Animated.View>
      <Animated.View style={[styles.mainContent, { marginLeft: mainContentMargin }]}>
        <ScrollView>
          <Text style={styles.greeting}>Hello Jacob</Text>
          <Text style={styles.date}>October 26</Text>
          <View style={styles.row}>
            <Widget name="Jane Cooper" amount="$3490.00" tasks="3 from 6 tasks completed" positive />
            <Widget name="Savannah Nguyen" amount="-$590.00" tasks="3 from 6 tasks completed" />
            <Widget name="Bessie Cooper" amount="$2600.00" tasks="1 from 6 tasks completed" positive />
          </View>
          <View style={styles.row}>
            <SummaryWidget />
            <CountriesWidget />
          </View>
          <View style={styles.row}>
            <SegmentationWidget />
            <SatisfactionWidget />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>No components created yet</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add component</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const SidebarItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.sidebarItem}>
    <Image source={icon} style={styles.sidebarIcon} />
    <Text style={styles.sidebarText}>{text}</Text>
  </TouchableOpacity>
);

const Widget = ({ name, amount, tasks, positive }) => (
  <View style={[styles.widget, positive ? styles.positive : styles.negative]}>
    <Text style={styles.widgetName}>{name}</Text>
    <Text style={styles.widgetAmount}>{amount}</Text>
    <Text style={styles.widgetTasks}>{tasks}</Text>
  </View>
);

const SummaryWidget = () => {
  const data = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [2000, 2500, 1800, 2200, 2900, 2700, 3200, 3100, 2800],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Revenue"] // optional
  };

  return (
    <View style={styles.summaryWidget}>
      <Text style={styles.widgetTitle}>Your work summary</Text>
      <LineChart
        data={data}
        width={screenWidth * 0.9}
        height={220}
        chartConfig={{
          backgroundColor: '#333',
          backgroundGradientFrom: '#333',
          backgroundGradientTo: '#333',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const CountriesWidget = () => (
  <View style={styles.countriesWidget}>
    <Text style={styles.widgetTitle}>Top countries</Text>
    {/* Render country data here */}
    <Text style={styles.countryText}>USA - $21942.83</Text>
    <Text style={styles.countryText}>Ireland - $19710.00</Text>
    <Text style={styles.countryText}>Ukraine - $12320.30</Text>
    <Text style={styles.countryText}>Sweden - $9725.00</Text>
  </View>
);

const SegmentationWidget = () => (
  <View style={styles.segmentationWidget}>
    <Text style={styles.widgetTitle}>Segmentation</Text>
    {/* Render segmentation data here */}
    <Text style={styles.segmentationText}>Male: 441</Text>
    <Text style={styles.segmentationText}>Female: 233</Text>
    <Text style={styles.segmentationText}>Other: 126</Text>
  </View>
);

const SatisfactionWidget = () => (
  <View style={styles.satisfactionWidget}>
    <Text style={styles.widgetTitle}>Satisfaction rate</Text>
    {/* Render satisfaction data here */}
    <View style={styles.satisfactionPlaceholder}>
      <Text style={styles.satisfactionText}>98.64%</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2E2E2E',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#2E2E2E',
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  sidebarContent: {
    marginTop: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  sidebarText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    color: 'white',
    fontSize: 24,
  },
  date: {
    color: 'grey',
    fontSize: 18,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  widget: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  positive: {
    borderColor: 'green',
    borderWidth: 1,
  },
  negative: {
    borderColor: 'red',
    borderWidth: 1,
  },
  widgetName: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  widgetAmount: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  widgetTasks: {
    color: 'grey',
    fontSize: 14,
  },
  summaryWidget: {
    flex: 2,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  widgetTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  countriesWidget: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  countryText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
  },
  segmentationWidget: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  segmentationText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
  },
  satisfactionWidget: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  satisfactionPlaceholder: {
    backgroundColor: '#444',
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  satisfactionText: {
    color: 'white',
    fontSize: 24,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'grey',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#E53935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
