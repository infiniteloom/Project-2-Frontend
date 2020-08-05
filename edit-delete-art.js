
// const $archiveItem = $(".archive-item");
const $openArchiveItem = $('#archive-item-modal');
console.log($archiveItem);
console.log($archiveItem.id);

// Opens the open artwork / archive item modal window. 
const openArchiveItemWindow = (event) => {
    console.log(event.target.id);
    // show the archive item window
    $(document).ready(function(){$editArchiveItem.modal('show')});
    console.log('archive item window open ');   
    showArchiveItemInfo(event.target.id)
}

const openEditItemWindow = () =>{
    console.log('edit item')
}



$archiveItem.on('click', openArchiveItemWindow);
$editArchiveItem.on('click', openEditItemWindow)