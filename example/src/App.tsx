import * as React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import {
  getProxyUrl,
  registerCache,
  useCacheProgress,
} from 'react-native-track-cache';

import setupPlayer from './setup';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

export default function App() {
  const [isRegistered, setRegistered] = React.useState(-1);
  const [url, setUrl] = React.useState<{
    uri: string;
    isProxy: boolean;
  }>({
    uri: 'https://rewave-api.fhx.my.id/player/get/6Ip07GA4aRQ',
    isProxy: false,
  });
  const progress = useCacheProgress(
    'https://rewave-api.fhx.my.id/player/get/6Ip07GA4aRQ'
  );
  React.useEffect(() => {
    console.log(progress);
  }, [progress]);

  const [playerState, setPlayerState] = React.useState<State | null>(null);

  useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackError], (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  React.useEffect(() => {
    setupPlayer();
    registerCache().then((n) => setRegistered(n));
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 32,
        }}
      >
        Cache Registered? {isRegistered === 0 ? 'Yes' : `No(${isRegistered})`}
      </Text>
      <Button
        title="Register"
        onPress={async () => setRegistered(await registerCache())}
      />
      <Text
        style={{
          fontSize: 24,
        }}
      >
        URL: {url.uri}
      </Text>
      <Button
        title="Get Proxied URL"
        onPress={async () => {
          if (!url.isProxy) {
            setUrl({
              isProxy: true,
              uri: await getProxyUrl(url.uri),
            });
          }
        }}
      />
      <Button
        title="Get Un-Proxied URL"
        onPress={async () => {
          if (url.isProxy) {
            setUrl({
              isProxy: false,
              uri: 'https://rewave-api.fhx.my.id/player/get/6Ip07GA4aRQ',
            });
          }
        }}
      />
      <Text
        style={{
          fontSize: 24,
        }}
      >
        PlaybackState: {playerState === null ? 'unknown' : playerState}
      </Text>
      <Button
        title="Play"
        onPress={async () => {
          await TrackPlayer.add([
            {
              url: url.uri,
            },
          ]);
          await TrackPlayer.play();
        }}
      />
      <Button
        title="Unload"
        onPress={async () => {
          await TrackPlayer.stop();
          await TrackPlayer.setQueue([]);
        }}
      />
    </ScrollView>
  );
}
