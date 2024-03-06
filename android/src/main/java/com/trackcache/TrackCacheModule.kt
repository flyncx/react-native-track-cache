package com.trackcache

import com.danikula.videocache.CacheListener
import com.danikula.videocache.HttpProxyCacheServer
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File


class TrackCacheModule internal constructor(context: ReactApplicationContext) :

  TrackCacheSpec(context), CacheListener {
  private var proxy: HttpProxyCacheServer? = null
  private var listenerCount = 0;
  private var listeners = mutableMapOf<String, String>()

  override fun getName(): String {
    return NAME
  }

  override fun onCacheAvailable(cacheFile: File, url: String, percentsAvailable: Int) {
    val params = Arguments.createMap().apply {
      putInt("percentsAvailable", percentsAvailable)
    }
    sendEvent(url, params)
  }

    private fun sendEvent(eventName: String, params: WritableMap?) {
      this.reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(eventName, params)
    }



  @ReactMethod
  override fun addListener(eventName: String) {
    if (listenerCount == 0) {
      // Set up any upstream listeners or background tasks as necessary
      registerIfNull()
      this.proxy!!.registerCacheListener(this, eventName);
    }
    listenerCount += 1
  }

  @ReactMethod
  override fun removeListeners(count: Int) {
    listenerCount -= count
    if (listenerCount == 0) {
      // Remove upstream listeners, stop unnecessary background tasks
      this.proxy!!.unregisterCacheListener(this)
    }
  }


  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun registerCache(promise: Promise) {
    registerIfNull();
    promise.resolve(0)
  }

  @ReactMethod
  override fun isCached(url: String, promise: Promise) {
    registerIfNull();
    val isCached = this.proxy!!.isCached(url);
    promise.resolve(isCached)
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
