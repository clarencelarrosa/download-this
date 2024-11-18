import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../config';
import { ref, set } from 'firebase/database';

const AddData = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Function to select an image
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to add data to Firebase
  const dataAddOn = () => {
    if (!height || !gender) {
      alert('Please fill in all fields and select a gender!');
      return;
    }
    set(ref(db, 'posts/' + 'newPosts' + height), {
      height: height,
      gender: gender,
      imageUri: imageUri || '', // Save the image URI
    });
    setHeight('');
    setGender('');
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gender and Height</Text>

      {/*Height*/}
      <Text style={styles.label}>Height:</Text>
      <TextInput
        placeholder="Enter your height"
        value={height}
        onChangeText={(text) => setHeight(text)}
        style={styles.input}
        keyboardType="numeric"
      />

      {/*Gender*/}
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'Male' && styles.selectedGenderButton]}
          onPress={() => setGender('Male')}
        >
          <Text style={[styles.genderText, gender === 'Male' && styles.selectedGenderText]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'Female' && styles.selectedGenderButton]}
          onPress={() => setGender('Female')}
        >
          <Text style={[styles.genderText, gender === 'Female' && styles.selectedGenderText]}>Female</Text>
        </TouchableOpacity>
      </View>

      {/*Upload Image*/}
      <Text style={styles.label}>Select Image:</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
        <Image source={require('../assets/upload-icon.png')} style={styles.uploadIcon} />
        <Text style={styles.uploadText}>Upload Files</Text>
      </TouchableOpacity>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.imagePreview} /> : null}

      {/*Submit data*/}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={dataAddOn} />
      </View>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505050',
    padding: 15,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 5,
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#505050',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 10,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#333333',
    color: 'white',
  },
  selectedGenderButton: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
  },
  genderText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectedGenderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 15,
    width: '95%',
  },
  uploadIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  
  buttonContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});
