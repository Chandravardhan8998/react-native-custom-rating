# react-native-custom-rating

Custom rating package for react native applications

## Installation

```sh
npm install react-native-custom-rating
```

## Usage

```js
import { Rating } from 'react-native-custom-rating';

// ...

<Rating
  emptyStarIcon={{
    uri: emptyIcon,
  }}
  filledStarIcon={{
    uri: filledIcon,
  }}
  halfStarIcon={{
    uri: halfIcon,
  }}
  rating={4.5}
  size={20}
  readonly={false}
  onFinishRating={(rating) => {
    //...
  }}
  elementStyling={{
    marginHorizontal: 20,
  }}
/>;
```

## Props

| Prop                 | Type      | Required      | Description                                             |
| -------------------- | --------- | ------------- | ------------------------------------------------------- |
| size                 | number    | false         | size of Rating Image in width and height, default is 10 |
| maxRating            | number    | false         | Max value of rating, default is 5                       |
| rating               | number    | true          | Rating numeric value                                    |
| readonly             | boolean   | false         | if `false` user will be able to input ratings           |
| readonly             | boolean   | false         | if `false` user will be able to input ratings           |
| onFinishRating       | function  | false         | `function` invoked when user select rating element      |
| renderHalfStarIcon   | function  | function/icon | render custom half rating element                       |
| renderEmptyStarIcon  | function  | function/icon | render custom empty rating element                      |
| renderFilledStarIcon | function  | function/icon | render custom empty rating element                      |
| halfStarIcon         | image/uri | function/icon | pass `image` or `uri` for half star icon                |
| emptyStarIcon        | image/uri | function/icon | pass `image` or `uri` for empty star icon               |
| filledStarIcon       | image/uri | function/icon | pass `image` or `uri` for filled star icon              |
| containerStyle       | object    | false         | style for container                                     |
| elementStyling       | object    | false         | style for rating element                                |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
