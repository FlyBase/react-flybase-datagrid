module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlybaseDataGrid',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
          compat: {
              enzyme: true
          }
  }
}
