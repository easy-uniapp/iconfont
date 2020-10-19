#!/usr/bin/env node

import fs from 'fs'
import fetch from 'node-fetch'
import prettier from 'prettier'

const main = async () => {
  const [_exec, _file, fontClassUrl] = process.argv

  if (!fontClassUrl) {
    console.log('Usage: iconfont <Font class url>')
    return
  }

  try {
    const ret = await fetch('http:' + fontClassUrl)
    const text = await ret.text()
    // get woff2
    const woff2Matches = text.match(/url.*?format\('woff2'\)/)
    if (!woff2Matches) {
      console.error('Error foramt, please check font class url is correct')
      return
    }
    // get iocons
    const iconMatches = text.match(/.+:before \{[\s\S]*?\}/g)
    if (!iconMatches) {
      console.error('No icon found, please check font class url is correct')
      return
    }
    // generate iconfont
    const generateIconfontScss = `
    @font-face {
      font-family: "iconfont";
      src: ${woff2Matches[0]};
    }
    .icon {
      font-family: "iconfont" !important;
    }
    ${iconMatches.map((icon) => icon.replace(/^\..*?-/, '.icon-')).join('\n')}
    `
    // prettier format (think about whether it's necessary)
    const iconfontScss = prettier.format(generateIconfontScss, {
      parser: 'scss',
    })
    // output to src/styles/iconfont.scss
    fs.writeFile('src/styles/iconfont.scss', iconfontScss, { flag: 'w' }, (err) => {
      if (err) {
        console.error(err?.message)
        return
      }
      console.log('iconfont.scss was genrated in src/styles directory')
    })
  } catch (err) {
    console.error(err)
  }
}

main()
