import {
    Alert
} from "react-native"


export const SNAPSHOT_NULL = "SNAPSHOT_NULL"
export const AUTH_ERROR = {
    APP_DELETED: "auth/app-deleted",
    APP_NOT_AUTHORIZED: "auth/app-not-authorized",
    ARGUMENT_ERROR: "auth/argument-error",
    INVALID_API_KEY: "auth/invalid-api-key",
    INVALID_USER_TOKEN: "auth/invalid-user-token",
    NETWORK_REQUEST_FAILED: "auth/network-request-failed",
    OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
    REQUIRES_RECENT_LOGIN: "auth/requires-recent-login",
    TOO_MANY_REQUESTS: "auth/too-many-requests",
    UNAUTHORIZED_DOMAIN: "auth/unauthorized-domain",
    USER_DISABLED: "auth/user-disabled",
    USER_TOKEN_EXPIRED: "auth/user-token-expired",
}


export function alertError(message = "Error occured", code = "DEFAULT") {
    alert(`${message} : ${code}`)
}


export function handleAuthError(err) {
    let message = ""
    switch (err.code) {
        case AUTH_ERROR.APP_DELETED:
            message = "App deleted. This app will not work ever"
            break;

        case AUTH_ERROR.NETWORK_REQUEST_FAILED:
            message = "Unable to reach the server. Please check your internet connection or restart the app"
            break;

        default:
            message = "Unknown error: " + JSON.stringify(err)
            break;

    }

    Alert.alert(
        "Error",
        message
    )
}
