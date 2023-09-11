import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [muunna, setmuunna] = useState('');
  const [raha, setraha] = useState('USD');
  const [summa, setsumma] = useState('');
  const [exchange, setExchange] = useState('');
  const pickerRef = useRef();

  let myHeaders = new Headers();
  myHeaders.append("apikey", "VCmacGFlJZGpaPXITxYbBTYVaam1Aq1C");

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const getExchange = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${raha}&amount=${summa}`, requestOptions)
      .then(res => res.text())
      .then(data => {
        setExchange(data);
        let parsedData = JSON.parse(data);
        setmuunna(parsedData.result.toFixed(2) + " €")
      })
      .catch(err => console.error(err));
    }

  useEffect(() => {
    getExchange();
  }, []);

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
        style={styles.tinyImage}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2017/01/25/12/31/bitcoin-2007769_640.jpg',
        }}
        />
      </View>
      <View style={styles.exchangebar}>
      <Text style={styles.heading}>Euroina: {muunna}</Text>
        <Picker
          style={styles.picker}
          ref={pickerRef}
          selectedValue={raha}
          onValueChange={(itemValue, itemIndex) =>
            setraha(itemValue)
          }>
          <Picker.Item label="CAD" value="CAD" />
          <Picker.Item label="JPY" value="JPY" />
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="AUD" value="AUD" />
          
        </Picker>
        <View >
        <TextInput
          style={{fontSize: 18, width: 150, height:50,borderBlockColor:'cyan', borderWidth:3}}
          placeholder='Syötä määrä'
          onChangeText={text => setsumma(text) }
        />
        <Button title="Muunna" onPress= {getExchange} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exchangebar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 150,
    borderColor:'cyan',
    borderWidth:3
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tinyImage: {
    width: 300,
    height: 300,
  },
});