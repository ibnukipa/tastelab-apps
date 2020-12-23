import React  from 'react';
import { TouchableHighlight } from 'react-native';
import { debounce } from 'lodash-es';

import ColorConstant from "@constants/color";

const Touchable = ({ children, hasHaptic, onPress, ...props }) => (
  <TouchableHighlight
    disabled={!onPress}
    activeOpacity={1}
    underlayColor={ColorConstant.grayDimmed}
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
  </TouchableHighlight>
);

export default Touchable;
