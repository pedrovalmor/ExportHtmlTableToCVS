
/**
* Call the function
**/
$('.getCSV').click(function (e) {
    // inform the table and the name of the file that will be downloaded
    exportTableToCSV.apply(this, [$('table'), 'relatorio.csv'])
})

/**
* Export function itself
**/ 
function exportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(th,td)'),
            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '";"',
            rowDelim = '"\r\n"',
            // Grab text from table into CSV formatted string
            csv = '"' + $rows.map(function (i, row) {
                var $row = $(row),
                        $cols = $row.find('th,td');

                return $cols.map(function (j, col) {
                    var $col = $(col),
                            text = $col.text();

                    return text.replace('"', '""'); // escape double quotes

                }).get().join(tmpColDelim);

            }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',
            // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    $(this)
            .attr({
                'download': filename,
                'href': csvData,
                'target': '_blank'
            });
}
