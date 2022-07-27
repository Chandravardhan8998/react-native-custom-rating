import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-custom-rating';

const empty = 'https://cdn-icons-png.flaticon.com/512/786/786230.png'
const half = 'https://cdn-icons-png.flaticon.com/512/2107/2107737.png'
const filled = 'https://cdn-icons-png.flaticon.com/512/786/786432.png'

const CustomStar = ({ number, onPress, type }: { number: number, onPress: (val: number) => void, type: 'filled' | 'empty' }) => {
  const op = () => {
    onPress(number)
  }
  return <TouchableOpacity
    activeOpacity={1}
    style={{
      backgroundColor: type === "empty" ? "#d4d4d4" : "blue", margin: 5,
      borderRadius: 20,
      width: 40, height: 40, justifyContent: "center", alignItems: "center"
    }}
    onPress={op}
  >
    <Text style={{
      color: type === "empty" ? '#000' : '#fff'
    }} > {number}</Text>
  </TouchableOpacity>
}

export default function App() {
  const [GivenRating, setGivenRating] = React.useState<number>(3)
  React.useEffect(() => {
    console.clear()
    console.log(GivenRating);
  }, [GivenRating])

  return (
    <View style={styles.container}>
      <Text>Render Icons/Images (disable) </Text>
      <Rating
        emptyStarIcon={{
          uri: empty
        }}
        filledStarIcon={{
          uri: filled
        }}
        halfStarIcon={{
          uri: half
        }}
        rating={2.5}
        size={20}
        onFinishRating={setGivenRating}
        elementStyling={{
          marginHorizontal: 5,
        }}
        containerStyle={{
          marginBottom: 80,
          marginTop: 10
        }}
      />
      <Text>Render Custom (enable) </Text>
      <Rating
        renderEmptyStarIcon={(number) => {
          return <CustomStar
            number={number}
            onPress={setGivenRating}
            type='empty'
          />
        }}
        renderFilledStarIcon={(number) => {
          return <CustomStar
            number={number}
            onPress={setGivenRating}
            type='filled'
          />
        }}
        renderHalfStarIcon={(number) => {
          return <CustomStar
            number={number}
            onPress={setGivenRating}
            type='filled'
          />
        }}
        rating={GivenRating}
        size={20}
        readonly={false}
        onFinishRating={setGivenRating}
        elementStyling={{
          marginHorizontal: 5,
        }}
      />
      <Text>{GivenRating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
