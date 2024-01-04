import { View, Text, Image, TouchableWithoutFeedback, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useRef } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/movie';
import { Ionicons } from '@expo/vector-icons';
var { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
    const navigation = useNavigation();
    const [activeDotIndex, setActiveDotIndex] = useState(10);
    const _carousel = useRef();

    /*
    const renderMovies = ({ item, index }) => {
        return (
            <View>
                <Image
                    source={item.image}
                    style={{
                        height: Dimensions.get("window").width * 1.2,
                        width: Dimensions.get("window").width * 0.94,
                        marginTop: 10,
                        marginLeft: Dimensions.get("window").width * 0.03,
                        borderRadius: 20
                    }}
                />
            </View>
        );
    };
    */

    const handleClick = item => {
        navigation.navigate('Movie', item);
    }

    return (
        <View style={{ height: "100%"}}>
            <Text style={styles.basic}>Popular Movies</Text>
            <Carousel
                ref={_carousel}
                data={data}
                renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
                firstItem={10}
                inactiveSlideOpacity={0.70}
                sliderWidth={width * 1}
                itemWidth={width * 0.82}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                onSnapToItem={index => setActiveDotIndex(index)}
            />
            <SafeAreaView style={styles.viewStyle}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        _carousel.current.snapToItem(activeDotIndex - 1);
                    }}>
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            left: 10,
                            top: 19
                        }}
                    >
                        <Ionicons name="chevron-back-outline" color={'black'} size={27} style={{ top: 1, left: 1 }} />
                    </View>
                </TouchableWithoutFeedback>
                <Pagination
                    carouselRef={_carousel}
                    activeDotIndex={activeDotIndex}
                    dotsLength={data.length}
                    dotContainerStyle={{ width: 0 }}
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

                <TouchableWithoutFeedback
                    onPress={() => {
                        _carousel.current.snapToItem(activeDotIndex + 1);
                    }}>
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,

                            right: 10,
                            top: 19
                        }}
                    >
                        <Ionicons name="chevron-forward-outline" color={'black'} size={27} style={{ top: 1, left: 2 }} />
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    )
}

const MovieCard = ({ item, handleClick }) => {

    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={{
                    width: width * 0.82,
                    height: height * 0.6,
                    marginHorizontal: width * 0.05,
                    borderRadius: 15
                }}
            />
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    basic: {
        marginBottom: 20,
        marginTop: 10,
        textAlign: "center",
        fontSize: 30,
        letterSpacing: 5
    },
    viewStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 20,
    }
})


export default TrendingMovies;