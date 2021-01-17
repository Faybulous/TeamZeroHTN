import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {
        title: {
          text: '',
        },

        chart: {
          events: {
            load: function() {
              // set up the updating of the chart each second
              var series = this.series[0];
              setInterval(function() {
                var y = Math.random();
                series.addPoint(y, true, true);
              }, 1000);
            },
          },
        },
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
        <Text>{this.props.language}</Text>
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
