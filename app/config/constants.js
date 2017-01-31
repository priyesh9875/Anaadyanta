export const APP_NAME = "Annadyanta"
export const APP_VERSION = "1.0.0"
export const STORE_KEY_PREFIX = "DemoApp"

import { AppColors, AppStyles, AppSizes } from '@theme/';

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