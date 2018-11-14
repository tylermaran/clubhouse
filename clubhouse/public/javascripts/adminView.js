function loadResults() {
    $.ajax({
        url: "/api",
        success: function (results) {
            console.log("Success:")
            console.log(results);
            $('.database').html('');
            renderResults(results);
        }
    });
}

function renderResults(results) {
    var clicked = false;
    $('#newClubButton').click(function () {
        if (clicked) {
            $('.inputClub').css('display', 'none');
            $('#newClubButton').text('New Club');
            clicked = false;
        } else {
            console.log('clicked');
            $('.inputClub').css('display', 'block');
            $('#newClubButton').text('Cancel');
            clicked = true;
        }
    });


    $('.database').html('');
    for (let i = 0; i < results.length; i++) {

        var list = $('<div>')
        list.addClass('club');
        list.attr('id', results[i].clubName);
        list.text(results[i].clubName);

        var edit = $('<button>');
        edit.addClass('clubButton');
        edit.attr('id', results[i].clubName);
        edit.text('Edit');

        var remove = $('<button>');
        remove.addClass('clubButton');
        remove.attr('id', results[i].clubName)
        remove.text('Remove');

        // add button to edit form
        $(edit).click(function () {
            window.location = "/edit/" + $(this)[0].id;
            // editClub($(this)[0].id);
            // $.get('/admin/' + $(this)[0].id);
            // window.location = ("/admin/" + $(this)[0].id);
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

    $.get('/register');

    // $.ajax({
    //     url: "/api/" + id,
    //     success: function (results) {
    //         console.log("Success:")
    //         console.log(results);
    //         editForm(results, cat);
    //     }
    // });
}

function editForm(results, cat) {
    // Build out form with all club results in it for editing
    // for each element in the database, create a form

    let editDetails = $('<div>');

    for (var element in results) {
        let formItem = $('<div>');
        formItem.text(results[element]);
        formItem.appendTo(editDetails);
    };

editDetails.appendTo(cat);

console.log(cat);

}

function removeClub(id) {
    // find one club and delete it
    console.log(id);
    $.post({
        url: ("/api/delete/" + id)
    }).done(function () {
        console.log('gpt here');
        location.reload();
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