import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const SECTION_HEIGHT = 308;

const COLORS = {
  brandBlue: '#5dc3ec',
  brandPurple: '#591a7e',
  glowPurple: 'rgba(127, 17, 224, 0.25)',
  drawerBackground: 'rgba(0,0,0,0.35)',
  white: '#fff',
  whiteSoft: 'rgba(255,255,255,0.9)',
};

function PlayerScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    RobotoMono: require('../../assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const getOpacity = (index) =>
    scrollY.interpolate({
      inputRange: [
        (index - 1) * SECTION_HEIGHT,
        index * SECTION_HEIGHT,
        (index + 1) * SECTION_HEIGHT,
      ],
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp',
    });

  const getTranslateY = (index) =>
    scrollY.interpolate({
      inputRange: [
        (index - 1) * SECTION_HEIGHT,
        index * SECTION_HEIGHT,
        (index + 1) * SECTION_HEIGHT,
      ],
      outputRange: [50, 0, -30],
      extrapolate: 'clamp',
    });

  const getScale = (index) =>
    scrollY.interpolate({
      inputRange: [
        (index - 1) * SECTION_HEIGHT,
        index * SECTION_HEIGHT,
        (index + 1) * SECTION_HEIGHT,
      ],
      outputRange: [0.96, 1.0, 0.98],
      extrapolate: 'clamp',
    });

  const getStatOpacity = (index) =>
    scrollY.interpolate({
      inputRange: [
        (index - 1) * SECTION_HEIGHT,
        index * SECTION_HEIGHT,
        (index + 1) * SECTION_HEIGHT,
      ],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

  const getTranslateX = (index, side) =>
    scrollY.interpolate({
      inputRange: [
        (index - 1) * SECTION_HEIGHT,
        index * SECTION_HEIGHT,
        (index + 1) * SECTION_HEIGHT,
      ],
      outputRange: side === 'left' ? [-10, 0, 10] : [10, 0, -10],
      extrapolate: 'clamp',
    });

  const image1Opacity = getOpacity(0);
  const image2Opacity = getOpacity(1);
  const image3Opacity = getOpacity(2);

  const image1Scale = getScale(0);
  const image2Scale = getScale(1);
  const image3Scale = getScale(2);

  const stat1TranslateY = getTranslateY(0);
  const stat2TranslateY = getTranslateY(1);
  const stat3TranslateY = getTranslateY(2);

  const stat1Opacity = getStatOpacity(0);
  const stat2Opacity = getStatOpacity(1);
  const stat3Opacity = getStatOpacity(2);

  const stat1TranslateX = getTranslateX(0, 'left');
  const stat2TranslateX = getTranslateX(1, 'right');
  const stat3TranslateX = getTranslateX(2, 'left');

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const headerTextStyle = {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  };

  return (
    <LinearGradient
      colors={[COLORS.brandBlue, COLORS.brandPurple]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 }}>
        <View style={{ flex: 1 }} />
        <Image
          source={require('../../assets/branding/unrivaled-icon.png')}
          style={{ height: 48, resizeMode: 'contain' }}
        />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={toggleMenu} style={{ padding: 14 }}>
            <Text style={headerTextStyle}>{menuOpen ? 'X' : '☰'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {menuOpen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '70%',
            backgroundColor: COLORS.drawerBackground,
            borderLeftWidth: 3,
            borderLeftColor: COLORS.brandBlue,
            paddingHorizontal: 24,
          }}
        >
          <Text style={{ fontFamily: 'RobotoMono', fontSize: 18, color: COLORS.white, paddingVertical: 16 }}>Home</Text>
          <Text style={{ fontFamily: 'RobotoMono', fontSize: 18, color: COLORS.white, paddingVertical: 16 }}>Tour</Text>
          <Text style={{ fontFamily: 'RobotoMono', fontSize: 18, color: COLORS.white, paddingVertical: 16 }}>Players</Text>
        </View>
      )}

      <Animated.ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 40 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 }}>
          <TouchableOpacity>
            <Text style={headerTextStyle}>{'<'}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'RobotoMono', fontSize: 16, color: COLORS.white }}>Caitlin Clark</Text>
          </View>
          <TouchableOpacity>
            <Text style={headerTextStyle}>Follow</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'RobotoMono', fontSize: 14, color: COLORS.whiteSoft }}>
            Wing • Team TBD
          </Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: 'RobotoMono',
              fontSize: 14,
              color: COLORS.whiteSoft,
              textAlign: 'center',
              marginBottom: 6,
            }}
          >
            Next Game: vs TBD    Date/Time: TBD
          </Text>
          <Text
            style={{
              fontFamily: 'RobotoMono',
              fontSize: 14,
              color: COLORS.whiteSoft,
              textAlign: 'center',
              marginBottom: 6,
            }}
          >
            Location: TBD    Watch: TBD    Get Tickets: TBD
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 36, marginBottom: 36, paddingTop: 12 }}>
          <Animated.View
            style={{
              width: 140,
              marginRight: 24,
              opacity: stat1Opacity,
              transform: [{ translateY: stat1TranslateY }, { translateX: stat1TranslateX }],
            }}
          >
            <Text style={{ marginBottom: 7, color: COLORS.white, fontFamily: 'RobotoMono', lineHeight: 20 }}>PPG: 27.5</Text>
          </Animated.View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: 150,
                backgroundColor: COLORS.glowPurple,
              }}
            />
            <Animated.Image
              source={require('../../assets/player/gabby-williams-france-removebg.png')}
              style={{
                width: 260,
                resizeMode: 'contain',
                height: 260,
                opacity: image1Opacity,
                transform: [{ scale: image1Scale }],
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 36, paddingTop: 12 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: 150,
                backgroundColor: COLORS.glowPurple,
              }}
            />
            <Animated.Image
              source={require('../../assets/player/gabby-williams-crossover-removebg.png')}
              style={{
                width: 260,
                resizeMode: 'contain',
                height: 260,
                opacity: image2Opacity,
                transform: [{ scale: image2Scale }],
              }}
            />
          </View>
          <Animated.View
            style={{
              width: 140,
              marginLeft: 24,
              opacity: stat2Opacity,
              transform: [{ translateY: stat2TranslateY }, { translateX: stat2TranslateX }],
            }}
          >
            <Text style={{ marginBottom: 7, color: COLORS.white, fontFamily: 'RobotoMono', lineHeight: 20 }}>APG: 8.2</Text>
          </Animated.View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 36, paddingTop: 12 }}>
          <Animated.View
            style={{
              width: 140,
              marginRight: 24,
              opacity: stat3Opacity,
              transform: [{ translateY: stat3TranslateY }, { translateX: stat3TranslateX }],
            }}
          >
            <Text style={{ color: COLORS.white, fontFamily: 'RobotoMono', lineHeight: 20 }}>RPG: 6.1</Text>
          </Animated.View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: 150,
                backgroundColor: COLORS.glowPurple,
              }}
            />
            <Animated.Image
              source={require('../../assets/player/gabby-williams-layup1-removebg.png')}
              style={{
                width: 260,
                resizeMode: 'contain',
                height: 260,
                opacity: image3Opacity,
                transform: [{ scale: image3Scale }],
              }}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}

export default PlayerScreen;
