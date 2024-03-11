import clsx from 'clsx';

import useTopBarStyle from './TopBar.style';

function TobBar({ className, style }: TopBarT) {
    const { classes } = useTopBarStyle();

    return (
        <div className={clsx(className, classes.container)} style={style}>
            <div className={classes.menuContainer}></div>
        </div>
    );
}

type TopBarT = {
    className?: string;
    style?: React.CSSProperties;
};

export default TobBar;
