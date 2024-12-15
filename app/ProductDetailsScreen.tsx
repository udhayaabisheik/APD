import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

// Define the product type
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

type ProductDetailsScreenRouteProp = RouteProp<
  { ProductDetailsScreen: { productId: number } },
  'ProductDetailsScreen'
>;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsScreenRouteProp>(); // Safely extract route params
  const navigation = useNavigation();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch product details from API
  useEffect(() => {
    fetch(`http://192.168.0.107:8080/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A1B9A" />
        <ThemedText>Loading product details...</ThemedText>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <ThemedText style={styles.errorMessage}>Product not found!</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backText}>Back</ThemedText>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productDetailsContainer}>
        <ThemedText style={styles.productName}>{product.name}</ThemedText>
        <ThemedText style={styles.productPrice}>${product.price}</ThemedText>
        <ThemedText style={styles.productDescription}>{product.description}</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorMessage: {
    fontSize: 18,
    color: '#6A1B9A',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  productDetailsContainer: {
    marginTop: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  productPrice: {
    fontSize: 20,
    color: '#6A1B9A',
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 18,
    color: '#4A148C',
  },
});
