
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTrackCacheSpec.h"

@interface TrackCache : NSObject <NativeTrackCacheSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TrackCache : NSObject <RCTBridgeModule>
#endif

@end
