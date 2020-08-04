// const axios = require('axios')
const URL = 'https://ltproject2.herokuapp.com/';

// Global variables for adding a new artwork
const $addButton = $('#add-button');






//////////////////////// CHECK IF ARTIST EXISTS IN DATABASE //////////////////////

const doesArtistExist = async (artistName)=>{
    console.log(artistName)
    const allArtists = await fetch(`${URL}artists`).then(response => response.json())
    console.log(allArtists)

    allArtists.forEach((artistObj)=>{
        if(artistObj.name.toUpperCase() === artistName.toUpperCase()){
            console.log(`there is an artist with the name ${artistName} in the database`)
            // return true
        }else{
            console.log('there is no artist of that name. create artist?')
            // return false
        }
    })
    console.log(allArtists)
    return 
}




//////////////////////// CHECK FOR VALUES IN REQUIRED INPUT FIELDS //////////////////////

// show the error on an input field that doesn't have a value.
const showError = (input) =>{
        input.addClass('error')
        input.val(' * Required Field')
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



//////////////////////// ADD ARTWORK SUBMIT BUTTON CLICK MAIN FUNCTION  //////////////////////

// Add Artwork Function:
$addButton.on('click', (e) =>{

    // Variables to get info from the input fields
    const $title = $('#title-input');
    const $artistName = $('#artist-input');
    const $year = $('#year-input');
    const $materialsMedium = $('#materials-input');
    const $notes = $('#notes-input');
    const $imgUrl = $('#url-input');

    // Create array of required fields 
    const required = [$title, $artistName, $imgUrl];



    // Value returns true if there are no empy fields. 
    if(checkErrors(required) === true ){
        // Create an array of all value fields. 
        const $allInputs = [$title, $artistName, $year, $materialsMedium, $notes, $imgUrl];
        console.log('all inputs are documented')
        // console.log($allInputs)
        // Check that there are no duplicate artists. 
        if(doesArtistExist($artistName) === true){
            console.log('append the artist id to the artwork')
        }else{
            console.log('add artist to artist db then append id to the artwork')
        }
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
})