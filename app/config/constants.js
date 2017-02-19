export const APP_NAME = "Annadyanta"
export const APP_VERSION = "1.2.1"
export const STORE_KEY_PREFIX = "DemoApp"
export const GIT_REPO = "https://github.com/priyesh9875/Anaadyanta"
export const GIT_TLICENSE = "https://github.com/priyesh9875/Anaadyanta/blob/master/THIRD_PARTY_LICENSE.md"
export const GIT_CONTRIBUTE = "https://github.com/priyesh9875/Anaadyanta/blob/master/CONTRIBUTE.md"
export const FB_LINK = "https://www.fb.com/anaadyantanmit/"
export const WEB_LINK = "http://anaadyanta.org/"

import { AppColors, AppStyles, AppSizes } from '@theme/';

export function numberToPosition(pos) {
    let position = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
    return position[pos]
}
export default {
    navbarProps: {
        hideNavBar: false,
        titleStyle: AppStyles.navbarTitle,
        navigationBarStyle: AppStyles.navbar,
        leftButtonIconStyle: AppStyles.navbarButton,
        rightButtonIconStyle: AppStyles.navbarButton,
        sceneStyle: {
            backgroundColor: AppColors.background,
            paddingTop: AppSizes.navbarHeight,
        },
    }
}