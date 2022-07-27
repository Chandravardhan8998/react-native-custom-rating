import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-custom-rating';

const empty = 'https://cdn-icons-png.flaticon.com/512/786/786230.png'
const half = 'https://cdn-icons-png.flaticon.com/512/2107/2107737.png'
const filled = 'https://cdn-icons-png.flaticon.com/512/786/786432.png'

export default function App() {
  const [GivenRating, setGivenRating] = React.useState<number>(4)
  return (
    <View style={styles.container}>
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
        rating={GivenRating}
        size={20}
        readonly={false}
        onFinishRating={setGivenRating}
        elementStyling={{
          marginHorizontal: 20,
        }}
      />
      {/* <Text
        style={{
          color: "#000"
        }}
      >{GivenRating}</Text> */}
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
