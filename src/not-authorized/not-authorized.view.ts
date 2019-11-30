import {getUrl} from "../functions/get-url";

require('./not-authorized.view.sass');

document.querySelector('button').addEventListener('click', function () {
    const authorizeOptions = {
        response_type: 'token',
        scope: 'boards:read boards:write',
        redirect_uri: getUrl('auth-success.html?hack=hack')
    };

    miro.authorize(authorizeOptions)
        .then(() => miro.getToken())
        .then((token) => {
            if (token) {
                miro.board.ui.closeModal('success');
            } else {
                console.log('Something went wrong');
            }
        });
});