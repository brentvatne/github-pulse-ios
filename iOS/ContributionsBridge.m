// CalendarManagerBridge.m
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Contributions, NSObject)

RCT_EXTERN_METHOD(fetch:(NSString *)username completionBlock:(RCTResponseSenderBlock)completionBlock)

@end
