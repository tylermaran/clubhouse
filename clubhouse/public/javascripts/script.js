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


function renderResults(results) {
    for (let i = 0; i < results.length; i++) {
        console.log("Running!");
        var listing = $('<ul>');
        listing.addClass('listing');
        listing.text(results[i].clubName);
        $('#results').append(listing);

    }

}