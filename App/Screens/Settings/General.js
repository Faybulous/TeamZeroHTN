import React, {Component} from 'react';
import {View} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import {ThemeContext} from '../../Theme/themes';
import ThemedButton from '../../Components/ThemedComponents/ThemedButton';
import ThemedView from '../../Components/ThemedComponents/ThemedView';
import ThemedText from '../../Components/ThemedComponents/ThemedText';

class General extends Component {
  static navigationOptions = ({screenProps}) => {
    let theme = screenProps.theme;
    return {
      title: 'General',
      headerTintColor: theme.foreground,
      headerStyle: {backgroundColor: theme.background},
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      switchOn: false,
    };
  }

  onPress = toggleTheme => {
    this.setState({
      switchOn: this.state.switchOn ? false : true,
    });
    toggleTheme();
  };

  render() {
    theme = this.context.theme;
    return (
      <ThemedView style={{flex: 1}}>
        <View style={{flex: 1, flexGrow: 2, alignItems: 'center', padding: 25}}>
          <ThemedText>Made By Team Zero</ThemedText>
        </View>
      </ThemedView>
    );
  }
}

General.contextType = ThemeContext;
export default General;
