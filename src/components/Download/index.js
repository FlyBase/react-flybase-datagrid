import React, { Component, PropTypes } from 'react';

function Download(props) {
  const { columns, filename, items, type } = props;
  
  function timeStamp() {
    var now = new Date();
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";
  
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;

    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }

    return date.join("/") + " " + time.join(":") + " " + suffix;
  }

  function render(array, separator='\t'){
    let str = timeStamp() + '\r\n';
    str += columns.map(col =>  `"${col.name}"`).join(separator) + '\r\n';

    array.forEach((row) => {
      let line = '';
      columns.forEach((column) => {
        if (line != '') {
          line += separator
        }
        const getText = column.getText || (v => v.toString());
        line += `"${getText(row[column.id])}"`;
      });
      str += line + '\r\n';
    });

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

    var data = render(items, separator);
      
    var blob = new Blob([data], {type: `text/${props.type}`});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, `${filename}.${props.type}`);
    } else {
      var csvURL = window.URL.createObjectURL(blob);
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      // tempLink.href = encodeURIComponent(data);
      tempLink.setAttribute('download', `${filename}.${props.type}`);
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }
  
  return (
    <button className={props.className} onClick={download}> Download {props.type} </button>
  );
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Download.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Download;
