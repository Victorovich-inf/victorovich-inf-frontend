import Typography from "@mui/material/Typography";
import React, { useCallback, useMemo, useState } from "react";

function useLoader(loadingDefault = true, errorDefault = false) {
    const [loading, _setLoading] = useState(loadingDefault);
    const [error, _setError] = useState(errorDefault);

    const setError = useCallback((message) => {
        _setLoading(false); // Ведь нет ситуаций когда есть ошибка, но ещё не окончилась загрузка?
        _setError(message);
    }, []);

    const setLoading = useCallback((state) => {
        _setLoading(state);
        _setError(false);
    }, []);

    const start = useCallback(() => setLoading(true), [setLoading]);
    const stop = useCallback(() => setLoading(false), [setLoading]);

    const Preloader = useCallback((props) => {
        if (error) return <Typography color={"textSecondary"}>{error}</Typography>;
        if (!loading) return null;
        return "Загрузка...";
    }, [error, loading]);

    const render = useCallback((children) => {
        if (error) return <Typography color={"textSecondary"}>{error}</Typography>;
        if (loading) return "Загрузка...";
        return children;
    }, [error, loading]);

    return useMemo(() => ({
            loading,
            error,
            setLoading,
            setError,
            Preloader,
            render,
            start,
            stop,
        }
    ), [
        loading,
        error,
        setLoading,
        setError,
        Preloader,
        render,
        start,
        stop,
    ]);
}

export default useLoader;
