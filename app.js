// const axios = require('axios')
const URL = 'https://ltproject2.herokuapp.com/';
// get HTML elements using jQuery
const $allArtworks =$('.all-artworks');
const $carouselItem = $('.carousel-item');
const $carousel1 = $('#carousel1');
const $carousel2 = $('#carousel2');
const $carousel3 = $('#carousel3');
let $archiveItem = $(".archive-item");

/////////////////////////////////// CAROUSEL /////////////////////////////////////

// function to populate the Bootstrap carousel with 3 randomly selected images from database:
const startCarousel = async (artworkData) =>{

    // Clear old carousel images
    $carouselItem.empty()

    // Create arrays to hold random numbers used as indexes for carousel display
    const randomDoc = [];
    let randomNum;

    // find 3 unique random numbers and push to randomDoc array
    while(randomDoc.length < 3) {
        randomNum = Math.floor(Math.random() * artworkData.length)
        // checks if there is an instance of the randomNum in the array already.
        // then pushes if there is no instance of it yet.
        if(randomDoc.indexOf(randomNum) < 0) {
            // console.log(randomNum)
            randomDoc.push(artworkData[randomNum]);
        }
    }

    // console.log(randomDoc.length)
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













///////////////////// GLOBAL VARIABLES FOR EDIT / DELETE FUNCTIONS ////////////////
const $editCloseButton = $('#edit-close-button')
const $saveArchiveItemButton = $('.save-archive-item-button')
const $deletePrompt = $('#delete-prompt')
const $removeFromArchiveButton = $('.remove-from-archive-button')
const $cancelButton = $('#edit-cancel-button')
let $editableTitles = $('.artwork-table-header')
let $editableInfo = $('.artwork-table-info')







/////////////////////////// ARCHIVE ITEM MODAL WINDOW POP UP ///////////////////////

// Opens the open artwork / archive item modal window. 
const openArchiveItemWindow = async (event) => {
    let $editableTitles = $('.artwork-table-header')
    let $editableInfo = $('.artwork-table-info')
    $editableTitles.remove()
    $editableInfo.remove()
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

   


    ////////////// DISPLAY INFO FOR ARTWORK //////////////////
  

    const $archiveItemBody = $('#archive-item-body');
    $archiveItemBody.empty()
    
    let entries = Object.entries(artwork);
    let displayEntries =[]
    // Filter out key/values that aren't relevant to the displayed text
    // Capitalize and push to a new array
    // let displayEntries = [];
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
                console.log(entries[i][1].name)
                entries[i][1] = entries[i][1].name
                displayEntries.push(entries[i]);
            }else{
                entries[i][0] = entries[i][0].charAt(0).toUpperCase() + entries[i][0].slice(1) + ':';
                displayEntries.push(entries[i]);
            }
        }
    }
    // console.log(displayEntries);


    // Create a table to display all of the artwork information 
    // let $archiveItemHeader = $('#info-modal-header')
    // let $existingTable = $('.info-table')
    // $existingTable.empty()
    // if(!$existingTable){
    //     $existingTable = $('<table>').addClass('info-table');
    // }
    
    // let $tBody = $('#info-table-body')
    // if(!$tBody){
    //     $tBody = $('<tbody>').addClass('table-body')
    // } 


    // // console.log($tBody)
    // // let $table = $('<table>').addClass('info-table');
    // // let $tBody = $('<tbody>').addClass('table-body')

    // for(let i=0; i< displayEntries.length; i++){
    //     let $row = $('<tr>')
    //     $header = $('<td>').text(displayEntries[i][0]).addClass('artwork-table-header').css('font-weight', 'bold');
    //     $info = $('<td>').text(displayEntries[i][1]).addClass('artwork-table-info');
    //     // console.log($header)
    //     // console.log($info)
    //     $row.append($header).append($info)
    //     $tBody.append($row)
    //     console.log($tBody)
    //     $existingTable.append($tBody)

    //     if(displayEntries[i][0] === 'Image URL:' || displayEntries[i][0] === 'imageUrl'){
    //         $archiveItemHeader.empty()
    //         let $image = $('<img>').attr('src', `${displayEntries[i][1]}`).addClass('image-open-modal')
    //         $image.insertBefore($tBody)
    //         $archiveItemHeader.append($image)
    //     }
    // }

    // // $existingTable.append($tBody)
    // console.log($existingTable)



    // working code
    let $archiveItemHeader = $('#info-modal-header')
    let $existingTable = $('.info-table')
    $existingTable.empty()
    let $table = $('<table>').addClass('info-table');
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
    $deleteArchiveItemButton.attr('id', event.target.id)



    ///////////////// UPDATE ARTWORK FUNCTION ///////////////////

    $editArchiveItemButton.on('click', async (event2) =>{

        let $editBody = $('#edit-archive-item-body')
        let $table2 = $('.edit-table')
        let $tBody2 = $('#edit-table-body');


        const artworkInfo = await fetch(`${URL}artworks/${event2.target.id}`)
        .then(res => res.json());

        // Hide irrelevant buttons
        $deletePrompt.hide()
        $editArchiveItemButton.hide()
        // Show save button
        $saveArchiveItemButton.show()

        $archiveItemBody.empty()
        $tBody2.empty()

        let displayEntries = []
        for(let i = 0; i < entries.length; i++){

            if(entries[i][0] !== '_id' && entries[i][0] !== 'createdAt' && entries[i][0] !== 'updatedAt' && entries[i][0] !== '__v'){
                if(entries[i][0] === 'imageUrl'){
                    entries[i][0] = "Image URL";
                    displayEntries.push(entries[i]);
                }else if(entries[i][0] === 'year'){
                    entries[i][0] = "Year Created"
                    displayEntries.push(entries[i]);
                }else if(entries[i][0] === 'artist'){
                    entries[i][0] = "Artist"
                    console.log(entries[i][1].name)
                    entries[i][1] = entries[i][1].name
                    displayEntries.push(entries[i]);
                }else{
                    entries[i][0] = entries[i][0].charAt(0).toUpperCase() + entries[i][0].slice(1);
                    displayEntries.push(entries[i]);
                }
            }
        }

        // console.log(displayEntries)

  

        // repopulate empty table as a form 
        for(let j=0; j < displayEntries.length; j++){
            let $row2 = $('<tr>');
            let $header2 = $('<td>').text(displayEntries[j][0]).addClass('artwork-table-header').css('font-weight', 'bold');
            let $info2 = $('<input>').attr('placeholder', displayEntries[j][1]).attr('id', `${displayEntries[j][0]}`).addClass('artwork-table-info');
            $row2.append($header2).append($info2)
            $tBody2.append($row2)

        }
        // empty our modal body and append newly populated table with input fields
        $table2.append($tBody2)
        
       




        // // Hide irrelevant buttons
        // $deletePrompt.hide()
        // $editArchiveItemButton.hide()
        // // Show save button
        // $saveArchiveItemButton.show()

        // // Empty out the div
        // console.log($archiveItemBody)

        // // get all the text values from the table
        // let $existingInfo = $('.artwork-table-info')
        // let $existingInfoValues = []
        // for(let i=0; i < $existingInfo.length; i++){
        //     $existingInfoValues.push($existingInfo[i].innerHTML)
        // }

        // // get all the title values from the table
        // let $existingTitles = $('.artwork-table-header')
        // let $existingTitleValues = []
        // for(let i=0; i < $existingTitles.length; i++){
        //     $existingTitleValues.push($existingTitles[i].innerHTML)
        // }

        // // Empty out the uneditable table content
        // $existingTitles.empty()
        // $existingInfo.empty()
        // let $editableTitles = $('.artwork-table-header')
        // let $editableInfo = $('.artwork-table-info')
        // $editableInfo.empty()
        // $editableTitles.empty()
        // // $archiveItemBody.empty()

        // // repopulate empty table as a form 
        // for(let j=0; j < $existingTitleValues.length; j++){
        //     let $row = $('<tr>')
        //     $header = $('<td>').text($existingTitleValues[j]).addClass('artwork-table-header').css('font-weight', 'bold');
        //     $info = $('<input>').attr('placeholder', $existingInfoValues[j]).attr('id', `${$existingTitleValues[j]}`).addClass('artwork-table-info');
        //     $row.append($header).append($info)
        //     $tBody.append($row)
        // }
        // // empty our modal body and append newly populated table with input fields
        // $table.append($tBody);



        // $archiveItemBody.append($table)
        $saveArchiveItemButton.attr('id', event2.target.id)


        $saveArchiveItemButton.on("click", async (event) =>{
            console.log('saving ')
            // grab the input fields by the id names. 
            let $artist = $('#Artist\\:').val()
            let $title = $('#Title\\:').val()
            let $year = $('#Year\\ Created\\:').val()
            let $notes = $('#Notes\\:').val()
            let $materials = $('#Materials\\:').val()
            let $imageUrl = $('#Image\\ URL\\:').val()

            if(!$artist){
                $artist = document.getElementById('Artist:').placeholder
            }
            if(!$title){
                $title = document.getElementById('Title:').placeholder
            }
            if(!$year){
                $year = document.getElementById('Year Created:').placeholder
            }
            if(!$notes){
                $notes = document.getElementById('Notes:').placeholder
            }
            if(!$materials){
                $materials = document.getElementById('Materials:').placeholder
            }
            if(!$imageUrl){
                $imageUrl = document.getElementById('Image URL:').placeholder

            }

           
            // Create updated artwork document      
            const updatedArtwork = {
                title: $title,
                artist: $artist,
                year: Number($year),
                materials: [$materials],
                notes: $notes,
                imageUrl: $imageUrl
            }

            // Make a put request to the database with input values  
            // console.log(event.target.id)
            const updatedResponse = await fetch(`${URL}artworks/${event.target.id}`, {
                method: "put",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(updatedArtwork)
            })
            // console.log(updatedResponse)

            // close the modal and return to the main gallery 
            $editArchiveItem.modal('hide')
            // reload the gallery?
            // $('.all-artworks).empty()

            $tBody.empty()
            getArtworks()
        })
  
    })

    
    ///////////////// DELETE ARTWORK FUNCTION ///////////////////

    $deleteArchiveItemButton.on('click', async (event) =>{
        $deletePrompt.show()
        // show 'remove from archive' button
        $removeFromArchiveButton.show()
        $editArchiveItemButton.hide()
        $deleteArchiveItemButton.hide()
        $editCloseButton.hide()
        $cancelButton.show()    
        $removeFromArchiveButton.attr('id', event.target.id)

        $removeFromArchiveButton.on('click', async (event) =>{
            // get by id and delete
            const deleteResponse = await  fetch(`${URL}artworks/${event.target.id}`, {
                method: "delete"
                })
                console.log(deleteResponse)
                // reload home page
                $(document).ready(function(){$editArchiveItem.modal('hide')});
                $('.all-artworks').empty()
                getArtworks()
        })
    });
}




// grabs the buttons for edit and delete
const $editArchiveItemButton = $('.edit-archive-item-button');
const $deleteArchiveItemButton = $('#delete-archive-item-button');


const getArtworks = async () => {
    
    // display all artworks in a Bootstrap grid 
    axios.get(`${URL}artworks`).then(response => {
        // console.log(response.data)
        $allArtworks.innerHTML="";

        startCarousel(response.data)
        response.data.forEach(art => {
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
        $archiveItem = $(".archive-item");
        $archiveItem.on('click', openArchiveItemWindow);
    })

    // once initial data is loaded, store all images in variable $archiveItem
    
    // when one of the archive items is clicked, open archive item information window. 

}

getArtworks();
$archiveItem.on('click', openArchiveItemWindow);