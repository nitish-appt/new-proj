import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Center, Text } from '@gluestack-ui/themed'

const HomePageScreen = () => {
  return (
        <Center bg="$primary500" h={200} w={300}>
            <Text color="white" fontWeight="$bold">
                This is the center.
            </Text>
        </Center>
    )
};
export { HomePageScreen };

const styles = StyleSheet.create({})