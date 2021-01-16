import React from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default function Example() {
  const [items, setItems] = React.useState([
    {
      name: 'Smart Fridge',
      uri: {
        uri:
          'https://images.homedepot-static.com/productImages/51e0e8b6-8f03-41b4-b5ed-2402f060e11d/svn/fingerprint-resistant-black-stainless-steel-samsung-french-door-refrigerators-rf28n9780sg-64_1000.jpg',
      },
    },
    {
      name: 'Apple Watch',
      uri: {
        uri:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/42-alu-space-sport-black-nc-1up?wid=1673&hei=1353&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1594318651000',
      },
    },

    {
      name: 'Nest Thermostat',
      uri: {
        uri:
          'https://multimedia.bbycastatic.ca/multimedia/products/500x500/103/10389/10389044.jpg',
      },
    },
    {
      name: 'Amazon Echo',
      uri: {
        uri:
          'https://images.squarespace-cdn.com/content/59937b8f2994cae8c280ca6c/1507307053968-XHX7XYT1CZIVBWVK69ZM/61yI7vWa83L._SL1000_.jpg?content-type=image%2Fjpeg',
      },
    },
  ]);

  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({item}) => (
        <View style={[styles.itemContainer]}>
          <ImageBackground source={item.uri} style={styles.image}>
            {/* <Text style={styles.itemName}>{item.name}</Text> */}
          </ImageBackground>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 20,
    height: 160,
  },
  image: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
