# FabricJS - Handwriting

Handwriting demo using [FabricJS](https://github.com/fabricjs/fabric.js)



### Test locally

Install browser-sync

`npm install -g browser-sync`

then run the following command

`browser-sync start -s ./ -f ./`



### How to use

##### Drawing

click pencil button to toggle drawing mode, it will enable free handwriting mode

click again to switch to edit mode



##### Saving

click SAVE button will save the canvas object as 2 items in localstorage

newImage = base64 image/png

newImageJSON = JSON in string format



##### Load Image

It will load the newImage from localstorage to canvas



##### Load JSON

it will load the newImageJSON from localstorage to canvas



### Notes

##### Disclaimer

This source code was created as POC for basic handwriting function using FabricJS



##### Testing

The source code is tested and working well with Google Chrome