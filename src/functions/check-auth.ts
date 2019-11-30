export const checkAuth = (action) => {
    const auth = () => {
        miro.board.ui
            .openModal('not-authorized.html', {width: 300, height: 200})
            .then(res => {
                if (res === 'success') {
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
                    action();
                } else {
                    auth();
                }
            });
        }
    });
};