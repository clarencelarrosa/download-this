import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddData from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <AddData />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
