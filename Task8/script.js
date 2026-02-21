let booksJSON = [];

$(document).ready(function(){

    $.ajax({
        url: "book.xml",
        type: "GET",
        dataType: "xml",

        success: function(xml){

            // Convert XML to JSON manually
            $(xml).find("book").each(function(){

                let bookObj = {
                    id: $(this).attr("id"),
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publish_date: $(this).find("publish_date").text()
                };

                booksJSON.push(bookObj);
            });

            populateFilters();
            displayBooks(booksJSON);
        },

        error: function(){
            alert("Error loading XML file!");
        }
    });

    $("#applyFilter").click(function(){
        applyFilter();
    });

    $("#resetFilter").click(function(){
        $("#genreFilter").val("all");
        $("#authorFilter").val("all");
        $("#minPrice").val("");
        $("#maxPrice").val("");
        displayBooks(booksJSON);
    });

});


function populateFilters(){

    let genreSet = new Set();
    let authorSet = new Set();

    booksJSON.forEach(function(book){
        genreSet.add(book.genre);
        authorSet.add(book.author);
    });

    genreSet.forEach(function(g){
        $("#genreFilter").append(`<option value="${g}">${g}</option>`);
    });

    authorSet.forEach(function(a){
        $("#authorFilter").append(`<option value="${a}">${a}</option>`);
    });
}

function displayBooks(data){

    if(data.length === 0){
        $("#tableContainer").html("<p class='noData'>No books found.</p>");
        return;
    }

    let table = `
        <table border="1">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Publish Date</th>
            </tr>
    `;

    data.forEach(function(book){

        table += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>₹ ${book.price}</td>
                <td>${book.publish_date}</td>
            </tr>
        `;
    });

    table += `</table>`;

    $("#tableContainer").html(table);
}


// Apply Filtering
function applyFilter(){

    let selectedGenre = $("#genreFilter").val();
    let selectedAuthor = $("#authorFilter").val();
    let minPrice = parseFloat($("#minPrice").val()) || 0;
    let maxPrice = parseFloat($("#maxPrice").val()) || Infinity;

    let filtered = booksJSON.filter(function(book){

        let genreMatch = (selectedGenre === "all" || book.genre === selectedGenre);
        let authorMatch = (selectedAuthor === "all" || book.author === selectedAuthor);
        let priceMatch = (book.price >= minPrice && book.price <= maxPrice);

        return genreMatch && authorMatch && priceMatch;
    });

    displayBooks(filtered);
}