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
    console.log(randomDoc)
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



// Opens the open artwork / archive item modal window. 
const openArchiveItemWindow = async (event) => {
    const $editArchiveItem = $('#archive-item-modal')
    // console.log($editArchiveItem)
    // Display the archive item's information in a modal window
    $(document).ready(function(){$editArchiveItem.modal('show')});
    // console.log('archive item window open');   

  // Find artwork in DB using the ID of the image clicked.
    const artwork = await fetch(`${URL}artworks/${event.target.id}`)
    .then(res => res.json());
    console.log(artwork);

   

    const $archiveItemBody = $('#archive-item-body');
    // let keys = Object.keys(artwork);
    // let values = Object.values(artwork);
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
    let $table = $('<table>').addClass('info-table');
    let $tHead = $('<thead>').addClass('table-header');
    let $tBody = $('<tbody>').addClass('table-body')

    for(let i=0; i< displayEntries.length; i++){
        let $row = $('<tr>')
        $header = $('<td>').text(displayEntries[i][0]).addClass('artwork-table-header').css('font-weight', 'bold');
        $info = $('<td>').text(displayEntries[i][1]).addClass('artwork-table-info');
        $tBody.append($row).append($header).append($info)

        if(displayEntries[i][0] === 'Image URL:'){
            let $image = $('<img>').attr('src', `${displayEntries[i][1]}`)
            $tHead.append($image)
           
        }
    }
    $table.append($tHead)
    $table.append($tBody);
    $archiveItemBody.append($table)

    //filter out the unnessary property names for the user side.
    // let disKeys = [];
    // for(let i = 0; i < keys.length; i++){    
    //     if(keys[i] !== 'createdAt' && keys[i] !== 'updatedAt' && keys[i] !== '__v' && keys[i] !== '_id'){
    //         if(keys[i] === 'imageUrl'){
    //             keys[i] = 'Image Url';
    //             disKeys.push(keys[i]);
    //         }else if(keys[i] === 'year'){
    //             keys[i]= 'Year Created';
    //             disKeys.push(keys[i]);
    //         }else{
    //             disKeys.push((keys[i].charAt(0).toUpperCase()) + keys[i].slice(1));
    //         };
    //     };
    // };
    // for(let i=0; i<disKeys.length; i++){
    //     $header = $('<p>').text(disKeys[i]).addClass('artwork-info-header').css('font-weight', 'bold');
    //     $archiveItemBody.append($header);
    // }



    // grabs the buttons for edit and delete
    const $editArchiveItemButton = $('#edit-archive-item-button');
    const $deleteArchiveItemButton = $('#delete-archive-item-button');
    // on click functions for the edit and delete buttons
    $editArchiveItemButton.on('click', openEditItemWindow);
    $deleteArchiveItemButton.on('click', openDeletePrompt);

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
    
  
      //update using the DOM 
    //   $ul.empty()
    // close the modal and return to the main gallery 
}

const openEditItemWindow = (event) =>{
    console.log('the id of the artwork to edit is:')
    console.log(event.target.id)
}

const openDeletePrompt = (event) =>{
    console.log('the id of the artwork to delete is:')
    console.log(event.target.id)
}