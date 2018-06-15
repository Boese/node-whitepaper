const fs = require('fs');
const {EventEmitter} = require('events');
const path = require('path');

module.exports = class FileWatcher extends EventEmitter {

    constructor(directory, filename = null, interval = 1000, watchNested = false) {
        super();

        let printTree = (root, files) => {
            files = files.map(m => m.replace(root, ''))
        }

        let recurseFiles = (fileOrDirectory, cb, dest = []) => {

            fs.stat(fileOrDirectory, (err, stats) => {
                if (err) console.log(err);
                else if (stats.isDirectory()) {
                    fs.readdir(fileOrDirectory, (err, files) => {
                        if (err) console.log(err);
                        else {

                            Promise.all(files.map(file => {
                                return new Promise(resolve => {
                                    recurseFiles(path.resolve(fileOrDirectory, file), (file) => {
                                        return resolve(file);
                                    }, dest)
                                })
                            })).then(results => {
                                return cb(dest.concat(results));
                            }).catch(err => {
                                console.log(err);
                            })

                        }
                    })
                }
                else {
                    cb(fileOrDirectory);
                }
            })
        }

        var i = 0;
        recurseFiles(directory, (files) => {
            console.log(i++,files);
        });
    }

    async CurrentState() {
        if (this.Filename) {
            await fs.read
        } else {
            await readdir()
        }
    }

    StartWatching() {
        this.Watcher.on('')
    }

    StopWatching() {

    }
}