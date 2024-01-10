import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../../api/movie';
const {width, height} =  Dimensions.get('window');

  const MovieList = ({title, data}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text style={styles.titlestyle}>{title}</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data.map((item, index)=>{
                return (
                    <TouchableWithoutFeedback 
                      key={index} 
                      onPress={()=> navigation.push('Movie', item)}
                    >
                        <View>
                            <Image 
                              source={{uri: image185(item.poster_path) || fallbackMoviePoster}} 
                              style={styles.imageStyle} 
                            />
                            <Text style={styles.movieListStyle}>
                                {
                                    item.title.length>14? item.title.slice(0,14)+'...': item.title
                                }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  imageStyle:  {
    width: width*.33,
    height: height*.23,
    borderRadius: 15,
    marginRight: 15,
    marginTop: 12,
    marginBottom: 5
  },
  titlestyle: {
    color: "#f1f5f9",
    left: 16,
    fontSize: 18
  },
  movieListStyle: {
    color: "rgba(255, 255, 255, .76)",
    marginTop: 5,
    left: 2.5,
    fontSize: 16
  }
})

export default MovieList