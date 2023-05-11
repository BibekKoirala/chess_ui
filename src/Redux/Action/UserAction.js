export const Set_UserInfo = "Set_UserInfo";
export const Remove_UserInfo = "Remove_UserInfo";


export function setUserInfo(userInfo) {
    return {
        type: Set_UserInfo,
        payload: userInfo
    }
}

export function removeUserInfo() {
    return {
        type: Remove_UserInfo
    }
}
