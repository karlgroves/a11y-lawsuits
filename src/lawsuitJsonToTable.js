var autolinker = new Autolinker({
    newWindow: false,
    truncate: 30
});


var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');

// Builds the HTML Table out of JSON
function buildTable(arr) {
    var table = _table_.cloneNode(false),
        columns = addAllColumnHeaders(arr, table);

    for (var i = 0, maxi = arr.length; i < maxi; ++i) {

        var tr = _tr_.cloneNode(false);
        for (var j = 0, maxj = columns.length; j < maxj; ++j) {
            var td = _td_.cloneNode(false);
            cellValue = arr[i][columns[j]];

            td.innerHTML = autolinker.link(cellValue) || '';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain all data
function addAllColumnHeaders(arr, table) {
    var columnSet = [],
        tr = _tr_.cloneNode(false);
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                columnSet.push(key);
                var th = _th_.cloneNode(false);
                th.setAttribute('scope', 'col');
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);
            }
        }
    }
    table.appendChild(tr);
    return columnSet;
}


var request = new XMLHttpRequest();
request.open('GET', 'lawsuits.json', true);

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        document.body.appendChild(buildTable(data));
    } else {
        // do something smart with the error
    }
};

request.onerror = function () {
    // do something smart with the error
};

request.send();
