import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/MovieList'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image342, image500 } from '../../api/movie';
import { styles, theme } from '../../theme';
import Loading from '../components/Loading';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
var { width, height } = Dimensions.get('window');

 const MovieScreen= () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        getMovieDetials(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetials = async id => {
        const data = await fetchMovieDetails(id);
        console.log('got movie details');
        setLoading(false);
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        console.log('got movie credits')
        if (data && data.cast) {
            setCast(data.cast);
        }

    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
        >

            {/* back button and movie poster */}
            <View >
                <SafeAreaView>
                    <TouchableOpacity style={{ backgroundColor: 'gray' }} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : '#f0a5cb'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                source={{ uri: image342(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width: width * 0.9, height: height * 0.55, marginLeft: width * 0.05 }}
                            />

                        </View>
                    )
                }



            </View>

            {/* movie details */}

            <View style={{ marginTop: 10 }} className="">
                {/* title */}
                <Text style={{ textAlign: 'center', fontSize: 25 }}>
                    {
                        movie?.title
                    }
                </Text>

                {/* status, release year, runtime */}
                {
                    movie?.id ? (
                        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                            {movie?.release_date?.split('-')[0] || 'N/A'} , {movie?.runtime} minutes
                        </Text>
                    ) : null
                }





                {/* description */}
                <Text style={{ padding: 10 }}>
                    {
                        movie?.overview
                    }
                </Text>

            </View>


            {/* cast */}
            <Text style={{ height: 100, marginTop: 10, marginBottom: 10 }}>
                {
                    movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
                }
            </Text>

            {/* similar movies section */}
            {
                movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
            }

        </ScrollView>
    )
}

export default MovieScreen