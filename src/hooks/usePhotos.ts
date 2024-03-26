import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThumbnails, selectCurrentPhoto } from '@features/photos';
import { PhotoI } from '@services';

export const usePhotos = ({ page, album }: { page: number, album: number }) => {
    const photo = useSelector(selectCurrentPhoto);

    const thumbnails = useSelector(selectThumbnails)
    const [albums, setAlbums] = useState([])
    const [organized, setOrganized] = useState({} as { [key: number]: PhotoI[] })
    useEffect(() => {

        const albumSet = new Set();
        const photoMap = {}
        for (const thumbnail of thumbnails) {
            const albumId = thumbnail.albumId;
            if (photoMap[albumId]) {
                photoMap[albumId].push(thumbnail)
            } else {
                photoMap[albumId] = [thumbnail]
            }
            albumSet.add(albumId);
        }
        setAlbums(Array.from(albumSet, albumId => ({ id: albumId, label: albumId })));
        setOrganized(photoMap)

        console.log([Object.keys(organized).length, Object.keys(organized), albums]);
    }, [thumbnails, album]);


    const thumbs = useMemo(() => album > 0 && typeof organized[album] !== 'undefined' ? organized[album] : [], [organized, album])


    return { photo, thumbnails, organized, albums, thumbs };
};
