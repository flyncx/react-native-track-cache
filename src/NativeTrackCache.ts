import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  registerCache(): Promise<number>;
  getProxyUrl(url: string): Promise<string>;
  isCached(url: string): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TrackCache');
