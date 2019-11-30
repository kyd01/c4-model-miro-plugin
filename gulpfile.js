'use strict';

const gulp = require('gulp');
const del = require('del');
const ftp = require('vinyl-ftp');
const fs = require('fs');
const flatten = require('gulp-flatten');

function getFtpParams() {
    let ftpParams;

    try {
        ftpParams = require('./ftp-params.json');
    } catch (err) {
        ftpParams = {
            "host": "",
            "user": "",
            "password": "",
            "path": "",
            "secure": true
        };
        fs.writeFileSync('./ftp-params.json', JSON.stringify(ftpParams));
        console.log('ftp-params.json created');
    }

    ftpParams.parallel = 10;

    if (!ftpParams.host || !ftpParams.user || !ftpParams.password || !ftpParams.path) {
        throw new Error('invalid ftp params');
    }

    return ftpParams;
}

gulp.task('clean-dist', () => {
    return del('dist');
});

gulp.task('upload-dist', () => {
    const ftpParams = getFtpParams();
    ftpParams.secureOptions = {rejectUnauthorized: false};
    const connection = ftp.create(ftpParams);

    const getStream = () => gulp.src(['./dist/**'], {base: '.', buffer: false})
        .pipe(flatten())
        .pipe(connection.newer(ftpParams.path))
        .pipe(connection.dest(ftpParams.path))
        .on('error', () => getStream());

    return getStream();
});

gulp.task('upload-dist:watch', () => {
    gulp.watch('./dist/**', gulp.series('upload-dist'));
});