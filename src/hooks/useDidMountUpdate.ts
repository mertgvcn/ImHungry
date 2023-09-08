import React, { useEffect, useRef } from 'react';

const useDidMountUpdate = (func:Function, deps:Array<any>) => {
    const didMount = useRef(false);
    const didMountStrictMode = useRef(false) //because strict mode renders component twice, i had to add that inner check.

    useEffect(() => {
        if (didMount.current) {
            if(didMountStrictMode.current) {
                func();
            }
            else didMountStrictMode.current = true;
        }
        else didMount.current = true;
    }, deps);
}

export default useDidMountUpdate;