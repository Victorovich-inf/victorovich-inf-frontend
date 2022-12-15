import {useCallback, useState} from "react";

export default function useReload() {
    const [reloadValue, setReloadValue] = useState(0);
    const reload = useCallback(() => {
        setReloadValue(reloadValue + 1);
    }, [reloadValue]);

    return {
        reload,
        reloadValue,
    }
}
