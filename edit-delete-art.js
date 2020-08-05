
// const $archiveItem = $(".archive-item");
// const $openArchiveItem = $('#archive-item-modal');
// console.log($archiveItem);
// console.log($archiveItem.id);

// // Opens the open artwork / archive item modal window. 
// const openArchiveItemWindow = (event) => {
//     console.log(event.target.id);
//     // show the archive item window
//     $(document).ready(function(){$editArchiveItem.modal('show')});
//     console.log('archive item window open');   
//     // Find artist in DB using the ID of the image clicked.
//     const response = await fetch(`${URL}artworks/${event.target.id}`, {
//         method: "put",
//         headers: {
//           "Content-Type" : "application/json"   /// tells the something that the data is json 
//         },
//         body: JSON.stringify(updatedArtwork)
//       })
//       //update using the DOM 
//     //   $ul.empty()
//     // close the modal and return to the main gallery 
// }

// const openEditItemWindow = () =>{
//     console.log('edit item')
// }



// $archiveItem.on('click', openArchiveItemWindow);
// $editArchiveItem.on('click', openEditItemWindow)