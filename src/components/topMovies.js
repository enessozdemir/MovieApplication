import { View, Text, Image, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/movie';
var { width, height } = Dimensions.get('window');

const TopMovies = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: "rgba(17, 18, 16, 1)" ,height: "auto"}}>
            <Text style={styles.basic}>All Time Best</Text>
            <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
                {
                  data.map((item, index) => {
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
                              source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
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
           
        </View>
    )
}

const styles = StyleSheet.create({
    basic: {
        marginBottom: 20,
        marginTop: 65,
        textAlign: "center",
        fontSize: 30,
        letterSpacing: 5,
        color: "#f1f5f9",
    },
    viewStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-evenly',

    }
})

export default TopMovies;