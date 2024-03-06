package com.trackcache

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import java.io.File

abstract class TrackCacheSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun registerCache(promise: Promise)
  abstract  fun getProxyUrl(url: String, promise: Promise)
  abstract fun isCached(url: String, promise: Promise)

  abstract fun onCacheAvailable(cacheFile: File, url:String, percentsAvailable: Int)
  abstract fun addListener(eventName: String)
  abstract fun removeListeners(count: Int)
}
