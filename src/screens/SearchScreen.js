import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//import axios from 'axios';


const SearchScreen = () => {
    return (
        <View>
            <Text style={styles.forTest} >
                This is the search page
                
            </Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    forTest: {
      alignItems: 'center',
      justifyContent: 'center',
      color: 'red',
      fontSize: 30,
    }
  });

export default SearchScreen;
