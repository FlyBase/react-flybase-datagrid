import React, { Component, PropTypes } from 'react';

function Download(props) {
 const { items, type } = props;

    function render(array, separator='\t'){

      var str = Object.keys(array[0]).join(separator) + '\n';

       for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += separator

            line += '"' + array[i][index] + '"';
        }

        str += line + '\r\n';
      }

      return str;
    }

    function download() {

        var separator;
        switch(props.type) {
        case 'csv':
          separator = ',';
          break;
        case 'tsv':
          separator = '\t';
          break;
        }
        
       // var filename = 'filename.csv';
      var filename = `filename.${props.type}`;

        var data = render(items, separator);
      
        var blob = new Blob([data], {type: `text/${props.type}`});
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
 <button onClick={ download }> Download {props.type} </button>
 );
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Download.propTypes = {
  items: PropTypes.array.isRequired,
};


export default Download;
