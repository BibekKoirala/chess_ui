export const Set_Settings = "Set_Settings";
export const Remove_Settings = "Remove_Settings";


export function setUserSetting(setting) {
    return {
        type: Set_Settings,
        payload: setting
    }
}

export function removeUserInfo() {
    return {
        type: Remove_Settings
    }
}
