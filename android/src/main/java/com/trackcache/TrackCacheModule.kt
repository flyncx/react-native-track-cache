package com.trackcache

import com.danikula.videocache.HttpProxyCacheServer
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod


class TrackCacheModule internal constructor(context: ReactApplicationContext) :



  TrackCacheSpec(context) {
  private var proxy: HttpProxyCacheServer? = null

  override fun getName(): String {
    return NAME
  }

  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun registerCache(promise: Promise) {
    registerIfNull();
    promise.resolve(0)
  }

  @ReactMethod
  override fun getProxyUrl(url: String, promise: Promise) {
    registerIfNull();
    promise.resolve(this.proxy!!.getProxyUrl(url))
  }

  private fun registerIfNull(){
    if (this.proxy == null) {
      this.proxy = HttpProxyCacheServer(this.reactApplicationContext);
    }
  }

  companion object {
    const val NAME = "TrackCache"
  }
}
