// const axios = require('axios')
const URL = 'https://ltproject2.herokuapp.com/';
// get HTML elements using jQuery
const $allArtworks =$('.all-artworks');
const $carouselItem = $('.carousel-item');
const $carousel1 = $('#carousel1');
const $carousel2 = $('#carousel2');
const $carousel3 = $('#carousel3');


/////////////////////////////////// CAROUSEL /////////////////////////////////////

// function to populate the Bootstrap carousel with 3 randomly selected images from database:
const startCarousel = async (artworkData) =>{
    // console.log(artworkData)
    const randomDoc = [];
    // create an array of three random documents from the artwork database
    for(let i = 0; i < 3; i++){
        randomDoc.push(artworkData[Math.floor(Math.random()*artworkData.length)]);
    }
    // console.log(randomDoc)
    // for each artwork in the carousel array, create an img element in the carousel
    randomDoc.forEach(art =>{
        if(!art.imageUrl) return;
        const $carouselImg = $('<img>')
            .attr('src', art.imageUrl)
            .css('width', '100%')
            .addClass('d-block')
            .addClass('w-100') 
            .addClass('carouselImg');
        if(art === randomDoc[0]){
            $carouselImg.attr('alt', 'First Slide').addClass('active');
            $carousel1.append($carouselImg);
        }
        else if(art === randomDoc[1]){
            $carouselImg.attr('alt', 'Second Slide');
            $carousel2.append($carouselImg);
        }else{
            $carouselImg.attr('alt', 'Third Slide');
            $carousel3.append($carouselImg);
        }
    })
}



//////////////////////////// DISPLAY ART IN GALLERY WITH BOOTSTRAP GRID ////////////////////////////
// display all artworks in a Bootstrap grid 
const getArtworks = async (artworkData) => {
    // console.log(artworkData)
    $allArtworks.innerHTML="";
    artworkData.forEach(art => {
        if(!art.imageUrl) return;
        const $imgNode = $('<img>')
        .attr('src', art.imageUrl)
        .addClass('archive-item')
        .addClass('col-6')
        .addClass('col-md-4')
        .addClass('col-lg-3')
        .addClass('col-xlg-2')
        .attr('id', art._id)
        $allArtworks.append($imgNode);
    })

    
}

// this happens on site-load.
// make the axios call to get the data then trigger the two functions
axios.get(`${URL}artworks`).then(response => {
    // gets the initial data
    startCarousel(response.data);
    getArtworks(response.data);

    // once initial data is loaded, store all images in variable $archiveItem
    const $archiveItem = $(".archive-item");
    // when one of the archive items is clicked, open archive item information window. 
    $archiveItem.on('click', openArchiveItemWindow);
})








///////////////////// GLOBAL VARIABLES FOR EDIT / DELETE FUNCTIONS ////////////////
const $editCloseButton = $('#edit-close-button')
const $saveArchiveItemButton = $('#save-archive-item-button')
const $deletePrompt = $('#delete-prompt')
const $removeFromArchiveButton = $('#remove-from-archive-button')
const $cancelButton = $('#edit-cancel-button')

/////////////////////////// ARCHIVE ITEM MODAL WINDOW POP UP ///////////////////////

