// global canvas
let canvas = new fabric.Canvas('my-canvas', {
    isDrawingMode: false
})

jQuery(function($) {
    // SETTINGS
    // fabricjs
    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = 3
    }

    // EVENTS
    // event: toggle drawing
    $('#canvas-toggle-drawing').on('click', function(e) {
        e.preventDefault()
        canvas.isDrawingMode = !canvas.isDrawingMode

        if (canvas.isDrawingMode) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    })

    // event: change color
    $('#canvas-brush-color').on('change', function(e) {
        canvas.freeDrawingBrush.color = $(this).val()
    })

    // event: clear canvas
    $('#canvas-clear').on('click', function(e) {
        e.preventDefault()
        canvas.clear()
    })

    // event: click to add image
    $('#trigger-add-image').on('click', function(e) {
        e.preventDefault()
        $('#canvas-add-image').trigger('click')
    })

    // event: add image via file upload
    $('#canvas-add-image').on('change', function(e) {
        let newImg = new Image()
        let el = $(this)
        const file = e.target.files[0]
        if (!file.type.match('image.*')) {
            console.error('file is not an image type')
            el.val('')
            return
        }

        const reader = new FileReader()
        reader.addEventListener('load', function(event) {
            newImg.src = event.target.result
            newImg.onload = function () {
                let fabricImg = new fabric.Image(newImg, {
                    scaleX: .2,
                    scaleY: .2
                })
                canvas.add(fabricImg)
                canvas.renderAll()
                el.val('')
            }
        })
        reader.readAsDataURL(file)
    })

    // delete object
    // event: delete using key "Del" or "Delete"
    $('html').keyup(function(e) {
        if (e.keyCode === 46) {
            let selection = canvas.getActiveObject()
            deleteObject(selection, canvas)
        }
    })

    // event: delete using button
    $('#canvas-delete-object').on('click', function(e) {
        e.preventDefault()
        let selection = canvas.getActiveObject()
        deleteObject(selection, canvas)
    })

    // function: delete object inside canvas
    // this method can delete multiple selected objects
    function deleteObject(selection, canvas)
    {
        if (selection.type === 'activeSelection') {
            selection.forEachObject(function(element) {
                canvas.remove(element);
            });
        } else {
            canvas.remove(selection)
        }
        canvas.discardActiveObject()
        canvas.requestRenderAll()
    }

    // event: load base64 image from localstorage
    $("#canvas-load-img").on('click', function(e) {
        e.preventDefault()
        const base64_image = localStorage.getItem('newImage') || ''
        if (base64_image === '') {
            return
        }

        let newImg = new Image()
        newImg.src = base64_image

        newImg.onload = function () {
            let fabricImg = new fabric.Image(newImg, {})

            canvas.clear()
            canvas.add(fabricImg)
            canvas.renderAll()
        }
    })

    // event: load json object from localstorage
    $("#canvas-load-json").on('click', function(e) {
        e.preventDefault()
        const imgJSON = localStorage.getItem('newImageJSON') || ''
        if (imgJSON === '') {
            return
        }

        canvas.clear()
        canvas.loadFromJSON(imgJSON)
        canvas.renderAll()
    })

    // event: save canvas
    $('#canvas-save').on('click', function(e) {
        e.preventDefault()

        // this function will save the canvas in localstorage as the following
        // base64 png
        localStorage.setItem('newImage', canvas.toDataURL('png', 0.8))
        // json string
        localStorage.setItem('newImageJSON', JSON.stringify(canvas.toObject()))
    })
})