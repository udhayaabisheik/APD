import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the type for the route parameters
type RootStackParamList = {
  LoginScreen: undefined;
  SupportScreen: undefined;
  UserAccountScreen: { id: string; name: string; email: string }; // Define the expected parameters
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// Now, define the component
export default function UserAccountScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<any>(); // Explicitly typing route as any

  // Check and destructure the params correctly
  const { id, name, email } = route.params || {}; // Default to an empty object if params are undefined

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSupport = () => {
    navigation.navigate('SupportScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Icon
            name="account-circle"
            size={120} // Reduced size
            color="#6A1B9A"
            style={styles.profileImage}
          />
        </View>

        {/* Title Section */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>
            My Account
          </ThemedText>
        </ThemedView>

        {/* User Information Section */}
        <View style={styles.userInfoContainer}>
          <ThemedText style={styles.userName}>{name || 'Name not available'}</ThemedText>
          <ThemedText style={styles.userEmail}>{email || 'Email not available'}</ThemedText>
        </View>

        {/* Account Options Section */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleSupport}>
            <Icon name="help-circle-outline" size={24} color="#4A148C" />
            <ThemedText style={styles.optionButtonText}>Support</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  userEmail: {
    fontSize: 16,
    color: '#6A1B9A',
  },
  optionsContainer: {
    width: '90%',
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4A148C',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '90%',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
