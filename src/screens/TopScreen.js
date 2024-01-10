import { View, StyleSheet, ScrollView } from 'react-native';
import TopMovies from '../components/topMovies';
import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../../api/movie';
import Loading from '../components/Loading';

const TopScreen = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getTopRatedMovies();
  },[]);
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    if(data && data.results) setTopMovies(data.results);
    setLoading(false)
  }

  return (
    <View>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false} 
          >
           { topMovies.length>0 && <TopMovies title="Top Rated" data={topMovies} /> }
          </ScrollView>
        )
      }     
  </View>
  )
}

export default TopScreen

const styles = StyleSheet.create({})