import { StyleSheet, View, Button, TextInput, Text, ScrollView, Alert, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import the icon library

export default function SupportScreen() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const navigation = useNavigation(); // Access the navigation object

  const handleSubmit = () => {
    if (email && message && subject) {
      Alert.alert("Support Message Sent", "Your support message has been sent.", [{ text: "OK" }]);
      // Clear fields after submission
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <Icon
            name="arrow-left" // Back arrow icon
            size={30}
            color="#4A148C"
            onPress={() => navigation.goBack()} // Go back to the previous screen
          />
        </View>

        {/* Contact Options */}
        <View style={styles.contactContainer}>
          <ThemedText style={styles.sectionTitle}>Contact Us</ThemedText>
          <View style={styles.buttonWrapper}>
            <Button
              title="Call Us"
              onPress={() => Alert.alert("Call Us", "Dial 1800-123-4567")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Email Us"
              onPress={() => Alert.alert("Email Us", "support@apd.com")}
            />
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqContainer}>
          <ThemedText style={styles.sectionTitle}>FAQs</ThemedText>
          <ThemedText style={styles.faqText}>
            Q1: How do I track my order?
          </ThemedText>
          <ThemedText style={styles.faqText}>
            A: You can track your order from the "My Orders" section in your account.
          </ThemedText>

          <ThemedText style={styles.faqText}>
            Q2: What should I do if I received a damaged product?
          </ThemedText>
          <ThemedText style={styles.faqText}>
            A: Please contact us through the support page, and we will assist you with a replacement.
          </ThemedText>
        </View>

        {/* Support Form */}
        <View style={styles.formContainer}>
          <ThemedText style={styles.sectionTitle}>Send us a Message</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
          <Button title="Submit" onPress={handleSubmit} color="#FF3B30" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  container: {
    marginTop: 10,
    padding: 16,
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  contactContainer: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 15,
  },
  faqContainer: {
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  buttonWrapper: {
    marginBottom: 15,
  },
  backButtonContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 10,
  },
  faqText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
});
