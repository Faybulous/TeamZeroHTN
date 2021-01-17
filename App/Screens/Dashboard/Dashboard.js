import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {ThemeContext, themes} from '../../Theme/themes';
import Button from '../../Components/ThemedComponents/ThemedButton';
import ThemedView from '../../Components/ThemedComponents/ThemedView';
import ThemedText from '../../Components/ThemedComponents/ThemedText';
import ThemedHeader from '../../Components/ThemedComponents/ThemedHeader';
import GridChoices from './GridChoices';
import Graph from './Graph';

class Dashboard extends Component {
  // Hiding the Header for this Screen
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {language: null};
  }
  handleLanguage = langValue => {
    this.setState({language: langValue});
  };

  render() {
    theme = this.context.theme;
    return (
      <ThemedView style={{flex: 1}}>
        <SafeAreaView>
          <ThemedText style={{textAlign: 'center', marginTop: '3%'}}>
            {global.foo}
          </ThemedText>
          <View style={[{height: '100%', justifyContent: 'center'}]}>
            {this.state.language && <Graph clickedItem={this.state.language} />}
            <GridChoices onSelectLanguage={this.handleLanguage} />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }
}

Dashboard.contextType = ThemeContext;
export default Dashboard;
