import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import usePhotosPageStyle from './PhotosSection.style';
import { usePhotos } from '@hooks/usePhotos';
import { usePhotosMutation } from '@services';
import { setPhoto } from './photoSlice';
import { useAppDispatch } from '@hooks';

function PhotosPage() {
    const { classes } = usePhotosPageStyle({});
    const [loadPhotos] = usePhotosMutation()
    const { t } = useTranslation()
    const [album, setAlbum] = useState<number>(0);

    const { photo, thumbnails, albums, organized, thumbs } = usePhotos({ album });
    const dispatch = useAppDispatch();
    const photoRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        loadPhotos()
    }, [loadPhotos])

    const changeAlbum = (id: number) => {
        setAlbum(id)
    }

    const changePhoto = (id: number) => {
        dispatch(setPhoto(id));
    }

    useEffect(() => {
        let handler = (ev: MouseEvent) => {
            // handle click outside of photo
            if (photo && photoRef.current && ev.target && ev?.target?.contains(photoRef.current) && ev?.target !== photoRef.current) {
                // no op
                dispatch(setPhoto(null))
            }
        }

        if (photo) {
            photoRef?.current?.scrollIntoView({ behavior: 'smooth' })

        }

        window.addEventListener('click', handler);

        return () => {
            window.removeEventListener('click', handler);
        }
    }, [photo, photoRef])

    return (<Box className={classes.container}>
        <>
            <Typography paddingBottom={4} variant="h3" color="secondary">
                {t('titles.photos')}
                <small></small>
            </Typography>
            <Typography variant="h4">{t('titles.albums')}</Typography>
            <div className={classes.albums}>
                {
                    albums.map((alb, i) => (
                        <Button variant="text" key={alb.id} onClick={() => changeAlbum(alb.id)}>{alb.label}</Button>
                    ))
                }
            </div>
            <div className={classes.thumbnails}>
                {thumbs.map((photo, pid) => (
                    <img src={photo.thumbnailUrl} key={photo.id} title={photo.title} className={classes.thumbnail} onClick={() => changePhoto(photo.id)} />
                ))}
                {photo ? (
                    <Box className={classes.photo}>
                        <pre>
                            {JSON.stringify(photo, null, 2)}
                        </pre>
                        <img src={photo.url} title={photo.title} ref={photoRef} />
                        <Typography className={classes.caption} variant="body1" color="primary">
                            {photo.title}
                        </Typography>
                    </Box>
                ) : null}
            </div>
        </>
    </Box>)
}

export default PhotosPage;
