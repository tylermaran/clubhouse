console.log('connected to Admin.js');

function loadResults() {
    $.ajax({
        url: "/api/" + document.title,
        success: function (results) {
            console.log("Success:")
            console.log(results);
            renderResults(results);
        }
    });
}

function renderResults(results) {

    for (const key in results) {
        if (results.hasOwnProperty(key)) {

            if (key != '_id' && key != '__v') {
                const title = key;
                const detail = results[key];

                const titleDiv = $('<div>');

                titleDiv.addClass('label');
                titleDiv.attr('id', title);
                titleDiv.text(title);

                const detailDiv = $('<textarea>');
                detailDiv.addClass('detail');
                detailDiv.attr('name', 'text');
                detailDiv.text(detail);
                // detailDiv.value(detail);

                detailDiv.appendTo(titleDiv);
                titleDiv.appendTo('.database');
            }
        }
    }

    
}

$(document).ready(function () {
    loadResults();
})