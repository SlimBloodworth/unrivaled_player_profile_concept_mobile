# Unrivaled Player Profile — Concept (Mobile)

A React Native + Expo concept screen for the Unrivaled Basketball app, built around a
single player's profile. The centerpiece is a scroll-driven image "stage" — three
player photos crossfade in place as the user swipes, each paired with a stat callout
that slides in from the side, with page-indicator dots and snap-to-image scrolling.

This project was built as a self-directed learning exercise and portfolio piece,
and is not affiliated with or endorsed by Unrivaled Basketball.

## Features

- Fixed header with the Unrivaled logo, safe-area aware (clears notches/camera cutouts)
- Player name, team, and a "Follow" call-to-action button
- Next game info block (opponent, date/time, location, broadcast, tickets)
- Scroll-driven image gallery:
  - Three photos crossfade in the same fixed spot on screen
  - Associated stat (PPG / APG / RPG) slides in from the left or right as its photo comes to front
  - Scroll snaps cleanly to each image rather than free-scrolling
  - Page-indicator dots show which image is active
- Bottom tab navigation (Home, Games, Clubs, Players, More) with filled/outline icon states
- Custom brand font (Roboto Mono, regular + a bold weight instanced from the variable font file)

## Tech Stack

- [React Native](https://reactnative.dev/) — mobile app framework
- [Expo](https://expo.dev/) (SDK 57) — build/run tooling and managed workflow
- [Expo Font](https://docs.expo.dev/versions/latest/sdk/font/) — loading custom typefaces
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/) (Ionicons) — bottom nav icons
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) — safe-area-aware layout
- React Native's built-in `Animated` API — all scroll-driven crossfade/slide animation, no animation library dependency
- [Claude](https://claude.com) (Anthropic) — used as an AI pair-programming assistant throughout development: iterating on the animation logic, debugging layout/safe-area issues, and cleaning up/DRYing the final code

## Project Structure

```
.
├── App.js                      # Entry point; renders PlayerScreen inside SafeAreaProvider
├── src/
│   └── screens/
│       └── PlayerScreen.js     # The player profile screen (all current functionality)
├── assets/
│   ├── branding/                # Unrivaled logo
│   ├── player/                  # Player photos
│   └── fonts/                   # Roboto Mono variable font + extracted bold weight
└── package.json
```

## Running This Project

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- The [Expo Go](https://expo.dev/go) app installed on a physical iOS or Android phone
  (easiest way to preview), **or** Xcode (iOS Simulator) / Android Studio (Android Emulator)
  if you'd rather run it on a simulator

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/SlimBloodworth/unrivaled_player_profile_concept_mobile.git
   cd unrivaled_player_profile_concept_mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Expo development server:
   ```
   npx expo start
   ```

4. Preview the app:
   - **On your phone (recommended):** open Expo Go and scan the QR code shown in the
     terminal (phone and computer must be on the same Wi-Fi network). This is the
     primary target platform and where the swipe/scroll interactions are tuned for.
   - **In a browser:** with the dev server running, press `w` in the terminal. This
     runs through React Native Web — most of the UI renders the same, but the image
     gallery's drag-to-scroll interaction was built and tested for a touchscreen, so
     a mouse-drag may feel slightly different than it does on a phone.

## Known Limitations / Next Steps

- Bottom nav items (Home, Games, Clubs, etc.) currently only highlight on tap —
  real screen-to-screen navigation isn't wired up yet
- Player stats, team, and next-game details are placeholder data pending a real data source
- The brand gradient/glow effects explored during development were simplified in favor
  of a flat background, since React Native has no built-in radial gradient or blur;
  a true version of either would need an additional library (`react-native-svg` or `expo-blur`)

## License

See [`LICENSE`](./LICENSE) for details.