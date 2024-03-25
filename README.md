# react-native-track-cache

caching for react-native-track-player android.

## Installation

1. Install via npm or yarn
```sh
yarn add react-native-track-cache
```
2. Put this into your build.gradle
```gradle
allprojects {
  repositories  {
    maven {
            url "$rootDir/../node_modules/react-native-track-cache/android/libs"
    }
  }
}
```

## Usage

```js
import { multiply } from 'react-native-track-cache';

// ...

const result = await multiply(3, 7);
```

## License

MIT

---

## Attribution

This library uses [danikula's AndroidVideoCache](https://github.com/danikula/AndroidVideoCache)

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
