var iconfont = require('icon.font');
var fs = require('fs-extra');
var path = require('path');


iconfont({ 
    fontName: 'customIcon',
    src: './src/assets/svg/',
    dest: './src/assets/fonts/',
    configFile: './src/config/customIcon.json',
    saveConfig: true,
    image: false,
    html: true,
    css: true,
    fixedWidth: true,
    normalize: true,
    silent: true,
    types: ['ttf'],
    codepointRanges: [
        [97,122], // a-z
        [65,90], // A-Z
        [48,57], // 0-9
        [0xe001, Infinity]
    ]
}).then(function(){

    const srcpath = './src/assets/fonts/';
    const dstpath = './iconpreview/';

    // remove all icon from IOS dir
    fs.readdir(dstpath, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(dstpath, file), err => {
          if (err) throw error;
        });
      }
    })

    fs.move(srcpath + 'customIcon.html', dstpath + 'customIcon.html', err => {
      if (err) return console.error(err)
      console.log('success!')
    });

    fs.move(srcpath + 'customIcon.svg', dstpath + 'customIcon.svg', err => {
      if (err) return console.error(err)
      console.log('success!')
    });

    fs.move(srcpath + 'customIcon.css', dstpath + 'customIcon.css', err => {
      if (err) return console.error(err)
      console.log('success!')
    });

    fs.copy(srcpath + 'customIcon.ttf', dstpath + 'customIcon.ttf', err => {
      if (err) return console.error(err)
      console.log('success!')
    });
    
})