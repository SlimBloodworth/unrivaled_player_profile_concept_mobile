import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// How tall the fixed "stage" box is on screen (holds the crossfading images + stats).
const STAGE_HEIGHT = 340;
// How much drag distance inside the stage equals one full image-to-image transition.
const STAGE_STEP = 300;

const COLORS = {
  brandBlue: '#5dc3ec',
  white: '#fff',
  whiteSoft: 'rgba(255,255,255,0.9)',
  pageBackground: '#17181c',
};

// Bottom nav: 4 core destinations + a "More" catch-all for everything else.
// icon/iconOutline are Ionicons names; outline shows when inactive, filled when active.
const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { key: 'games', label: 'Games', icon: 'basketball', iconOutline: 'basketball-outline' },
  { key: 'clubs', label: 'Clubs', icon: 'shield', iconOutline: 'shield-outline' },
  { key: 'players', label: 'Players', icon: 'people', iconOutline: 'people-outline' },
  { key: 'more', label: 'More', icon: 'ellipsis-horizontal', iconOutline: 'ellipsis-horizontal-outline' },
];

// The 3 player photos, in display order. Metro needs require() paths written
// literally (not built from a variable), so each call stays spelled out here —
// only the fact that they're collected into one array is what's new.
const IMAGE_SOURCES = [
  require('../../assets/player/gabby-williams-france-removebg.png'),
  require('../../assets/player/gabby-williams-crossover-removebg.png'),
  require('../../assets/player/gabby-williams-layup1-removebg.png'),
];

// The 3 stats, in the same order as the images, with which side each one sits on.
const STAT_ITEMS = [
  { text: 'PPG: 27.5', side: 'left' },
  { text: 'APG: 8.2', side: 'right' },
  { text: 'RPG: 6.1', side: 'left' },
];

