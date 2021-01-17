import React from 'react';
import {StyleSheet, View} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3],
          },
        ],
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <HighchartsReactNative
          styles={styles.container}
          options={this.state.chartOptions}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
  },
});
