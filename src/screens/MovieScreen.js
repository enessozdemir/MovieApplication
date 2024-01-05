import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/MovieList'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image342, image500 } from '../../api/movie';
import Loading from '../components/Loading';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
var { width, height } = Dimensions.get('window');

const MovieScreen = () => {
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
        setLoading(false);
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) {
            setCast(data.cast);
        }

    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }
    return (
        <ScrollView>
            <View >
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View style={styles.generalStyle}>
                            <SafeAreaView style={styles.buttonsStyle}>
                                <TouchableOpacity style={styles.backStyle} onPress={() => navigation.goBack()}>
                                    <ChevronLeftIcon size="32" strokeWidth={2.5} color="black" style={{marginTop:3,marginRight:2}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                                    <HeartIcon size="45" color={isFavourite ? "#e11d48" : '#f0a5cb'}  />
                                </TouchableOpacity>
                            </SafeAreaView>
                            <Image
                                source={{ uri: image342(movie.poster_path) || fallbackMoviePoster }}
                                style={styles.imageStyle}
                            />

                            <View style={styles.infoStyle}>
                                <Text style={styles.titleStyle}>
                                    {
                                        movie?.title
                                    }
                                </Text>
                                {
                                    movie?.id ? (
                                        <Text style={styles.idStyle}>
                                            {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} minutes
                                        </Text>
                                    ) : null
                                }
                                <Text style={styles.overviewStyle}>
                                    {
                                        movie?.overview
                                    }
                                </Text>
                                <Text style={styles.castStyle}>
                                    {
                                        movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
                                    }
                                </Text>
                                {
                                    movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
                                }
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    generalStyle: {
        height: 1350,
        backgroundColor: "rgba(17, 18, 16, 1)"

    },
    buttonsStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        top: 0,
        zIndex: 1
    },
    backStyle: {
        backgroundColor: "#0284c7",
        opacity: .8,
        borderRadius: 10,
        padding: 2,
    },
    imageStyle: {
        width: width * 1,
        height: height * 0.70,
        top: -140
    },
    infoStyle: {
        top: -300,
        marginTop: 80,
        borderRadius: 4,
        paddingBottom: 50
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 33,
        color: "white",
        paddingHorizontal:5.5,
        marginTop: 100,
        fontWeight: "bold"
    },
    idStyle: {
        textAlign: 'center',
        marginBottom: 10,
        color: "gray",
        marginTop: 15
    },
    overviewStyle: {
        padding: 10,
        color: "gray",
        marginHorizontal: 7,
        fontSize: 15,
    },
    castStyle: {
        height: 100,
        marginTop: 20,
        marginBottom: 15,
        paddingVertical: 10,
    }

})


export default MovieScreen