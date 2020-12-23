import React from 'react';
import {TouchableOpacity} from 'react-native';
import {debounce} from 'lodash-es';
import * as Haptics from "expo-haptics";

const Touchable = ({children, hasHaptic, onPress, isDisabled, activeOpacity = 0.8, ...props}) => (
  <TouchableOpacity
    disabled={!onPress || isDisabled}
    activeOpacity={activeOpacity}
    onPress={
      onPress
        ? () => {
          if (hasHaptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          if (onPress instanceof Function)
            debounce(onPress, 300, {leading: true, trailing: false})();
        }
        : null
    }
    {...props}
  >
    <>
      {children}
    </>
  </TouchableOpacity>
);

export default Touchable;
