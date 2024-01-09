import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrendingMovies from '../components/trendingMovies';
import { fetchTrendingMovies } from '../../api/movie';
import Loading from '../components/Loading';


const HomeScreen = () => {

  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false)
  }
  return (
    <View>
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {trending.length > 0 && <TrendingMovies data={trending} />}
          </ScrollView>
        )
      }

    </View>
  );
};




export default HomeScreen;