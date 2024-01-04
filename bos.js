import React, { useEffect, useRef, useState, ScrollView } from 'react';
import { Button, Image, Platform, TouchableWithoutFeedback, View, } from 'react-native';
import { fetchTrendingMovies } from '../../api/movie';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import IMAGES from '../assets/images';
import TrendingMovies from '../components/trendingMovies';


const HomeScreen = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [loading, setLoading] = useState(false)
  const [trending, setTrending] = useState([]);

  const _carousel = useRef();

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false)
  }

  const renderMovies = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get("window").width * 1.4,
            width: Dimensions.get("window").width * 0.94,
            marginTop: 10,
            marginLeft: Dimensions.get("window").width * 0.03,
            borderRadius: 20
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: "#e2e8f0" }}>
      <Carousel
        ref={_carousel}
        data={trending}
        renderItem={renderMovies}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setActiveDotIndex(index)}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pagination
          carouselRef={_carousel}
          activeDotIndex={activeDotIndex}
          dotsLength={trending.length}
          dotStyle={{
            width: 15,
            backgroundColor: 'orange',
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            backgroundColor: 'gray',
          }}
        />
        <View style={{ padding: 15, flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => {
              _carousel.current.snapToItem(activeDotIndex - 1);
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: 'lightgray',
                marginEnd: 10,
              }}
            >
              <Ionicons name="chevron-back-outline" color={'black'} size={35} style={{ top: 6, left: 6 }} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              _carousel.current.snapToItem(activeDotIndex + 1);
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: 'orange',
              }}
            >
              <Ionicons name="chevron-forward-outline" color={'black'} size={35} style={{ top: 6, left: 9 }} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>


  );
};


export default HomeScreen;
