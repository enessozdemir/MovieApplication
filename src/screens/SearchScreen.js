import { View, Text, TextInput, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, searchMovies } from '../../api/movie'
import Loading from '../components/Loading';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        language: 'en-US',
        page: '1'
      }).then(data => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      }).catch(err => alert(err))
    } else {
      setLoading(false);
      setResults([])
    }
  }

  return (
    <SafeAreaView style={styles.bgStyle}>
      <TouchableOpacity style={styles.searchStyle} onPress={handleClick} >
        <FontAwesome style={styles.iconStyle} name="search" size={28} color="gray" />
        <TextInput
          ref={ref}
          onChangeText={handleSearch}
          placeholder="Search Here"
          placeholderTextColor={'gray'}
          style={styles.inputStyle}
        />
      </TouchableOpacity>
      {
        loading ? (
          <Loading />
        ) :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
            >
              <Text style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 10,
                paddingBottom: 0
              }}>Found {results.length} results</Text>

              <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
                {
                  results.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}>
                        <View style={{}}>
                          <View style={{
                            width: width * 0.48,
                            paddingBottom: 15,
                          }}>
                            <Image
                              source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}

                              style={{
                                width: width * 0.45,
                                height: height * 0.33,
                                borderRadius: 15,
                                marginTop: 10,
                                marginHorizontal: width * 0.01,
                              }}
                            />
                            <Text style={{
                              color: '#f1f5f9',
                              marginLeft: 0,
                              marginTop: 15,
                              textAlign: 'center',
                              fontSize: 17
                            }}>
                              {
                                item.title
                              }
                            </Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image
                source={require('../../assets/images/popcorn.png')}
                style={styles.imageStyle}
              />
            </View>
          )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bgStyle: {
    backgroundColor: 'rgba(17, 18, 16, 1)',
    height: "100%"
  },
  imageStyle: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: 100,
    marginLeft: width * .1,
    opacity: 0.5
  },
  searchStyle: {
    backgroundColor: "#94a3b8",
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    marginTop: 17,
    marginBottom: 10
  },
  inputStyle: {
    fontSize: 20,
    marginTop: 2
  },
  iconStyle: {
    alignSelf: "center",
    marginLeft: 15,
    marginRight: 10
  }
})


export default SearchScreen;