// Opens the open artwork / archive item modal window. 
const openArchiveItemWindow = async (event) => {
    $editArchiveItemButton.show()
    $editCloseButton.show()
    $cancelButton.hide()
    $saveArchiveItemButton.hide()
    $deletePrompt.hide()
    $removeFromArchiveButton.hide()

    // console.log(event.target.id)
    const $editArchiveItem = $('#archive-item-modal')
    // console.log($editArchiveItem)
    // Display the archive item's information in a modal window
    $(document).ready(function(){$editArchiveItem.modal('show')});
    // console.log('archive item window open');   

  // Find artwork in DB using the ID of the image clicked.
    const artwork = await fetch(`${URL}artworks/${event.target.id}`)
    .then(res => res.json());
    // console.log(artwork);

   
    ///// DISPLAY INFO FOR ARTWORK
    const $archiveItemBody = $('#archive-item-body');
    let entries = Object.entries(artwork);

    // Filter out key/values that aren't relevant to the displayed text
    // Capitalize and push to a new array
    let displayEntries = [];
    for(let i = 0; i < entries.length; i++){

        if(entries[i][0] !== '_id' && entries[i][0] !== 'createdAt' && entries[i][0] !== 'updatedAt' && entries[i][0] !== '__v'){
            if(entries[i][0] === 'imageUrl'){
                entries[i][0] = "Image URL:";
                displayEntries.push(entries[i]);
            }else if(entries[i][0] === 'year'){
                entries[i][0] = "Year Created:"
                displayEntries.push(entries[i]);
            }else if(entries[i][0] === 'artist'){
                entries[i][0] = "Artist:"
                entries[i][1] = entries[i][0].name
                displayEntries.push(entries[i]);
            }else{
                entries[i][0] = entries[i][0].charAt(0).toUpperCase() + entries[i][0].slice(1) + ':';
                displayEntries.push(entries[i]);
            }
        }
    }
    // console.log(displayEntries);


    // Create a table to display all of the artwork information 
    let $archiveItemHeader = $('#info-modal-header')
    let $existingTable = $('.info-table')
    $existingTable.empty()
    let $table = $('<table>').addClass('info-table');
    // let $tHead = $('<thead>').addClass('table-header');
    let $tBody = $('<tbody>').addClass('table-body')

    for(let i=0; i< displayEntries.length; i++){
        let $row = $('<tr>')
        $header = $('<td>').text(displayEntries[i][0]).addClass('artwork-table-header').css('font-weight', 'bold');
        $info = $('<td>').text(displayEntries[i][1]).addClass('artwork-table-info');
        $row.append($header).append($info)
        $tBody.append($row)

        if(displayEntries[i][0] === 'Image URL:' || displayEntries[i][0] === 'imageUrl'){
            $archiveItemHeader.empty()
            let $image = $('<img>').attr('src', `${displayEntries[i][1]}`).addClass('image-open-modal')
            $image.insertBefore($tBody)
            $archiveItemHeader.append($image)
        }
    }

    $table.append($tBody);
    $archiveItemBody.append($table)
    $editArchiveItemButton.attr('id', event.target.id)


    $editArchiveItemButton.on('click', (event2) =>{
        $deletePrompt.hide()
        $editArchiveItemButton.hide()
        $saveArchiveItemButton.show()
        

        // get all the text values from the table
        let $existingInfo = $('.artwork-table-info')
        let $existingInfoValues = []
        for(let i=0; i < $existingInfo.length; i++){
            $existingInfoValues.push($existingInfo[i].innerHTML)
        }

        // get all the title values from the table
        let $existingTitles = $('.artwork-table-header')
        let $existingTitleValues = []
        for(let i=0; i < $existingTitles.length; i++){
            $existingTitleValues.push($existingTitles[i].innerHTML)
        }

        // empty out the uneditable table content
        $existingTitles.empty()
        $existingInfo.empty()

        // repopulate empty table as a form 
        for(let j=0; j < $existingTitleValues.length; j++){
            let $row = $('<tr>')
            $header = $('<td>').text($existingTitleValues[j]).addClass('artwork-table-header').css('font-weight', 'bold');
            $info = $('<input>').attr('placeholder', $existingInfoValues[j]).attr('id', `${$existingTitleValues[j]}`).addClass('artwork-table-info');
            $row.append($header).append($info)
            $tBody.append($row)
        }
        // empty our modal body and append newly populated table with input fields
        $table.append($tBody);
        $archiveItemBody.empty()
        $archiveItemBody.append($table)


        $saveArchiveItemButton.on("click", (event) =>{
            // grab the input fields by the id names. 
            let $artist = $('#Artist\\:').val()
            let $title = $('#Title\\:').val()
            let $year = $('#Year\\ Created\\:').val()
            let $notes = $('#Notes\\:').val()
            let $materials = $('#Materials\\:').val()
            let $imageUrl = $('#Image\\ URL\\:').val()

            if(!$artist){
                $artist = document.getElementById('Artist:').placeholder
                console.log(   `using the ${$artist} as placeholder title`)
            }
            if(!$title){
                $title = document.getElementById('Title:').placeholder
                console.log(   `using the ${$title} as placeholder title`)
            }
            if(!$year){
                $year = document.getElementById('Year Created:').placeholder
                console.log(   `using the ${$year} as placeholder title`)

            }
            if(!$notes){
                $notes = document.getElementById('Notes:').placeholder
                console.log(   `using the ${$notes} as placeholder title`)

            }
            if(!$materials){
                $materials = document.getElementById('Materials:').placeholder
                console.log(   `using the ${$materials} as placeholder title`)
            }
            if(!$imageUrl){
                $imageUrl = document.getElementById('Image URL:').placeholder
                console.log(   `using the ${$imageUrl} as placeholder title`)
            }

           
            //make a put request to the database with input values 
            const updatedArtwork = {
                title: $title.val(),
                artist: artistName,
                year: $year.val(),
                materials: $materialsMedium.val(),
                notes: $notes.val(),
                imageUrl: $imgUrl.val()
            }


            // close the modal and return to the main gallery 


        })
    
    })

    

    $deleteArchiveItemButton.on('click', (e) =>{
        $deletePrompt.show()
        // show 'remove from archive' button
        $removeFromArchiveButton.show()
        $editArchiveItemButton.hide()
        $deleteArchiveItemButton.hide()
        $editCloseButton.hide()
        $cancelButton.show()    
        // get by id and delete

    });

}



// on click functions for the edit button
const toggleEditInputs = (event) =>{
    
    // turn the text fields into input fields or into editable cells?
    // const $allInfo = $('.artwork-table-info');
    // const infoText = $allInfo.filter(cell =>{
    //     return cell.innerHTML()
    // })
    // console.log(infoText)
    



    // const updatedArtwork = {
    //     title: "",
    //     artist: "",
    //     year: "",
    //     materials: [],
    //     notes: "",
    //     imageUrl: ""
    // }
    // const updatedArtwork = {
    //     title: $title.val(),
    //     artist: artistName,
    //     year: $year.val(),
    //     materials: $materialsMedium.val(),
    //     notes: $notes.val(),
    //     imageUrl: $imgUrl.val()
    // }





    // Hide the original buttons

    // Display the save and cancel button




    // close the modal and return to the main gallery 


};
// grabs the buttons for edit and delete
const $editArchiveItemButton = $('.edit-archive-item-button');
const $deleteArchiveItemButton = $('#delete-archive-item-button');



// ///////////////////////// EDIT THE ARTWORK //////////////////////
// const toggleEditInputs = (event) =>{
//     console.log('the id of the artwork to edit is:')
//     console.log(event.target.id)

//     // const updatedArtwork = {
//     //     title: "",
//     //     artist: "",
//     //     year: "",
//     //     materials: [],
//     //     notes: "",
//     //     imageUrl: ""
//     // }
//     // const updatedArtwork = {
//     //     title: $title.val(),
//     //     artist: artistName,
//     //     year: $year.val(),
//     //     materials: $materialsMedium.val(),
//     //     notes: $notes.val(),
//     //     imageUrl: $imgUrl.val()
//     // }





//     // Hide the original buttons

//     // Display the save and cancel button


  

//     // close the modal and return to the main gallery 



// }

