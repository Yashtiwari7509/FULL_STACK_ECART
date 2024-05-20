import React from 'react'
import { useCookies } from 'react-cookie'
const useGetToken = () => {
    const [cookies,_] = useCookies()
    return { headers: { authorization: cookies.accessToken }};
}

export default useGetToken