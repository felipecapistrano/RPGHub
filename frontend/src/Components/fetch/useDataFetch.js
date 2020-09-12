import { useState, useEffect } from "react"
import axios from "axios"

import baseUrl from "./url"

function useDataFetch(endpoint) {
    const [data, setData] = useState()
    const [url, setUrl] = useState(baseUrl + endpoint)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)
            try {
                const result = await axios(url)
                setData(result.data)
            }catch(error) {
                setIsError(true)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    return [{data, isLoading, isError}, setUrl]
}

export default useDataFetch