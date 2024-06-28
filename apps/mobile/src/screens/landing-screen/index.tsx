import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { constants } from '../../utils/constants';
import { config } from '../../utils/config';
import { Center } from '@gluestack-ui/themed';
import { logger } from '../../utils/logger';

const LandingScreen = ({ navigation }: any) => {
    const [isServerReachable, setIsServerReachable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkConnection = async () => {
        try {
            const response = await axios.get(config.healthCheckUrl);
            if (response.status === 200) {
                setIsServerReachable(true);
            }
        } catch (error) {
            logger.error(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        checkConnection()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            return navigation.navigate(isServerReachable ? constants.SCREENS.HOME : constants.SCREENS.NETWORK_ERROR);
        }
    }, [isLoading, isServerReachable])

    return (
        <Center>
            {isLoading && <ActivityIndicator />}
        </Center>
    )
}

export { LandingScreen }

const styles = StyleSheet.create({})