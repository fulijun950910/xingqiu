module.exports = {
  NODE_ENV: process.env.BUILD_ENV == 'release' ? '"production"' : '"test"'
}
