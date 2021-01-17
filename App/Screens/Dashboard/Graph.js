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
                let response = fetch(
                  'https://live.blockcypher.com/btc-testnet/tx/57db73a1fae13da249d823d90d7e0482c7b4e863885d6cc4fb8a42c5d1394dc2/',
                );
                let json = response.json();
                var y = json.applewatch.latest;
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
        <Text>
          {this.props.language} {this.props.check}
        </Text>
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
