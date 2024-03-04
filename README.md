# react-native-track-cache

caching for react-native-track-player

## Installation

1. Install via npm or yarn
```sh
npm install react-native-track-cache
```
2. Put this into your build.gradle
```gradle
allprojects {
  repositories  {
    maven {
            url "$rootDir/../node_modules/react-native-video-cache/android/libs"
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
