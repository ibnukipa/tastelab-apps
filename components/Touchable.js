import React  from 'react';
import { TouchableOpacity } from 'react-native';
import { debounce } from 'lodash-es';

const Touchable = ({ children, hasHaptic, onPress, activeOpacity = 0.8, ...props }) => (
  <TouchableOpacity
    disabled={!onPress}
    activeOpacity={activeOpacity}
    onPress={
      onPress
        ? () => {
            if (onPress instanceof Function)
              debounce(onPress, 300, { leading: true, trailing: false })();
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
