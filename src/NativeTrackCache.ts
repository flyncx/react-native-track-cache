import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  registerCache(): Promise<number>;
  getProxyUrl(url: string): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TrackCache');
