console.log("Connected to JS");

// Hit API for all club listings
// For improved speed, just hit all the listings within the state searched
$.ajax({
    url: "/api",
    success: function (results) {
        console.log("Success:")
        console.log(results);
        renderResults(results);
    }
});


// add on-click function for the update selection box
// add top navigation bar


function renderResults(results) {
    for (let i = 0; i < results.length; i++) {

        var list = $('<dl>')
        list.addClass('listing');
        list.attr('id', results[i].clubName);

        var listing = $('<dt>');
        listing.text(results[i].clubName);

        var description = $('<dd>');
        description.text("Description: " + results[i].description);

        var website = $('<dd>');
        website.text("Website: " + results[i].website);

        var contact = $('<dd>');
        contact.text("Contact: " + results[i].contact);

        list.append(listing);
        list.append(description);
        list.append(website);
        list.append(contact);
        $(list).click(function () {
            detailLookup($(this)[0].id);
        });
        $('#results').append(list);


    }
}

function renderDetail(results) {
    console.log("Render detail for:");
    console.log(results);
    // clear out the html
    // $('#results').html('');
    $('#greyScreen').show();
    $('#greyScreen').click(function () {
        $('#greyScreen').css('display', 'none');
        $('#modal').css('display', 'none');
    });
    $('#modalExit').click(function () {
        $('#greyScreen').css('display', 'none');
        $('#modal').css('display', 'none');
    });

    $('#modalTitle').text(results.clubName);
    $('#modalDescription').text(results.description);
    $('#modalHeader').text(results.clubName);
    var image = $('<img src="' + results.images + '">');
    image.attr('id', 'modal_image');
    $('#modalImage').html(image);
    $('#modalReviews').text(results.reviews);

       
    
    $('#modal').show();
}



function detailLookup(id) {
    console.log("Detail view for:");
    console.log(id);

    $.ajax({
        url: ("/api/" + id),
        success: function (results) {
            renderDetail(results);
        }
    });

}