import React, { Component, PropTypes } from 'react';




function Download(props) {
 const { items, type } = props;

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

    function download() {
        var filename = 'filename.csv';
        var data = toCSV(items);
        var blob = new Blob([data], {type: 'text/csv'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were 
            // revoked by closing the blob for which they were created. 
            // These URLs will no longer resolve as the data backing 
            // the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);
        }
        else {
            var csvURL = window.URL.createObjectURL(blob);
            var tempLink = document.createElement('a');
            tempLink.href = csvURL;
            // tempLink.href = encodeURIComponent(data);
            tempLink.setAttribute('download', filename);
            tempLink.setAttribute('target', '_blank');
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        }
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
