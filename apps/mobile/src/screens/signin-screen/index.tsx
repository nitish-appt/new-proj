import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AddIcon, AlertCircleIcon, Box, Button, ButtonIcon, ButtonText, Center, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Input, InputField } from '@gluestack-ui/themed'
import { constants } from '../../utils/constants'
import ApptLogo from "../../assets/appt-logo.svg";

const SignInScreen = ({ navigation }: any) => {
    const handleRegistration = () => navigation.navigate(constants.SCREENS.SIGN_UP)
    return (
        <Center flex={1}>
            <Box w="$72">
                <ApptLogo height={200} width={300} fill={"#E5E5E5"} />
                <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={true} >
                    <FormControlLabel mb='$1'>
                        <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            type="text"
                            defaultValue=""
                            placeholder="mail@work-email.com"
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
                <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={true} >
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
                <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    mt={"$2"}
                    isDisabled={false}
                    isFocusVisible={false}
                >
                    <ButtonText>Login</ButtonText>
                </Button>
                <Button
                    size="lg"
                    variant="solid"
                    mt={"$2"}
                    action="secondary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={handleRegistration}
                >
                    <ButtonText>Register</ButtonText>
                </Button>
            </Box>
        </Center>
    )
}

export { SignInScreen }

const styles = StyleSheet.create({})