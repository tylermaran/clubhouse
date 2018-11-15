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

    const form = $('<form method="post" class="editForm"></form>');
    form.attr('action', "/edit/" + results.clubName);
    form.appendTo('.database');

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
                detailDiv.attr('name', key);
                detailDiv.text(detail);
                // detailDiv.value(detail);

                detailDiv.appendTo(titleDiv);
                titleDiv.appendTo('.editForm');
            }
        }
    }

    const submit = $('<button>');
    submit.attr('type', 'submit');
    submit.text('Submit');
    submit.appendTo('.editForm');
    
}

$(document).ready(function () {
    loadResults();
})