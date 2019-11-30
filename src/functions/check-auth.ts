let checked: boolean = false;

export const checkAuth = (action) => {
    if (checked) {
        action();
        return;
    }

    const auth = () => {
        miro.board.ui
            .openModal('not-authorized.html', {width: 300, height: 200})
            .then(res => {
                if (res === 'success') {
                    checked = true;
                    action();
                }
            });
    };

    miro.isAuthorized().then((isAuthorized) => {
        if (!isAuthorized) {
            auth();
        } else {
            miro.currentUser.getScopes().then((scopes) => {
                const hasRead = scopes.indexOf('boards:read') !== -1;
                const hasWrite = scopes.indexOf('boards:write') !== -1;

                if (hasRead && hasWrite) {
                    checked = true;
                    action();
                } else {
                    auth();
                }
            });
        }
    });
};