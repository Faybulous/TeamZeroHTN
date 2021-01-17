import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {ThemeContext} from '../../Theme/themes';
import ThemedView from '../../Components/ThemedComponents/ThemedView';
import {TouchableOpacity} from 'react-native';
import Button from '../../Components/ThemedComponents/ThemedButton';
import Text from '../../Components/ThemedComponents/ThemedText';

class Settings extends Component {
  static navigationOptions = ({screenProps}) => {
    let theme = screenProps.theme;
    return {
      title: 'Settings',
      headerTintColor: theme.foreground,
      headerStyle: {backgroundColor: theme.background},
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  ListItem = (item, route) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.push(route)}
        style={{
          height: 50,
          margin: 5,
          justifyContent: 'center',
          paddingLeft: 5,
        }}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    theme = this.context.theme;
    return (
      <ThemedView style={{flex: 1}}>
        {this.ListItem('General', 'General')}
        {this.ListItem('About', 'About')}
        {this.ListItem('Source Code', 'Source Code')}
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 15}}>
          <Button
            onPress={() => this.props.navigation.navigate('Auth')}
            title="Logout"
            style={{margin: 5, alignSelf: 'flex-end'}}
            accessibilityLabel="This Button will Log you for the App"
          />
        </View>
      </ThemedView>
    );
  }
}

Settings.contextType = ThemeContext;
export default Settings;
