import React from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {PaddingSizeConstant} from "@constants/size";
import Text from "@components/Text";
import ColorConstant from "@constants/color";
import Divider from "@components/Divider";

const ListEmpty = ({ listState }) => {
  const { hasError, isLoading } = listState
  return (
    <View style={styles.container}>
      {isLoading && !hasError
        ? <ActivityIndicator/>
        : hasError
          ? (
            <View style={styles.error}>
              <Text color={ColorConstant.blueGray}>Couldn't fetch the data. We do apologize.</Text>
              <Divider />
              <Text>Pull To Refresh</Text>
            </View>
          )
          : <Text color={ColorConstant.blueGray}>No data available</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: PaddingSizeConstant.large,
    paddingHorizontal: PaddingSizeConstant.medium
  },
  error: {
    alignItems: 'center',
  }
})

export default ListEmpty
