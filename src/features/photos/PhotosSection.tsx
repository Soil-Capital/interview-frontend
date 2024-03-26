import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import usePhotosPageStyle from './PhotosSection.style';
import { usePhotos } from '@hooks/usePhotos';
import { usePhotosMutation } from '@services';

function PhotosPage() {
    const { classes } = usePhotosPageStyle({});
    const [loadPhotos] = usePhotosMutation()
    const { t } = useTranslation()
    const currentPage = useState(0);
    const [album, setAlbum] = useState(0);

    const { photo, thumbnails, pages, paginated, albums, organized, thumbs } = usePhotos({ page: currentPage, album });
    console.log(thumbs.length)

    useEffect(() => {
        loadPhotos()
    }, [loadPhotos])

    const changeAlbum = (id: number) => {
        setAlbum(id)
    }



    return (<Box className={classes.container}>
        <>
            <Typography paddingBottom={4} variant="h3" color="secondary">
                {t('titles.photos')}
                <small></small>
            </Typography>
            <Typography variant="h4">{t('titles.albums')}</Typography>
            <div className={classes.pages}>
                {
                    albums.map((alb, i) => (
                        <Button variant="text" key={alb.id} onClick={() => changeAlbum(alb.id)}>{alb.label}</Button>
                    ))
                }
            </div>
            <div className={classes.thumbnails}>
                {thumbs.map((photo, pid) => (
                    <img src={photo.thumbnailUrl} key={photo.id} title={photo.title} />
                ))}
            </div>
            <Box className={classes.photo}>
                {photo ? (
                    <img src={photo.url} title={photo.title} />) : null}
                <Typography className={classes.caption} variant="body1" color="primary">
                    {thumbnails?.length ?? 0}
                </Typography>
            </Box>
        </>
    </Box>)
}

export default PhotosPage;
