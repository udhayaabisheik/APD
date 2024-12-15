import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, View, FlatList, Text, TouchableOpacity, TextInput, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the product type
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

// Define the RootStackParamList for navigation
type RootStackParamList = {
  ProductDetailsScreen: { productId: number };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const navigation = useNavigation<NavigationProps>();

  // Fetch products from the API
  useEffect(() => {
    fetch('http://192.168.0.107:8080/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Render a single product card
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetailsScreen', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <ThemedText style={styles.productName}>{item.name}</ThemedText>
        <ThemedText style={styles.productPrice}>${item.price}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A1B9A" />
        <ThemedText>Loading products...</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    paddingTop: StatusBar.currentHeight,
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  searchInput: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  productList: {
    paddingBottom: 50,
  },
  productCard: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
    maxWidth: '48%',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  productPrice: {
    fontSize: 16,
    color: '#6A1B9A',
    marginTop: 5,
  },
});
