import React, {Component} from 'react';
import {View} from 'react-native';
import ThemedView from '../../Components/ThemedComponents/ThemedView';
import ThemedText from '../../Components/ThemedComponents/ThemedText';

class Help extends Component {
  static navigationOptions = ({screenProps}) => {
    let theme = screenProps.theme;
    return {
      title: 'About',
      headerTintColor: theme.foreground,
      headerStyle: {backgroundColor: theme.background},
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemedView style={{flex: 1}}>
        <View style={{flex: 1, flexGrow: 2, alignItems: 'center', padding: 25}}>
          <ThemedText>
            Source Code: https://github.com/Faybulous/TeamZeroHTN
          </ThemedText>
        </View>
      </ThemedView>
    );
  }
}

export default Help;
