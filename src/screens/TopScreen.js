import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TopMovies from '../components/topMovies';
import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../../api/movie';
import Loading from '../components/Loading';


const TopScreen = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    getTopRatedMovies();
  },[]);
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    if(data && data.results) setTopRated(data.results);
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
           { topRated.length>0 && <TopMovies title="Top Rated" data={topRated} /> }
          </ScrollView>
        )
      }
      
  </View>
  )
}

export default TopScreen

const styles = StyleSheet.create({})