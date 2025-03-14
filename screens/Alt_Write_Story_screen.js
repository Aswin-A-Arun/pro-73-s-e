import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config'; // Assuming db is initialized in config.js

export default function WriteStoryScreen() {
  const [story, setStory] = useState({ title: '', author: '', storyText: '' });

  const submitStory = async () => {
    try {
      await addDoc(collection(db, "stories"), story);
      setStory({ title: '', author: '', storyText: '' });
      ToastAndroid.show('Your story has been submitted', ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error submitting story: ", error);
      ToastAndroid.show('Failed to submit story.', ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Header
        backgroundColor="pink"
        centerComponent={{ text: 'Story Hub', style: { color: 'black', fontSize: 30 } }}
      />
      <TextInput
        placeholder="Story Title"
        value={story.title}
        onChangeText={(text) => setStory({ ...story, title: text })}
        placeholderTextColor="black"
        style={styles.title}
      />
      <TextInput
        placeholder="Author"
        value={story.author}
        onChangeText={(text) => setStory({ ...story, author: text })}
        placeholderTextColor="black"
        style={styles.author}
      />
      <TextInput
        placeholder="Write your story"
        value={story.storyText}
        onChangeText={(text) => setStory({ ...story, storyText: text })}
        placeholderTextColor="black"
        style={styles.storyText}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={submitStory}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { height: 40, borderWidth: 2, marginTop: 40, margin: 10, color: 'black', padding: 6 },
  author: { height: 40, borderWidth: 2, margin: 10, padding: 6 },
  storyText: { height: 250, borderWidth: 2, margin: 10, padding: 6, textAlignVertical: 'top' },
  submitButton: { justifyContent: 'center', alignSelf: 'center', backgroundColor: 'pink', width: 80, height: 40 },
  buttonText: { textAlign: 'center', color: 'black', fontWeight: 'bold' },
});
