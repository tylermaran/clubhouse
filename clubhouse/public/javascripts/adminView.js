function loadResults() {
    $.ajax({
        url: "/api",
        success: function (results) {
            console.log("Success:")
            console.log(results);
            renderResults(results);
        }
    });
}


function renderResults(results) {
    $('.database').html('');
    for (let i = 0; i < results.length; i++) {

        var list = $('<div>')
        list.addClass('club');
        list.attr('id', results[i].clubName);
        list.text(results[i].clubName);

        var edit = $('<button>');
        edit.addClass('button');
        edit.attr('id', results[i].clubName)
        edit.text('Edit');

        var remove = $('<button>');
        remove.addClass('button');
        remove.attr('id', results[i].clubName)
        remove.text('Remove');

        // add button to edit form
        $(edit).click(function () {
            editClub($(this)[0].id);
        });

        // add button to delete club
        // todo: add a confirmation button
        $(remove).click(function () {
            removeClub($(this)[0].id);
        });
        list.append(remove);
        list.append(edit);

        $('.database').append(list);
    }
}


function editClub(id) {
    console.log(id);
    $.ajax({
        url: "/api/" + id,
        success: function (results) {
            console.log("Success:")
            console.log(results);
            renderResults(results);
        }
    });
}


function editForm(results) {
    // Build out form with all club results in it for editing
}



function removeClub(id) {
    // find one club and delete it
    console.log(id);
    $.post({
        url: ("/api/delete/" + id),
        success: function () {
            console.log("Deleted " + id);
            loadResults();
        }
    });
}

loadResults();