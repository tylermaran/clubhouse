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

$('#newClubButton').click(function () {
    console.log('clicked');
    // $('.inputClub').css('display', 'block');
    // $('#newClubButton').text('Cancel');
    // $('#newClubButton').click(function () {
    //     $('.inputClub').css('display', 'none');
    // });
});



function renderResults(results) {
    $('.database').html('');
    for (let i = 0; i < results.length; i++) {

        var list = $('<div>')
        list.addClass('club');
        list.attr('id', results[i].clubName);
        list.text(results[i].clubName);

        var edit = $('<button>');
        edit.addClass('clubButton');
        edit.attr('id', results[i].clubName)
        edit.text('Edit');

        var remove = $('<button>');
        remove.addClass('clubButton');
        remove.attr('id', results[i].clubName)
        remove.text('Remove');

        // add button to edit form
        $(edit).click(function () {
            editClub($(this)[0].id);
        });

        // add button to delete club
        $(remove).click(function () {
            confirm($(this)[0].id);
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

// Confirmation button when you click delete
function confirm(club) {
    $('#confirm').css('display', 'block');
    $('#confirmButton').click(function () {
        removeClub(club);
    });
    $('#cancelButton').click(function () {
        console.log('clicked');
        $('#confirm').css('display', 'none');
    });
}

loadResults();