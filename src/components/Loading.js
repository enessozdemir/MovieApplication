import { View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
const { width, height } = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={styles.loadingStyle}>
      <Progress.CircleSnail thickness={10} size={160} color={"#0284c7"} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingStyle: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    width: width,
    height: height
  }
})

export default Loading