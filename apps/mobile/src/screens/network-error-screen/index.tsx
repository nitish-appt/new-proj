import { StyleSheet, } from 'react-native'
import React from 'react'
import { Box, Center, ScrollView, Text, VStack } from '@gluestack-ui/themed'

const NetworkErrorScreen = () => {
    return (
        <Box
            flex={1}
            sx={{
                _light: { bg: "white" },
                _dark: { bg: "$backgroundDark950" },
            }}
        >
            <Center sx={{ bg: "$red200", flex: 1 }}>
                <Text>Error in connecting to the network</Text>
            </Center>
        </Box>
    )
}

export { NetworkErrorScreen }

const styles = StyleSheet.create({})