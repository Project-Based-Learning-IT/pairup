import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-deck-swiper';
import OverlayLabel from './OverlayLabel';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import {
  IconButton,
  useTheme,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import FlipProfileCard from './FlipProfileCard';
import Filter from './Filter';
// import {cards} from '../staticStore';
import {useAuth} from '../App';

function Discover({route}) {
  const {colors} = useTheme();
  const {height} = Dimensions.get('window');

  const [isLoading, setIsLoading] = React.useState(true);
  const [cards, setCards] = useState([]);
  const [filtered_skills, setFiltered_skills] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },

    bottomOptionsContainer: {
      width: '100%',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    bottomOption: {
      borderColor: '#efebe9',
      borderWidth: 1,
      borderRadius: 50,
      backgroundColor: '#fff',
      padding: 8,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      elevation: 4,
    },

    discoverBackground: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '45%',
      // backgroundColor: '#C30F31',
      // backgroundColor: '#077f7f',
      // 0D4F4F
      // backgroundColor: '#0a243f',
      // backgroundColor: '#0D4F4F',
      backgroundColor: colors.secondaryDark,
      borderBottomLeftRadius: 39,
      borderBottomRightRadius: 39,
    },

    discoverContainer: {
      width: '100%',
      paddingEnd: 16,
      paddingStart: 16,
      paddingTop: 8,
      paddingBottom: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },

    discoverText: {
      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
    },

    overlayWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginTop: 60,
      marginLeft: -30,
    },
  });

  const swiperRef = React.useRef();

  const [index, setIndex] = React.useState(0);
  const [swipedAll, setSwipedAll] = React.useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = React.useState(false);
  const [isSwiping, setIsSwiping] = React.useState(false);

  const onSwipedLeft = index => {
    console.log(index, 'Left');
    setIndex(index + 1);
  };

  const onSwipedRight = async index => {
    console.log(index, 'Right');
    const res = await axiosInstance.post('/right_swipe', {
      Swiped_Student_ID: cards[index].id,
    });
    if (res.data === 'Matched') {
      console.log('Matched');
      try {
        const msg = await axiosInstance.post('/message', {
          Receiver_ID: cards[index].id,
          text: 'Hi, 👋 We matched up',
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Yet to Match');
      try {
        const msg = await axiosInstance.post('/message', {
          Receiver_ID: cards[index].id,
          text: `Right Swiped ${cards[index].id}`,
        });
      } catch (err) {
        console.log(err);
      }
    }
    setIndex(index + 1);
  };

  const onSwipedAll = () => {
    setSwipedAll(true);
  };

  const undo = ref => {
    ref.current.jumpToCardIndex(0);
    setIndex(0);
    setSwipedAll(false);
  };

  const {user, axiosInstance, setaxiosInstance, setUser} = useAuth();

  useEffect(() => {
    setIsLoading(true);

    const updateAxiosInstance = () => {
      //NOTE Set Token after Glogin
      axiosInstance.defaults.headers['Authorization'] =
        'Bearer ' + user.access_token;

      setaxiosInstance({axiosInstance});
    };

    const getCards = async () => {
      try {
        let tries = 5;
        let res;
        while (!res & tries--) {
          res = await axiosInstance.post('/get_recommendations', {
            filter_skills: filtered_skills.map(skill => {
              return skill.skill_name;
            }),
          });
        }
        setCards(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const init = async () => {
      try {
        setIsLoading(true);
        updateAxiosInstance();
        await getCards();
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, [filtered_skills, user.skills]);

  return (
    <View style={styles.container}>
      {/* A status bar which changes color based on the tab selected */}
      <FocusAwareStatusBar
        backgroundColor={colors.secondaryDark}
        barStyle={'light-content'}
      />
      {isLoading ? (
        <Portal>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#000',
              opacity: 0.5,
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        </Portal>
      ) : (
        <>
          {/* Absolute positioned discover background (which is supposed to use gradient) */}
          <View style={styles.discoverBackground}></View>

          {/* Discover text */}
          <View style={styles.discoverContainer}>
            <Text style={styles.discoverText}>Discover</Text>
            <IconButton
              icon="filter-variant"
              size={24}
              color={colors.textWhite}
              onPress={() => setIsFilterModalVisible(true)}
            />
            {isFilterModalVisible && (
              <Filter
                close={setIsFilterModalVisible}
                setFiltered_skills={setFiltered_skills}
                filtered_skills={filtered_skills}
              />
            )}
          </View>

          {/* Main content with swipe cards */}

          <View style={{height: height - 250, alignSelf: 'stretch'}}>
            <Swiper
              ref={swiperRef}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              onSwipedAll={onSwipedAll}
              cardVerticalMargin={0}
              cardHorizontalMargin={12}
              // stackAnimationFriction={2}
              // stackAnimationTension={100}
              backgroundColor="transparent"
              cards={cards}
              renderCard={card => (
                <FlipProfileCard card={card} swiperRef={swiperRef} />
              )}
              stackSize={cards.length}
              stackScale={4}
              stackSeparation={8}
              disableBottomSwipe
              disableTopSwipe
              // animateCardOpacity
              // animateOverlayLabelsOpacity
              containerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: 10,
              }}
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  element: <OverlayLabel label="NOPE" color="#E5566D" />,
                  style: {
                    wrapper: styles.overlayWrapper,
                  },
                },
                right: {
                  title: 'LIKE',
                  element: <OverlayLabel label="LIKE" color="#4CCC93" />,
                  style: {
                    wrapper: {
                      ...styles.overlayWrapper,
                      alignItems: 'flex-start',
                      marginLeft: 30,
                    },
                  },
                },
              }}></Swiper>
          </View>

          <View style={styles.bottomOptionsContainer}>
            {!swipedAll && (
              <TouchableOpacity
                style={styles.bottomOption}
                onPress={() => {
                  if (!isSwiping && index < cards.length) {
                    setIsSwiping(true);
                    swiperRef.current.swipeLeft();
                    setTimeout(() => {
                      setIsSwiping(false);
                    }, 350);
                  }
                }}>
                <MaterialCommunityIcons
                  name="close-thick"
                  size={36}
                  color="gray"
                />
              </TouchableOpacity>
            )}
            {swipedAll && (
              <TouchableOpacity
                style={styles.bottomOption}
                onPress={() => {
                  undo(swiperRef);
                }}>
                <MaterialCommunityIcons
                  name="refresh"
                  size={36}
                  color={colors.warning}
                />
              </TouchableOpacity>
            )}
            {!swipedAll && (
              <TouchableOpacity
                style={styles.bottomOption}
                onPress={() => {
                  if (!isSwiping && index < cards.length) {
                    setIsSwiping(true);
                    swiperRef.current.swipeRight();
                    setTimeout(() => {
                      setIsSwiping(false);
                    }, 350);
                  }
                }}>
                <MaterialCommunityIcons
                  name="check-bold"
                  size={36}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

export default Discover;
