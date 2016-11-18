'use strict';

var relativeWebContentRootDir = "../../../../../",
    SVGSpriter = require('svg-sprite'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    glob = require('glob');

var cwd = path.join(__dirname, relativeWebContentRootDir, 'ajaxclient' , 'xcProject', 'theme'),
    config = {
        log: "info",
        mode: {
            css: {
                dest: 'css',
                common: ".xc_icon",
                prefix: "xc-%s",
                example: false
            }
        }
    },
    dest,
    destName = 'svg-icons',
    files = glob.glob.sync('**/svg/*.svg', {cwd: cwd}),
    fileGroups = groupByTheme(files),
    spriter;

for(var group in fileGroups) {

    dest = path.normalize(path.join( cwd, group, destName));
    config.dest = dest;
    spriter = new SVGSpriter(config);


    cwd = path.join(__dirname, relativeWebContentRootDir,
                    'ajaxclient' , 'xcProject', 'theme', group, 'img', 'svg');
    fileGroups[group] = fileGroups[group].map(function (fileName) {

       return fileName.replace(group, '').replace('/img/svg/', '');
    });
    addFixtureFiles(spriter, fileGroups[group]).compile({
        css: {
            sprite: 'svg/sprite.packed.svg',
            layout: 'packed',
            dimensions: true,
            render: {
                css: true,
                less: true
            }
        }
    }, function (error, result, cssData) {
        for (var type in result.css) {
            mkdirp.sync(path.dirname(result.css[type].path));
            fs.writeFileSync(result.css[type].path, result.css[type].contents);
        }
    });
}

/**
 * Add a bunch of SVG files
 *
 * @param {SVGSpriter} spriter        Spriter instance
 * @param {Array} files                SVG files
 * @return {SVGSpriter}                Spriter instance
 */
function addFixtureFiles(spriter, files) {
    files.forEach(function (file) {

        spriter.add(
        	path.resolve(path.join(cwd, file)),
        	file,
        	fs.readFileSync(path.join(cwd, file), {encoding: 'utf-8'})
        );
    })
    return spriter;
}

function getThemeDir(filename) {

    return filename.slice(0, filename.indexOf('/'));
}

function groupByTheme(files) {

    var groups = {};

    files.forEach(function (file) {

        if(file.indexOf(destName) != -1) return;

        var crntFileGroup = getThemeDir(file);

        !groups[crntFileGroup] && (groups[crntFileGroup] = []);

        groups[crntFileGroup].push(file);
    });

    return groups;
}