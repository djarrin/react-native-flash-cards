import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import NewDeck from './Components/NewDeck'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, green, red } from "./utils/colors";
import { createLogger } from 'redux-logger'
import DeckList from './Components/DeckList'
import { fetchDecks } from "./utils/api";
import { loadDeck } from "./actions";
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckOptions from './Components/DeckOptions'
import AddCard from './Components/AddCard'
import Quiz from './Components/Quiz'
import {setLocalNotification} from "./utils/helpers";

function UdaciStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor: backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const store = createStore(reducer, applyMiddleware(createLogger()))

const Tabs = createBottomTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
    },
}, {
    initialRouteName: 'DeckList',
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: red,
        style: {
            backgroundColor: green,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            headerStyle: {
                display: 'none'
            }
        }
    },
    DeckOptions: {
        screen: DeckOptions,
        path: 'deck/:name',
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}`,
            headerTintColor: purple,
            headerStyle: {
                backgroundColor: green,
                marginTop: Platform.OS === 'ios' ? -30:0

            },

        })
    },
    AddCard: {
        screen: AddCard,
        path: 'deck/add-card/:name',
        navigationOptions: ({navigation}) => ({
            title: `Add Card: ${navigation.state.params.name}`,
            headerTintColor: purple,
            headerStyle: {
                backgroundColor: green,
                marginTop: Platform.OS === 'ios' ? -30:0

            },

        })
    },
    Quiz: {
        screen: Quiz,
        path: 'deck/quiz/:name',
        navigationOptions: ({navigation}) => ({
            title: `Quiz: ${navigation.state.params.name}`,
            headerTintColor: purple,
            headerStyle: {
                backgroundColor: green,
                marginTop: Platform.OS === 'ios' ? -30:0

            },

        })
    }
})

export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification()
    }

    render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
              <UdaciStatusBar backgroundColor={green} barStyle="dark-content" />
              <MainNavigator/>
          </View>
        </Provider>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

fetchDecks().then((res) => {
    let decksObject = JSON.parse(res);

    Object.keys(decksObject).map(e => {
        let dispatchObject = {
            key: e,
            title: decksObject[e].title,
            questions: decksObject[e].questions
        }
        store.dispatch(loadDeck(dispatchObject));

    });
})
