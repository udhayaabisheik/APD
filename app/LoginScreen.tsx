import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import axios from "axios"; // Import axios for API requests

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // Initialize router

  const handleLogin = async () => {
    if (email && password) {
      try {
        // Make the API request to verify user
        const response = await axios.get("http://192.168.0.107:8080/users/login", {
          params: {
            email: email,
            password: password,
          },
        });
  
        // Check if the response is successful
        if (response.status === 200 && response.data) {
          const { id, name, email } = response.data; // Destructure to get only id, name, and email
  
          Alert.alert("Login Successful", `Welcome, ${email}`);
          
          // Send user data (id, name, email) to the next page (UserAccountScreen)
          router.push({
            pathname: "/(tabs)/user",
            params: { id, name, email }, // Pass the specific user data
          });
        } else {
          Alert.alert("Error", "Invalid credentials");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while logging in");
      }
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Account</Text>
      <Icon name="account-circle" size={100} color="#6A1B9A" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#6A1B9A" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#6A1B9A" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* Use Link from expo-router to navigate to the SignUpScreen */}
      <Link href="/SignUpScreen">
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </Link>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E5F5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A148C",
  },
  icon: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6A1B9A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#6A1B9A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 15,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#6A1B9A",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
