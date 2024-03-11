import { makeStyles } from 'tss-react/mui';

export default makeStyles()(() => {
    return {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            gap: '20px',
        },
        menuContainer: {
            display: 'flex',
        },
        imageWrapper: {
            width: '100%',
            maxWidth: '600px',
        },
        image: {
            width: '100%',
            height: 'auto',
            maxWidth: '600px',
        },
    };
});
