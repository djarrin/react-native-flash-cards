import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import NewDeck from './Components/NewDeck'
import { Constants } from 'expo'
import { purple, blue } from "./utils/colors";
import { createLogger } from 'redux-logger'

function UdaciStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor: backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const store = createStore(reducer, applyMiddleware(createLogger()))

export default class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
              {/*todo:: Need to figure out why this bar color is not the way I want it*/}
              <Text style={{color: '#000'}}>{JSON.stringify(this.props.store)}</Text>
              <UdaciStatusBar backgroundColor={purple} barStyle="dark-content" />
              <NewDeck/>
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
