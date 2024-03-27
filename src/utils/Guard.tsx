import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';

type GuardType = 'authenticated' | 'canManageTeam' | 'canManageFarmer' | 'isMobile';

type GuardT = {
    guards: GuardType[];
    target: React.ReactElement;
};

function Guard({ target, guards }: GuardT): React.ReactElement {
    let redirectUrl = null;
    const { user: userFromState } = useAuth();
    const str = localStorage.getItem('user');
    const userFromLocalStorage = JSON.parse(str ?? '{}');
    const user = userFromState ?? userFromLocalStorage;

    for (let i = 0; i < guards.length; i++) {
        switch (guards[i]) {
            case 'authenticated':
                // check for success instead of failure
                // if user meets auth criteria let them in, otherwise, no go!
                if (!!user?.id) {
                    continue;
                } else {
                    redirectUrl = '/login';
                    break;
                }
            default:
                break;
        }
    }

    return redirectUrl ? <Navigate to={redirectUrl} /> : target;
}

export default Guard;
