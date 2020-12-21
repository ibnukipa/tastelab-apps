import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {navigate} from "@routes/RouterService";

export default function Materials() {
  return (
    <TouchableOpacity onPress={() => navigate('Material')}>
      <Text>Raw Materials</Text>
    </TouchableOpacity>
  );
}
