package com.trackcache

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class TrackCacheSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun registerCache(promise: Promise)
  abstract  fun getProxyUrl(url: String, promise: Promise)
}
