import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThumbnails, selectCurrentPhoto } from '@features/photos';
import { PhotoI, CollectionT } from '@services';

export const usePhotos = ({ album }: { album: number }) => {
    const photo = useSelector(selectCurrentPhoto);

    const thumbnails = useSelector(selectThumbnails)
    const [albums, setAlbums] = useState<{ id: number, label: string }[]>([]);
    const [organized, setOrganized] = useState({} as CollectionT)

    useEffect(() => {
        const albumSet = new Set<number>();
        const photoMap = {} as CollectionT
        for (const thumbnail of thumbnails) {
            const albumId = thumbnail.albumId;
            if (photoMap[albumId]) {
                photoMap[albumId].push(thumbnail)
            } else {
                photoMap[albumId] = [thumbnail]
            }
            albumSet.add(albumId);
        }

        // Get unique album ids
        setAlbums(Array.from(albumSet, (albumId: number) => ({ id: albumId, label: <unknown>albumId as string })));

        // store map for easier retrieval
        setOrganized(photoMap)

    }, [thumbnails, album]);


    const thumbs = useMemo(() => album > 0 && typeof organized[album] !== 'undefined' ? organized[album] : [], [organized, album])


    return { photo, thumbnails, organized, albums, thumbs };
};
