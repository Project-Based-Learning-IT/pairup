import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  ActivityIndicator,
  Linking,
  TouchableOpacity
} from 'react-native';
import { useTheme } from 'react-native-paper';

function LinkPreview(props) {
  const {link, isSent} = props;

  const {colors} = useTheme();

  const [isLoading, setIsLoading] = React.useState(true);
  const [metaData, setMetaData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://v1.nocodeapi.com/siddheshkothadi/link_preview/ziLmWtRKBcPxdvJJ?url=${link}`,
      );
      const data = await response.json();
      console.log(data);
      setMetaData(data);
      // const response = {
      //   author: null,
      //   date: "2018-03-01T12:00:00.000Z",
      //   description: "Online payment processing for internet businesses. Stripe is a suite of payment APIs that powers commerce for online businesses of all sizes, including fraud prevention, and subscription management. Use Stripe’s payment platform to accept and process payments online for easy-to-use commerce solution…",
      //   image: "https://images.ctfassets.net/fzn2n1nzq965/3AGidihOJl4nH9D1vDjM84/9540155d584be52fc54c443b6efa4ae6/homepage.png?q=80",
      //   logo: "https://logo.clearbit.com/stripe.com",
      //   publisher: "Stripe",
      //   title: "Online payment processing for internet businesses - Stripe",
      //   url: "https://stripe.com/en-in"
      // };
      // setMetaData(response);
      setIsLoading(false);
    };

    fetchData();
  }, [link]);

  return isLoading ? (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={isSent ? colors.primary : 'white'} />
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(metaData.url).catch(error =>
          console.warn('An error occurred: ', error),
        );
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 4,
          backgroundColor: isSent ? '#fafafa' : colors.primary,
          borderRadius: 14,
        }}>
        {metaData?.logo && <Image
          style={{
            resizeMode: 'contain',
            height: 48,
            width: 48,
            borderRadius: 14,
          }}
          source={{
            uri: metaData?.logo,
          }}></Image>
        }
        <View
          style={{
            paddingLeft: 8,
          }}>
          {metaData?.publisher && <Text 
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: isSent ? colors.primary : colors.textWhite,
              fontWeight: 'bold',
            }}
          >{metaData?.publisher}</Text>}
          {metaData?.title && <Text 
            numberOfLines={1}
            style={{
              fontSize: 10,
              color: colors.textLightBlack,
              fontWeight: 'bold',
            }}
          >{metaData?.title}</Text>}
          {metaData?.url && <Text 
            numberOfLines={1}
            style={{
              fontSize: 10,
              color: colors.textLightBlack,
              fontWeight: 'bold',
            }}  
          >{metaData?.url}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default LinkPreview;
