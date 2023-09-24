export function setCookie(key: string, value: any, daysToLive: number) {
    const date = new Date()
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000)) //convert to ms
    
    let expires = "expires=" + date.toUTCString()
    document.cookie = `${key}=${value}; ${expires};`
} 

export function deleteCookie(key: string) {
    setCookie(key, null, 0)
}

export function getCookie(key: string) {
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArray = decodedCookie.split("; ")
    let result = "";

    cookieArray.forEach(element => {
        if(element.indexOf(key) == 0) {
            result = element.substring(key.length + 1) //+1 for equal sign
        }
    })

    return result;
}


//Customized methods
export function setLastPageOnCookies(value: any) {
    const date = new Date()
    date.setTime(date.getTime() + (0.5 * 24 * 60 * 60 * 1000)) //half day
    
    let expires = "expires=" + date.toUTCString()
    document.cookie = `lastPage=${value}; ${expires};`
} 