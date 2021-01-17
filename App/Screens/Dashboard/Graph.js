import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {StyleSheet, Dimensions, View, Text} from 'react-native';

export default function Example() {
  return (
    <View style={[{justifyContent: 'center'}]}>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="mb/s"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ff2b00',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginLeft: 10,
          marginBottom: 30,
        }}
      />
    </View>
  );
}
