# React Flybase Datagrid

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

React Data table component using Fixed-Data-Table for Flybase.org which has sort/filter/export capabilities.

## Clone the git repo.

```bash
git clone https://github.com/FlyBase/react-flybase-datagrid.git
cd react-flybase-datagrid 
git checkout master
npm install
npm run start
```
## Example
```javascript
import React from 'react'
import FlybaseDataGrid from 'react-flybase-datagrid'

class Application extends React.Component {
   render() {

    const columns = [
      {
        id: 'id',
        name: 'ID'
      }, 
      {
        id: 'name',
        name: 'Name',
      }, 
      {
        id: 'address',
        name: 'Street Address'
      }, 
      {
        id: 'state',
        name: 'State'
      }, 
      {
        id: 'zip',
        name: 'Code, Zip'
      }
    ];

    const items = [{id: '1', name: 'Hoosier', address: '107 S Indiana Ave', state: 'IN', zip: '47405'}];

    return (
      <div>
        <FlybaseDataGrid  
        columns={columns} 
        data={items}
        showColumnFilter
        downloadButton={['tsv']}
        maxHeight={1000}
        width={1110} />
      </div>
    );      
  }
};
```

## Installation

npm:
```bash
npm install --save react-flybase-datagrid
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
