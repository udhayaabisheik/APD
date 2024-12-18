import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the route parameters
type RootStackParamList = {
  LoginScreen: undefined;
  EditProfileScreen: {
    id: string;
    name: string;
    email: string;
    mobileno: string;
  };
  SupportScreen: undefined;
  UserAccountScreen: {
    id: string;
    name: string;
    email: string;
    mobileno: string;
  };
  NotificationScreen: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function UserAccountScreen() {
  const navigation = useNavigation<NavigationProps>();

  // Define state variables for user data
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    mobileno: "",
  });

  useEffect(() => {
    // Load user data from AsyncStorage when the component mounts
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData !== null) {
          setUserData(JSON.parse(storedUserData)); // Set state with the stored user data
        } else {
          // If no user data found, navigate to login
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []); // This will reload the user data when the component is rendered again

  const handleLogout = async () => {
    // Clear the user data from AsyncStorage on logout
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  const handleSupport = () => {
    navigation.navigate("SupportScreen");
  };

  const handleEditProfile = () => {
    // Pass the current user details to EditProfileScreen
    navigation.navigate("EditProfileScreen", {
      ...userData, // Pass the full user data
    });
  };

  const handleNotification = () => {
    navigation.navigate("NotificationScreen");
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
          <ThemedText style={styles.userName}>
            {userData.name || "Name not available"}
          </ThemedText>
          <ThemedText style={styles.userEmail}>
            {userData.email || "Email not available"}
          </ThemedText>
          <ThemedText style={styles.userMobile}>
            {userData.mobileno || "Mobile number not available"}
          </ThemedText>
        </View>

        {/* Account Options Section */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleEditProfile}
          >
            <Icon name="account-edit-outline" size={24} color="#4A148C" />
            <ThemedText style={styles.optionButtonText}>
              Edit Profile
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleNotification}
          >
            <Icon name="bell-outline" size={24} color="#4A148C" />
            <ThemedText style={styles.optionButtonText}>
              Notifications
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleSupport}
          >
            <Icon name="lifebuoy" size={24} color="#4A148C" />
            <ThemedText style={styles.optionButtonText}>Support</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleLogout}
          >
            <Icon name="logout" size={24} color="#4A148C" />
            <ThemedText style={styles.optionButtonText}>Logout</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  profileImage: {
    marginBottom: 10,
  },
  titleContainer: {
    backgroundColor: '#ffffff',
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A148C",
  },
  userInfoContainer: {
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A148C",
  },
  userEmail: {
    fontSize: 16,
    color: "#4A148C",
  },
  userMobile: {
    fontSize: 16,
    color: "#4A148C",
  },
  optionsContainer: {
    marginTop: 20,
    width: "90%",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e8e8e8",
    marginVertical: 5,
    borderRadius: 10,
  },
  optionButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#4A148C",
  },
});
