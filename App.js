import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'

export default class App extends React.Component {
  render() {
    return (
        <Provider store={createStore(reducer)}>
          <View style={styles.container}>
              <View>
                  <Text>Filler text</Text>
              </View>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
