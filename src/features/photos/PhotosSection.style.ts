import { makeStyles } from 'tss-react/mui';

type PhotoPageStyleT = {
};

export default makeStyles<PhotoPageStyleT>()((theme, { }) => {
    return {
        container: {

            padding: '25px 0px 25px 30px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',

            overflowX: 'hidden',
        },
        albums: {
            display: 'flex',
            flexGap: theme.spacing(0.5),
            flexFlow: 'row wrap',
        },
        thumbnails: {
            position: 'relative',
            display: 'grid',
            maxWidth: '100%',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', // Creates as many 150px columns as can fit
            gap: theme.spacing(1), // Space between grid items
            padding: theme.spacing(2), // Padding around the entire grid
        },
        thumbnail: {
            height: '100px',
            cursor: 'pointer', // Makes the image appear clickable
            width: '100px'
        },
        photo: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'solid thin green'
        },
        caption: {
        },
    };
});