function PlayerScreen() {
  // Defaults to "players" since that's what this screen shows. Tapping other
  // items just highlights them for now — no real navigation is wired up yet.
  const [activeTab, setActiveTab] = useState('players');
  const stageScrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    RobotoMono: require('../../assets/fonts/RobotoMono-VariableFont_wght.ttf'),
    'RobotoMono-Bold': require('../../assets/fonts/RobotoMono-Bold.ttf'),
  });

  const handleStageScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: stageScrollY } } }],
    { useNativeDriver: true }
  );

  // Every animated value in the stage (image opacity/scale, stat position, dots)
  // follows the same "fade in, hold, fade out" shape across one STAGE_STEP window
  // per index — these five helpers are called inline per item instead of being
  // pre-assigned to separate named variables for each of the 3 images/stats/dots.
  const getOpacity = (index) =>
    stageScrollY.interpolate({
      inputRange: [(index - 1) * STAGE_STEP, index * STAGE_STEP, (index + 1) * STAGE_STEP],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

  const getTranslateY = (index) =>
    stageScrollY.interpolate({
      inputRange: [(index - 1) * STAGE_STEP, index * STAGE_STEP, (index + 1) * STAGE_STEP],
      outputRange: [50, 0, -30],
      extrapolate: 'clamp',
    });

  const getScale = (index) =>
    stageScrollY.interpolate({
      inputRange: [(index - 1) * STAGE_STEP, index * STAGE_STEP, (index + 1) * STAGE_STEP],
      outputRange: [0.96, 1.0, 0.98],
      extrapolate: 'clamp',
    });

  const getStatOpacity = (index) =>
    stageScrollY.interpolate({
      inputRange: [(index - 1) * STAGE_STEP, index * STAGE_STEP, (index + 1) * STAGE_STEP],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

  const getTranslateX = (index, side) =>
    stageScrollY.interpolate({
      inputRange: [(index - 1) * STAGE_STEP, index * STAGE_STEP, (index + 1) * STAGE_STEP],
      outputRange: side === 'left' ? [-40, 0, 40] : [40, 0, -40],
      extrapolate: 'clamp',
    });

  const getDotOpacity = (index) =>
    stageScrollY.interpolate({
      inputRange: [(index - 1) * STAGE_STEP, index * STAGE_STEP, (index + 1) * STAGE_STEP],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const headerTextStyle = {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.pageBackground }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 14 + insets.top, paddingBottom: 14, paddingHorizontal: 16 }}>
        <View style={{ flex: 1 }} />
        <Image
          source={require('../../assets/branding/unrivaled-icon.png')}
          style={{ height: 48, resizeMode: 'contain' }}
        />
        <View style={{ flex: 1 }} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 90 + insets.bottom }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
          <TouchableOpacity>
            <Text style={headerTextStyle}>{'<'}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'RobotoMono-Bold',
                fontSize: 16,
                color: COLORS.white,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              Gabby Williams
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'RobotoMono', fontSize: 14, color: COLORS.whiteSoft }}>
            Wing • Team TBD
          </Text>
        </View>

        <View style={{ marginTop: 12, marginBottom: 12 }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              paddingVertical: 6,
              paddingHorizontal: 20,
              borderRadius: 18,
              backgroundColor: COLORS.pageBackground,
              borderWidth: 1.5,
              borderColor: COLORS.white,
            }}
          >
            <Text
              style={{
                fontFamily: 'RobotoMono-Bold',
                fontSize: 13,
                color: COLORS.white,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Follow Gabby
            </Text>
          </TouchableOpacity>
        </View>

        {/* The "stage": one fixed box on screen. Images crossfade inside it and
            stats slide in/out from the sides, all driven by dragging inside this
            box only — nothing above or below it moves. */}
        <View style={{ height: STAGE_HEIGHT, marginTop: 16 }}>
          {/* Invisible scroll track: captures the drag gesture, renders nothing itself. */}
          <Animated.ScrollView
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            contentContainerStyle={{ height: STAGE_HEIGHT + STAGE_STEP * 2 }}
            onScroll={handleStageScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            snapToInterval={STAGE_STEP}
            decelerationRate="fast"
          />

          {/* Images: all three stacked at the exact same spot, crossfading via opacity. */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            pointerEvents="none"
          >
            {IMAGE_SOURCES.map((source, index) => (
              <Animated.Image
                key={index}
                source={source}
                style={{
                  position: 'absolute',
                  width: 260,
                  height: 260,
                  resizeMode: 'contain',
                  opacity: getOpacity(index),
                  transform: [{ scale: getScale(index) }],
                }}
              />
            ))}
          </View>

          {/* Stats: pinned to the left or right edge of the stage, sliding in/out. */}
          {STAT_ITEMS.map((stat, index) => (
            <Animated.View
              key={stat.text}
              style={{
                position: 'absolute',
                [stat.side]: 0,
                top: '50%',
                marginTop: -12,
                width: 140,
                opacity: getStatOpacity(index),
                transform: [
                  { translateY: getTranslateY(index) },
                  { translateX: getTranslateX(index, stat.side) },
                ],
              }}
              pointerEvents="none"
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: 'RobotoMono',
                  lineHeight: 20,
                  textAlign: stat.side === 'right' ? 'right' : 'left',
                }}
              >
                {stat.text}
              </Text>
            </Animated.View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: COLORS.white,
                marginHorizontal: 4,
                opacity: getDotOpacity(index),
              }}
            />
          ))}
        </View>
      </View>

      {/* Bottom nav bar: 4 core items + More. Tapping just highlights for now —
          no real screen navigation is wired up yet. */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10 + insets.bottom,
          backgroundColor: COLORS.pageBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.brandBlue,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setActiveTab(item.key)}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Ionicons
                name={isActive ? item.icon : item.iconOutline}
                size={22}
                color={isActive ? COLORS.white : COLORS.whiteSoft}
              />
              <Text
                style={{
                  fontFamily: 'RobotoMono',
                  fontSize: 10,
                  color: isActive ? COLORS.white : COLORS.whiteSoft,
                  marginTop: 2,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default PlayerScreen;