// const { response } = require("express");

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
const $addMoreButton = $('#add-more-button')
$editForm = $('.edit-form')

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
    
    const response = await fetch(`${URL}artists`)
        .then(response => response.json())
        .then((artists) => {    
            console.log(artists)

            artists.forEach((artistObj)=>{
                // if artist exists in database
                if(artistObj.name.toUpperCase() === artistName.val().toUpperCase()){
                    console.log(`The Artist ${artistName.val()} is in the database`)
                    // use artist document's _id as artist name for new artwork
                    artistName = artistObj._id;
                    addArtToDb(artistName);
                }
                // else{
                //     // console.log('no artist found in DB')
                //     //create artist ()
                //     // use artist document's id as artist name for new artwork
                //     // add art to db
                //     return false
                // }
            })
        })
}




//////////////////////// ADD ARTWORK TO DATABASE //////////////////////

const addArtToDb = async (artistName) => {

    const newArtwork = {
        title: $title.val(),
        artist: artistName,
        year: $year.val(),
        materials: $materialsMedium.val(),
        notes: $notes.val(),
        imgUrl: $imgUrl.val()
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


$addButton.on('click', addArtwork)