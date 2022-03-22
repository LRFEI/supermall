const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('components', resolve('./src/components'))
      .set('netwrok', resolve('./src/netwrok'))
      .set('views', resolve('./src/views'))
  }
  // configureWebpack: {
  //     resolve: {
  //         alias: {
  //             'assets': '@/assets',
  //             'common': '@/common',
  //             'components': '@/components',
  //             'netwrok': '@/netwrok',
  //             'views': '@/views',
  //         }
  //     }
  // }
}
