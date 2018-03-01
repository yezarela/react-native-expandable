import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

/**
 * Expandable container for react-native
 */
export default class Expandable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      animation: new Animated.Value(null),
      iconAnimation: new Animated.Value(0),
      contentHeight: 0,
      expanded: true,
      init: false
    };
  }

  toggle() {
    let initialValue = this.state.expanded ? this.state.contentHeight : 0,
      finalValue = this.state.expanded ? 0 : this.state.contentHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.timing(this.state.animation, {
      toValue: finalValue,
      duration: 300
    }).start();

    let initialValue2 = this.state.expanded ? 0 : 1,
      finalValue2 = this.state.expanded ? 1 : 0;

    this.state.iconAnimation.setValue(initialValue2);
    Animated.timing(this.state.iconAnimation, {
      toValue: finalValue2,
      duration: 300
    }).start();
  }

  initcontentHeight(event) {
    const height = event.nativeEvent.layout.height;

    if (this.state.contentHeight === 0 && !this.props.collapsed) {
      this.setState({ contentHeight: height, init: true });

      Animated.timing(this.state.animation, {
        toValue: height,
        duration: 300
      }).start();
    }

    if (this.state.contentHeight === 0 && this.props.collapsed) {
      this.setState({ init: true, contentHeight: height, expanded: false });
      this.toggle();
    }
  }

  render() {
    const { animation, expanded, contentHeight, init } = this.state;
    const { title } = this.props;

    let contentStyle = {};
    if (init) {
      contentStyle = {
        height: animation,
        opacity: this.state.iconAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.5, 0]
        }),
      };
    }

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.toggle()}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          >
            <Animated.Image
              source={require('./arrow_up.png')}
              style={{
                width: 20,
                height: 20,
                opacity: this.state.iconAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0.5, 1]
                }),
                transform: [
                  {
                    rotateX: this.state.iconAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg']
                    })
                  }
                ]
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Animated.View
            style={{
              overflow: 'hidden',
              ...contentStyle
            }}
          >
            <View onLayout={event => this.initcontentHeight(event)}>
              {this.props.children}
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}
