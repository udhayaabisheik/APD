import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router"; // Use useRouter from expo-router
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"; // Correct import for DateTimePickerEvent

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(new Date()); // Default to current date
  const [showPicker, setShowPicker] = useState(false); // State to toggle date picker visibility
  const router = useRouter(); // To navigate programmatically

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !dob) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Prepare the user data to be sent to the API
    const userData = {
      name,
      email,
      password,
      dob: dob.toISOString(), // Send date as ISO string
    };

    try {
      // Send POST request to the API
      const response = await fetch("http://192.168.0.107:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if the response status is 201 (Created)
      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        router.push("/LoginScreen"); // Navigate to LoginScreen on success
      } else {
        // Handle other response codes
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Something went wrong.");
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false); // Close the picker
    if (selectedDate) setDob(selectedDate); // Update DOB if a date is selected
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Icon name="account-plus" size={100} color="#4CAF50" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={20} color="#4CAF50" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#4CAF50" />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* DOB Picker */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dobPicker}
      >
        <Icon name="calendar" size={24} color="#4CAF50" />
        <Text style={styles.dobText}>
          {dob ? dob.toDateString() : "Select Date of Birth"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()} // Restrict to past dates only
        />
      )}

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#4CAF50" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-check-outline" size={20} color="#4CAF50" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Use Link to navigate back to the LoginScreen */}
      <Link href="/LoginScreen">
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </Link>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E7D32",
  },
  icon: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
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
  dobPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    width: "100%",
  },
  dobText: {
    marginLeft: 10,
    color: "#4CAF50",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
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
    color: "#4CAF50",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
