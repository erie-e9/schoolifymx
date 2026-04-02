import { useState } from 'react';

const usePost = (url: RequestInfo | URL) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // The function to trigger the POST request, accepting the body data
    const postData = async (body: any, headers: any) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers || {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            // Handle HTTP errors
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    };

    // Return the post function and relevant state for component use
    return { postData, data, error, loading };
};

export default usePost;
