module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'react-flybase-datagrid',
      externals: {
        react: 'React'
      }
    }
  }
}
