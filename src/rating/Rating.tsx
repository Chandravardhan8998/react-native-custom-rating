import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Image as Img, ImageRequireSource as imgRS, ImageURISource as imgType, StyleSheet as SS, TouchableOpacity as Press, View, ViewStyle } from 'react-native';


type HalfStarProps = {
    ratStr: number,
    ratInt: number,
    size?: number,
    halfStarIcon: imgRS | imgType,
}

const HalfStar = ({ ratStr, ratInt, size = 10, halfStarIcon }: HalfStarProps) => {
    const halfRate = ratStr - ratInt;
    if (halfRate < 1 && halfRate > 0) {
        const imageStyle = useMemo(() => ratingImageSizeStyle(size), [size])
        return (
            <Img
                style={imageStyle}
                source={halfStarIcon}
            />
        );
    } else {
        return null;
    }
};
const isHalf = (ratStr: number, ratInt: number): boolean => {
    const halfRate = ratStr - ratInt;
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
    renderHalfStarIcon?: (number: number) => React.ReactNode,
    /**
    * `renderEmptyStarIcon`  render custom empty star element 
    * @return current rating number
    **/
    renderEmptyStarIcon?: (number: number) => React.ReactNode,

    /**
    * `renderFilledStarIcon`  render custom filled star element 
    * @return current rating number
    **/
    renderFilledStarIcon?: (number: number) => React.ReactNode,
    /**
     * `halfStarIcon`  pass `image`|`uri` for half star icon
     * @return current rating number
     **/
    halfStarIcon?: imgRS | imgType,
    /**
    * `emptyStarIcon`  pass `image`|`uri` for empty star icon
    **/
    emptyStarIcon?: imgRS | imgType,
    /**
    * `filledStarIcon`  pass `image`|`uri` for filled star icon
    **/
    filledStarIcon?: imgRS | imgType,
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
    readonly = true,
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

    const ratStr = useMemo(() => {
        if (Rating < 1) {
            return 1
        } else {
            return Rating > maxRating ? maxRating : Rating
        }
    }, [maxRating, Rating])

    const ratInt = parseInt(ratStr.toString());

    const empty = useMemo(() => {
        let empty = +Number(maxRating - ratStr).toFixed();
        if (ratStr < 1) {
            empty = 5;
        } else if (isHalf(ratStr, ratInt)) {
            empty = empty - 1;
        }
        return empty
    }, [maxRating, ratStr, ratInt])
    const imageStyle = useMemo(() => ratingImageSizeStyle(size), [size])

    const onRatingHandler = (rating: number) => {
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
            style={[s.c, containerStyle]}>
            {[...new Array(+ratInt)].map((rating, index) => {
                if (!!renderFilledStarIcon) {
                    return <Fragment key={index} >{renderFilledStarIcon(index + 1)}</Fragment>;
                } else if (!!filledStarIcon) {
                    return (
                        <Press
                            disabled={readonly}
                            onPress={onRatingHandler(index + 1)}
                            key={`${rating}_${index}`}
                            style={elementStyling}
                        >
                            <Img
                                style={imageStyle}
                                source={filledStarIcon} />
                        </Press>
                    );
                }
                return null
            })}
            {isHalf(ratStr, ratInt) && (!!renderHalfStarIcon ? renderHalfStarIcon(ratInt + 1) : !!halfStarIcon && <Press
                disabled={readonly}
                onPress={onRatingHandler(ratInt + 1)}
                style={elementStyling}
            >
                <HalfStar
                    ratStr={ratStr}
                    ratInt={ratInt}
                    size={size}
                    halfStarIcon={halfStarIcon}
                />
            </Press>)
            }

            {!!empty &&
                [...new Array(empty)].map((res, i) => {
                    const extraValue = isHalf(ratStr, ratInt) ? ratInt + i + 2 : ratInt + i + 1;
                    if (!!renderEmptyStarIcon) {
                        return <Fragment
                            key={i}
                        >{renderEmptyStarIcon(extraValue)}</Fragment>
                    } else if (!!emptyStarIcon) {
                        return (
                            <Press
                                style={elementStyling}
                                disabled={readonly}
                                onPress={onRatingHandler(extraValue)}
                                key={`${res}_${i}`}
                            >
                                <Img
                                    style={imageStyle}
                                    source={emptyStarIcon} />
                            </Press>
                        );
                    }
                    return null
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
    };
}

const s = SS.create({
    c: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: "center",
    }
})

