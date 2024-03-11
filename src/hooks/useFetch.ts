import { useState, useEffect, SetStateAction } from 'react';

interface FetchResult<Data> {
    data: Data | null;
    loading: boolean;
    error: Error | null;
}

const useFetch = <Data>(url: string): FetchResult<Data> => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: Data = await response.json();
                setData(result);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

        return () => {};
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
