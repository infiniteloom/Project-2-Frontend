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
const openArchiveItemWindow = (event) => {
    const $editArchiveItem = $('#archive-item-modal')
    console.log($editArchiveItem)
    // Display the archive item's information in a modal window
    $(document).ready(function(){$editArchiveItem.modal('show')});
    // $editArchiveItem.show();

    console.log('archive item window open');   


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
    
    // Find artist in DB using the ID of the image clicked.
    // const response = await fetch(`${URL}artworks/${event.target.id}`, {
    //     method: "put",
    //     headers: {
    //       "Content-Type" : "application/json"   
    //     },
    //     body: JSON.stringify(updatedArtwork)
    //   })
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