import { useEffect, useRef } from "react"

const useDidMount = (func: Function, deps?: Array<any>) => {
    const didComponentMount = useRef(false)

    useEffect(() => {
        if (!didComponentMount.current) {
            func()
            didComponentMount.current = true
        }
    }, deps)
}

export default useDidMount;