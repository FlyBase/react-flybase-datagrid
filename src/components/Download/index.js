import React, { Component, PropTypes } from 'react';

function toCSV(array){

  var str = '';

   for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','

        line += array[i][index];
    }

    str += line + '\r\n';
  }

  str = Object.keys(array[0]) + '\n' + str;

return str;
}


function Download(props) {
 const { items, type } = props;
 // console.debug(type);


 function download(){
  const a = document.createElement('a');
  a.textContent = 'download';
  a.download = 'filename';
  var data = toCSV(items);
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
  a.click();
}

return (

 <button onClick={download} > Download </button>

 );
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Download.propTypes = {
  items: PropTypes.array.isRequired,
};


export default Download;
