import EncryptedStorage from 'react-native-encrypted-storage';
import errorMessages from '../../i18n/errors-messages';
import messages from '../../i18n/messages';
import { useEffect, useState } from 'react';
import { constants } from '../../utils/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../i18n';
import { logger } from '../../utils/logger';
import { NavigationContainer } from '@react-navigation/native';
import { privateRoutes, publicRoutes } from '../../routes';
import { Provider, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import * as UserActions from "../../redux/actions/user-actions";

const Stack = createNativeStackNavigator();
const AppStack = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const mapFunction = (route) => <Stack.Screen key={route.name} name={route.name} component={route.component} />
    const dispatch = useDispatch();

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = EncryptedStorage.getItem(constants.KEYS.USER_TOKEN)
                if (!userToken) {
                    logger.info("User Token ", userToken)
                    dispatch(UserActions.restoreTokenStart(userToken))
                }
            } catch (error) {
                logger.error(error);
            }
        };
        bootstrapAsync()
    }, [])
    return (
        <NavigationContainer>
            <IntlProvider
                locale={LOCALES.ENGLISH}
                messages={{
                    ...messages[LOCALES.ENGLISH],
                    ...errorMessages[LOCALES.ENGLISH],
                }}>
                <Stack.Navigator>
                    {isLoggedIn ?
                        privateRoutes.map(mapFunction) :
                        publicRoutes.map(mapFunction)}
                </Stack.Navigator>
            </IntlProvider>
        </NavigationContainer>
    )
}

export default AppStack

const styles = StyleSheet.create({})