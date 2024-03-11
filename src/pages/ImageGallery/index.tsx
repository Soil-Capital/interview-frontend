import React from 'react';
import useFetch from '@hooks/useFetch';
import useImageContainerStyles from './ImageGallery.style';
import SideBar from '../HomePage/SideBar/SideBar';
import { Fab } from '@mui/material';
import TopBar from '../HomePage/TopBar/TopBar';

interface Photo {
    id: number;
    title: string;
    url: string;
}

const ImageGallery = () => {
    const { data, loading, error } = useFetch<Photo[]>(
        'https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10',
    );
    const { classes } = useImageContainerStyles();
    React.useEffect(() => {
        if (!loading && data) {
            console.log('Data loaded:', data);
        }
    }, [data, loading, error]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>Error: {error ? error.message : 'No data available'}</div>;
    }

    return (
        <div>
            <TopBar style={{ height: '45px', marginBottom: '15px' }} />
            <div style={{ display: 'flex' }}>
                <SideBar />
                <div className={classes.container}>
                    {data.map((item: Photo) => (
                        <div key={item.id} className={classes.imageWrapper}>
                            <img src={item.url} alt={item.title} className={classes.image} />
                            <p>{item.title}</p>
                        </div>
                    ))}
                    S
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
