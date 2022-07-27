import React, { useEffect, useMemo, useState } from 'react';
import { Image, ImageRequireSource, ImageURISource, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';


type HalfStarProps = {
    originalRating: number,
    ratingToInt: number,
    size?: number,
    halfStarIcon: ImageRequireSource | ImageURISource,
}

const HalfStar = ({ originalRating, ratingToInt, size = 10, halfStarIcon }: HalfStarProps) => {
    const halfRate = originalRating - ratingToInt;
    if (halfRate < 1 && halfRate > 0) {
        const imageStyle = useMemo(() => ratingImageSizeStyle(size), [size])
        return (
            <Image
                style={imageStyle}
                source={halfStarIcon}
            />
        );
    } else {
        return null;
    }
};
const isHalf = (originalRating: number, ratingToInt: number): boolean => {
    const halfRate = originalRating - ratingToInt;
    return halfRate < 1 && halfRate > 0;
};



interface RatingProps {
    /**
    * `size` size of Rating Image in width and height, default is 10
    **/
    size?: number,
    /**
    * `maxRating` Max value of rating, default is 5
    **/
    maxRating?: number,
    /**
    * @required `rating`  Rating numeric value 
    **/
    rating: number,

    /**
    * `readonly`  if `false` user will be able to input ratings 
    **/
    readonly?: boolean,
    /**
    * `onFinishRating`  `function` invoked when user select rating element, 
    *  @return rating count value
    **/
    onFinishRating?: (rating: number) => any,
    /**
     * `renderHalfStarIcon`  render custom half star element 
     **/
    renderHalfStarIcon?: () => React.ReactNode,
    /**
    * `renderEmptyStarIcon`  render custom empty star element 
    **/
    renderEmptyStarIcon?: () => React.ReactNode,

    /**
    * `renderFilledStarIcon`  render custom filled star element 
    **/
    renderFilledStarIcon?: () => React.ReactNode,
    /**
     * `halfStarIcon`  pass `image`|`uri` for half star icon
     **/
    halfStarIcon?: ImageRequireSource | ImageURISource,
    /**
    * `emptyStarIcon`  pass `image`|`uri` for empty star icon
    **/
    emptyStarIcon?: ImageRequireSource | ImageURISource,
    /**
    * `filledStarIcon`  pass `image`|`uri` for filled star icon
    **/
    filledStarIcon?: ImageRequireSource | ImageURISource,
    /**
    * `containerStyle`  pass style for container
     **/
    containerStyle?: ViewStyle,
    /**
    * `elementStyling`  pass style for star rating for spacing between rating elements
     **/
    elementStyling?: ViewStyle

}

type Props = RatingProps

/**
 * Rating Component for rendering custom rating and also useful for getting user rating input  
 * @params `size` size of Rating Image in width and height, default is 10
 * @params `maxRating` Max value of rating, default is 5
 * @params `rating`  Rating numeric value 
 * @params `readonly`  if `false` user will be able to input ratings 
 * @params `onFinishRating`  `function` invoked when user presses rating element 
 * @params `renderFilledStarIcon`  render custom filled star element 
 * @params `renderHalfStarIcon`  render custom half star element 
 * @params `renderEmptyStarIcon`  render custom empty star element 
 * @params `filledStarIcon`  pass `image`|`uri` for filled star icon
 * @params `halfStarIcon`  pass `image`|`uri` for half star icon
 * @params `emptyStarIcon`  pass `image`|`uri` for empty star icon
 * @params `containerStyle`  style for container
 * @params `elementStyling`  style for rating element
 **/
const Ratings = ({
    size = 10,
    maxRating = 5,
    rating = 0,
    emptyStarIcon,
    filledStarIcon,
    halfStarIcon,
    readonly = false,
    renderEmptyStarIcon,
    renderFilledStarIcon,
    renderHalfStarIcon,
    onFinishRating = () => { },
    containerStyle,
    elementStyling

}: Props): JSX.Element => {
    const [Rating, setRating] = useState<number>(0)
    useEffect(() => {
        setRating(rating)
    }, [rating])

    const originalRating = useMemo(() => {
        if (Rating < 1) {
            return 1
        } else {
            return Rating > maxRating ? maxRating : Rating
        }
    }, [maxRating, Rating])

    const ratingToInt = parseInt(originalRating.toString());

    const Extra = useMemo(() => {
        let Extra = +Number(maxRating - originalRating).toFixed();
        if (originalRating < 1) {
            Extra = 5;
        } else if (isHalf(originalRating, ratingToInt)) {
            Extra = Extra - 1;
        }
        return Extra
    }, [maxRating, originalRating])
    const imageStyle = useMemo(() => ratingImageSizeStyle(size), [size])

    const onRatingPressHandler = (rating: number) => {
        return () => {
            setRating(rating)
            return onFinishRating(rating)
        }
    }
    if (!Rating) {
        return <></>;
    }
    if (typeof +Rating !== 'number') {
        throw Error(`Rating should only be numeric value.  You Entered rating : ${Rating}`)
    }
    if (typeof +maxRating !== "number") {
        throw Error(`Max Rating should only be numeric value. You Entered maxRating : ${maxRating}`)
    }
    return (
        <View
            style={[styles.container, containerStyle]}>
            {[...new Array(+ratingToInt)].map((rating, index) => {
                if (!!renderFilledStarIcon) {
                    return renderFilledStarIcon();
                } else if (!!filledStarIcon) {
                    return (
                        <TouchableOpacity
                            disabled={readonly}
                            onPress={onRatingPressHandler(index + 1)}
                            key={`${rating}_${index}`}
                            style={elementStyling}
                        >
                            <Image
                                style={imageStyle}
                                source={filledStarIcon} />
                        </TouchableOpacity>
                    );
                } else {
                    return <></>;
                }
            })}

            {!!renderHalfStarIcon ? renderHalfStarIcon() : isHalf(originalRating, ratingToInt) && !!halfStarIcon && <TouchableOpacity
                disabled={readonly}
                onPress={onRatingPressHandler(ratingToInt + 1)}
                style={elementStyling}
            >
                <HalfStar
                    originalRating={originalRating}
                    ratingToInt={ratingToInt}
                    size={size}
                    halfStarIcon={halfStarIcon}
                />
            </TouchableOpacity>
            }
            {!!Extra &&
                [...new Array(Extra)].map((res, i) => {
                    if (!!renderEmptyStarIcon) {
                        return renderEmptyStarIcon();
                    } else if (!!emptyStarIcon) {
                        return (
                            <TouchableOpacity
                                style={elementStyling}
                                disabled={readonly}
                                onPress={onRatingPressHandler(ratingToInt + i + 1)}
                                key={`${res}_${i}`}
                            ><Image
                                    style={imageStyle}
                                    source={emptyStarIcon} />
                            </TouchableOpacity>
                        );
                    } else {
                        return <></>;
                    }
                })
            }
        </View>
    );
};

export default Ratings;




function ratingImageSizeStyle(size: number) {
    return {
        height: size,
        width: size,
        // backgroundColor: "#ff0"
    };
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: "center",
    }
})

