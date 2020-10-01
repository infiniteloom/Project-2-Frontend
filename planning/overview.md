# Project 2 Frontend Worksheet

## Description: 
**“Archivista.”** is an app that allows a user to manage their personal art collection or create a wishlist for a future collection through a modern, minimal interface. 

**Archivista** is a combination of the words 'archive' and 'vista', referring to the ability to view one’s art archives from a bird’s eye perspective. 

**Archivista** is primarly used by art collectors of all types but can also be used as a way to pin or save artworks to a wishlist for those who are interested in becoming a collector. Users will be able to add new artists/artworks or browse their existing collection by artist or by artworks. 

Features coming soon: 
- Search by artwork / artist name A-Z
- Sort artworks by user’s personal ratings to bring favorites up to the front 
- Toggle between list view and 'vista' view


## Inspiration: 
- Artsy.com
- Etsy.com 


## Wireframes

#### Web:

- [Home Page - Header](https://res.cloudinary.com/infiniteloom/image/upload/v1596226311/Unit%2002%20-%20Project%20/Web%20Mockup/Web_Intro_Header_p0mwqr.png)
- [Home Page - Full](https://res.cloudinary.com/infiniteloom/image/upload/v1596226311/Unit%2002%20-%20Project%20/Web%20Mockup/Web_Intro_Long_fhoj6z.png)
- [Edit Artwork View](https://res.cloudinary.com/infiniteloom/image/upload/v1596226311/Unit%2002%20-%20Project%20/Web%20Mockup/Web_Edit_Artwork_Page_ql0db1.png)

#### Mobile: 
- [Home Page - Header](https://res.cloudinary.com/infiniteloom/image/upload/v1596226225/Unit%2002%20-%20Project%20/Mobile%20Mockup/Mobile_Intro_Header_mwcx49.png)
- [Home Page - Full](https://res.cloudinary.com/infiniteloom/image/upload/v1596226225/Unit%2002%20-%20Project%20/Mobile%20Mockup/Mobile_Intro_Long_pl7ojh.png)
- [Edit Artwork View](https://res.cloudinary.com/infiniteloom/image/upload/v1596226253/Unit%2002%20-%20Project%20/Mobile%20Mockup/Mobile_Edit_Artwork_Page_lfcogw.png)
- [Footer](https://res.cloudinary.com/infiniteloom/image/upload/v1596226224/Unit%2002%20-%20Project%20/Mobile%20Mockup/Mobile_Intro_Footer_rbwe9o.png)


### Main Page Features: 
Used to visually browse archives using a default of 'vista' view- a grid gallery with no text unless clicked on. 

1.	Sticky header 
    *	Logo/title
    *	Button - "View All" (default display)
    *	Button - "Edit Archive" (goes to edit archive page)

2.	Header/banner image with featured image
3.	Flex grid gallery of square thumbnails of different artworks in database, infinite scroll for MVP 
4. Search bar (post-MVP)

5. When an image is clicked on, a modal pops up with the information for that particular artwork. 
    * If the user is interested in editing an artwork, they can do so through buttons on this window. 
        - Clicking 'edit' will turn the description text into input fields. 
        - If any input field is left blank, the form will use the placeholder text (existing information) to send to the database.
    * If the user is interested in deleting an artwork, they can also do so here through a 'delete' button. 
        - First click will show a prompt in red that asks if the user is sure they want to delete the artwork. 
        - A new button will appear to confirm the delete. 
        



### Edit Archive Page Features: 
1. Form to add new artworks with:
    * title
    * year created
    * materials
    * artist name 
    * user rating (post-MVP)

2. Button ‘Add to Archive’ will first:
    * check if the artist exists in the database.
        - if the artist exists, then the artwork gets added
        - if the artist does not exist, user will be prompted to add the artist and then to add the medium before the modal window closes and artwork can be added to archive. 





