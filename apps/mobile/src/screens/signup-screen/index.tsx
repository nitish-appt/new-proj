import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    AlertCircleIcon, Box, Center, FormControl, FormControlError, FormControlErrorIcon,
    FormControlErrorText,
    FormControlHelper, FormControlHelperText, FormControlLabel,
    FormControlLabelText, Input, InputField
} from '@gluestack-ui/themed'

const SignUpScreen = () => {
    return (
        <Center flex={1}>
            <Box h="$32" w="$72">
                <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false} >
                    <FormControlLabel mb='$1'>
                        <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            type="password"
                            defaultValue="12345"
                            placeholder="password"
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText>
                            Must be atleast 6 characters.
                        </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                        />
                        <FormControlErrorText>
                            Atleast 6 characters are required.
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
            </Box>
        </Center>
    )
}

export { SignUpScreen }

const styles = StyleSheet.create({})