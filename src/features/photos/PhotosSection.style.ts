import { makeStyles } from 'tss-react/mui';

type PhotoPageStyleT = {
};

export default makeStyles<PhotoPageStyleT>()((theme, {}) => {
    return {
        container: {
            height: '100vh',
            width: '100vw',
            padding: '15px 20px 20px 20px',
            overflowX: 'hidden',
        },
        thumbnails: {
        },
        photo: {},
        caption: {
        },
    };
});
