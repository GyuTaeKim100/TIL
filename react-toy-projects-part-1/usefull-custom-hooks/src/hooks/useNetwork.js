import { useEffect, useState, useRef } from "react"
const useNetwork = (onChange) => {
    const [status, setStatus] = useState(navigator.onLine)
    useEffect(()=> {
        window.addEventListener("online", handleChange)
        window.addEventListener("offline", handleChange)

        return () => {
            window.removeEventListener('online', handleChange)
            window.removeEventListener("offline", handleChange)
        }
    }, [])
    const handleChange = () => {
        if(typeof onChange ==='function') {
            onChange(navigator.onLine)
        }
        setStatus(navigator.onLine)
    }
    return status
}

export default useNetwork