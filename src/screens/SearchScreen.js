import { View, Text, TextInput, Image, ScrollView, TouchableWithoutFeedback, Dimensions, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, searchMovies } from '../../api/movie'
import { debounce } from 'lodash'
import Loading from '../components/Loading'

const { width, height } = Dimensions.get('window');


export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([])

  const handleSearch = search => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: 'en-US',
        page: '1'
      }).then(data => {

        setLoading(false);
        if (data && data.results) setResults(data.results);
      })
    } else {
      setLoading(false);
      setResults([])
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.bgStyle}>
      <View  >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Here"
          placeholderTextColor={'black'}
          style={{
            backgroundColor: 'lightgrey', padding: 10,
            marginTop: 40,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 20,
            marginBottom: 10
          }}


        />

      </View>


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
    marginTop:100,
    marginLeft:width * .1,
    opacity: 0.5
  }
})