import { HomeScreen, LandingScreen, NetworkErrorScreen } from "../screens";
import { constants } from "../utils/constants";

type RouteType = {
    name: string;
    component: any;
    default: boolean;
}
let privateRoutes: RouteType[] = [
    {
        name: constants.SCREENS.LANDING,
        component: LandingScreen,
        default: true
    },
    {
        name: constants.SCREENS.HOME,
        component: HomeScreen,
        default: false
    },
    {
        name: constants.SCREENS.NETWORK_ERROR,
        component: NetworkErrorScreen,
        default: false
    },
];
privateRoutes = privateRoutes.sort((a, b) => (Number(b.default) - Number(a.default)))
export { privateRoutes }