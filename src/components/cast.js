import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
var { width, height } = Dimensions.get('window');

export default function Cast({ cast, navigation }) {
    return (
        <View>
            <Text style={styles.textStyle}>Popular Cast</Text>
            <ScrollView style={{ width: width, height: 100 }}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
            >
                {
                    cast && cast.map((person, index) => {
                        return (index < 4) ? (
                            <ScrollView scrollEnabled={false} style={styles.listStyle} key={index}>
                                <Text style={styles.listTextStyle}>
                                    {
                                        person?.original_name
                                    } <Text style={{color: "#0284c7"}}>as</Text>
                                </Text>
                                <Text style={styles.listTextStyle}>
                                    {
                                        person?.character
                                    }
                                </Text>
                            </ScrollView>
                        ) : null
                    }).filter(x => x)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        left: 16,
        marginBottom: 10,
        color: "#f1f5f9"
    },
    listStyle: {
        marginLeft: 2,
        marginRight: 15,
        marginBottom: 10,
        textAlign: "right"

    },
    listTextStyle: {
        color: "rgba(255, 255, 255, .76)",

    }
})