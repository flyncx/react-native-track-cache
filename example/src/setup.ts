import TrackPlayer from 'react-native-track-player';
export default async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer();
  } catch (error) {}
}
