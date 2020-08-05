// const { response } = require("express");

// const Artist = require("../../backend/Project-2-Backend/models/artist");

// const axios = require('axios')
const URL = 'https://ltproject2.herokuapp.com/';


// Global Variables to get info from the input fields
const $title = $('#title-input');
const $artistName = $('#artist-input');
const $year = $('#year-input');
const $materialsMedium = $('#materials-input');
const $notes = $('#notes-input');
const $imgUrl = $('#url-input');
const $addButton = $('#add-button');
const $returnButton = $('#return-button');
const $addMoreButton = $('#add-more-button');
const $modalAddArtistButton = $('#modal-add-button');
const $editForm = $('.edit-form');
const $addArtistModal    = $('#add-artist-modal');
const $addArtistButton = $('#add-artist-button')
const $addMediumModal = $('#add-medium-modal')
const $mediumModalInput = $("#medium-modal-input")
const $addMediumButton = ("#add-medium-button");





//////////////////////// CHECK FOR VALUES IN REQUIRED INPUT FIELDS //////////////////////

// show the error on an input field that doesn't have a value.
const showError = (input) =>{
    input.addClass('error')
    input.attr('placeholder', ' * Required Field')
return
}
// Show error if required input fields are empty
const checkErrors = (requiredArray) => {
console.log('checking for errors')
// create empty array for any errors 
let errors = [];

// for all the inputs that are required, show errors and push input to errors array
requiredArray.forEach((input)=>{
    if(!input.val()){
        showError(input)
        errors.push(input)
    }
})
// if there are no errors pushed to the errors array, return true
    if(errors.length === 0){
        console.log('all is well')
        return true;
    }else{
        return false;
    }
}




//////////////////////// CHECK IF ARTIST EXISTS IN DATABASE //////////////////////

const checkArtist = async (artistName)=>{
    // const allArtists = await fetch(`${URL}artists`).then(response => response.json())
    
    const allArtists = await fetch(`${URL}artists`)
        // return DB info as json
        .then(response => response.json())
        // 'artists' consists of all the docs in DB
        .then((artists) => {    
        // find the artist with the matching name and filter to the array of theArtist
        const theArtist = artists.filter((artistObj) =>{
            return artistObj.name.toUpperCase() === artistName.val().toUpperCase()
        })
        // console.log(theArtist)
        // if theArtist array is empty, artist does not exist
        if(theArtist.length === 0){
            console.log('this artist does not exist')
            // show modal prompt to ask if the user would like to add the artist to the db.
            $('#modal-body-text').text(`Add ${artistName.val()} to your collection?`)
            $(document).ready(function(){$addArtistModal.modal('show')});
            $addArtistButton.attr('id', artistName.val())
            $addArtistButton.on('click', addArtist)
            // see on-click event for addArtist()
        }

        // artworks array could be empty to start 
        artistName = artistObj._id;
        addArtToDb(artistName); 
        })
}

//////////////////////// ADD ARTIST TO DATABASE //////////////////////

const addArtist = async () =>{
    console.log('made it to the add artist popo up )')
    console.log(event.target.id)
    // show modal prompt for artist's medium
    // $addArtistModal.modal('hide');
    // $(document).ready(function(){$addMediumModal.modal('show')});

    // get the value of the medium input
    const medium = $mediumModalInput.val()
    const artist = {
        name: event.target.id,
        artworks: [],
        medium: `${medium}`
    }

    const response = await fetch(`${URL}artists`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist)
        }
    ) 

    return artist
}






//////////////////////// ADD ARTWORK TO DATABASE //////////////////////

const addArtToDb = async (artistName) => {

    const newArtwork = {
        title: $title.val(),
        artist: artistName,
        year: $year.val(),
        materials: $materialsMedium.val(),
        notes: $notes.val(),
        imageUrl: $imgUrl.val()
    }
    // console.log(newArtwork)

    const response = await fetch(`${URL}artworks`, 
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newArtwork)
        }
    )
    console.log(response)
    // console.log('successfully added new artwork to database')


    $returnButton.css('display', 'block');
    $addMoreButton.css('display', 'block');
    $editForm.css('display', 'none')
}


//////////////////////// ADD ARTWORK SUBMIT BUTTON CLICK MAIN FUNCTION  //////////////////////

// Add Artwork Function:
const addArtwork = () =>{
    // console.log('add artwork function')

    // Create array of required fields 
    const required = [$title, $artistName, $imgUrl];

    // Value returns true if there are no empy fields. 
    if(checkErrors(required) === true ){
        console.log('all inputs are documented')

        // Check that there are no duplicate artists. 
        checkArtist($artistName)
        // if(doesArtistExist($artistName)){
        //     addArtToDb($artistName)
            // const newArtwork = {
            //     title: $title.val(),
            //     artist: $artistName.val(),
            //     year: $year.val(),
            //     materials: $materialsMedium.val(),
            //     notes: $notes.val(),
            //     imgUrl: $imgUrl.val()
            // }
            // const response = await fetch(  `${URL}artworks`, {
            //     method: "post",
            //     headers: {
            //         "Content-Type" : "application/json"
            //     },
            //     body: JSON.stringify(newArtwork)
            // })
            // console.log(response)
        // }else{
        //     console.log('add artist to artist db then append id to the artwork')
        // }
    }else{
        return
    }
    // make a post request for a new artork. 
    // axios.post(`${URL}artworks`, {
    //     title,
    //     artist,
    //     year,
    //     materials,
    //     notes,
    //     imageUrl
    // })
}


$addButton.on('click', addArtwork);
$modalAddArtistButton.on('click', addArtist);