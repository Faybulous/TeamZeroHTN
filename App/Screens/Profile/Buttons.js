import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea',
    title: 'Datax',
  },
  {
    id: '3ac68afc',
    title: 'Canadian',
  },
];

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [mydata, setmyData] = useState([]);
  const [mydata2, setmyData2] = useState([]);

  useEffect(() => {
    var myresponse = fetch('http://c924e91ed0cf.ngrok.io/getuserbalance');
    console.log(myresponse);
    fetch('http://c924e91ed0cf.ngrok.io/getuserbalance')
      .then(response => response.json())
      .then(function(json) {
        setmyData(json.balanceusd);
        setmyData2(json.balancesatoshi);
      })
      .catch(error => console.error(error));
  }, []);
  const renderItem = ({item}) => {
    console.log('currentOne: ' + selectedId);
    const backgroundColor = item.id === selectedId ? '#ff2b00' : '#ff8f8f';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Subtitle}>
        Balance:{' '}
        {selectedId && (
          <Text style={styles.Subtitle}>
            {selectedId == 'bd7acbea' ? mydata : mydata2}
          </Text>
        )}
      </Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  Subtitle: {
    fontSize: 28,
    padding: 20,
    fontWeight: 'bold',
  },
});

export default App;
