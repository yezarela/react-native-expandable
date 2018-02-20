# React Native Expandable

[![npm version](https://badge.fury.io/js/react-native-expandable.svg)](https://badge.fury.io/js/react-native-expandable)

Expandable/collapsible container for react-native

## Installation

```
yarn add react-native-expandable
```

## Props

| Prop Name   | Value   |
| :---------- | :------ |
| `title`     | string  |
| `collapsed` | boolean |

## Usage

```jsx
import Expandable from 'react-native-expandable';


<ScrollView showsVerticalScrollIndicator={false}>
  <View style={{ height: '100%' }}>
    <Expandable title="Amazing Title" collapsed={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text>Amazing!</Text>
        </View>
      </View>
    </Expandable>
  </View>
</ScrollView>;

```
