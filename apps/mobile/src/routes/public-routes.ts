import { SignInScreen, SignUpScreen, TestScreen } from "../screens";
import { constants } from "../utils/constants";

const publicRoutes = [
    {
        name: constants.SCREENS.TEST,
        component: TestScreen
    },
    {
        name: constants.SCREENS.SIGN_IN,
        component: SignInScreen
    }, {
        name: constants.SCREENS.SIGN_UP,
        component: SignUpScreen
    }
];
export { publicRoutes }