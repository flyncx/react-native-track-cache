import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-track-cache' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const TrackCacheModule = isTurboModuleEnabled
  ? require('./NativeTrackCache').default
  : NativeModules.TrackCache;

const TrackCache = TrackCacheModule
  ? TrackCacheModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function registerCache(): Promise<number> {
  return TrackCache.registerCache();
}
export function getProxyUrl(url: string): Promise<string> {
  return TrackCache.getProxyUrl(url);
}
export function isCached(url: string): Promise<boolean> {
  return TrackCache.isCached(url);
}
export function useCacheProgress(url: string) {
  const [percent, setPercent] = useState<null | number>(null);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(TrackCache);
    let eventListener = eventEmitter.addListener(url, async (event) => {
      setPercent(event.percentsAvailable);
    });

    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
  }, [url, setPercent]);

  return percent;
}
