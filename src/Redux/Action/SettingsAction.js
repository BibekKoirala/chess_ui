export const Set_Settings = "Set_Settings";
export const Remove_Settings = "Remove_Settings";
export const Set_Multiplayer = "Set_Multiplayer"


export function setUserSetting(setting) {
    return {
        type: Set_Settings,
        payload: setting
    }
}

export function setMultiplayer(setting) {
    return {
        type: Set_Multiplayer,
        payload: setting
    }
}

export function removeUserSetting() {
    return {
        type: Remove_Settings
    }
}
