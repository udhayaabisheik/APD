import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the route parameters
type EditProfileRouteParams = {
  id: number;
  name: string;
  email: string;
  mobileno: string;
};

export default function EditProfileScreen() {
  const route = useRoute<any>(); // Explicitly typing route as any
  const { id, name, email, mobileno } = route.params; // Destructure the params
  const router = useRouter(); // Initialize router

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedMobileno, setUpdatedPhone] = useState(mobileno);

  const handleSaveChanges = async () => {
    if (!updatedName || !updatedEmail || !updatedMobileno) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    const updatedData = {
      id,
      name: updatedName,
      email: updatedEmail,
      mobileno: updatedMobileno,
    };
  
    // Construct the body for the POST request
    const bodyData = new URLSearchParams(updatedData).toString();
  
    try {
      const response = await fetch("http://192.168.0.107:8080/users/update", {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyData, // Sending data in the request body
      });
  
      if (response.status === 200) {
        const updatedUser = await response.json();

        // Save updated data in AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

        // Navigate with params instead of query
        router.push({
          pathname: "/(tabs)/user",  // Ensure the path is correct for your project
          params: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            mobileno: updatedUser.mobileno,
          },
        });
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        value={updatedName}
        onChangeText={setUpdatedName}
        placeholder="Full Name"
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        value={updatedEmail}
        onChangeText={setUpdatedEmail}
        placeholder="Email Address"
        keyboardType="email-address"
      />

      {/* Phone Input */}
      <TextInput
        style={styles.input}
        value={updatedMobileno}
        onChangeText={setUpdatedPhone}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4A148C",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
