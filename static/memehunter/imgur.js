// I tried to get the imgur urls to load in the preload of the game but the timing
// was never right. Here I have cheated and loaded all the json information before
// the game even starts. This means there is no loading screen at this point but
// it was the best I could do. If you know a better way tell me.

var imgurImages = [];
var imgurURLS = [];

var frontPageSettings = {
    "crossDomain": true,
    "url": "https://api.imgur.com/3/gallery/hot/viral/0.json",
    "headers": { "authorization": "Client-ID 00595d523609a70" }
}
function addToImgurList(imageInfo){
    if (imageInfo['size'] < 200*1024){
        imgurImages.push(imageInfo['id']);
        imgurURLS.push(imageInfo['link']);
    }
}

$.get(frontPageSettings, function (response) {
    var i = 0;
    while (imgurImages.length < 10 && i < 59){
        if (response['data'][i]['is_album'] == true){
            var imageInfoSettings = {
                "crossDomain": true,
                "url": "https://api.imgur.com/3/image/" + response['data'][i]['cover'],
                "headers": { "authorization": "Client-ID 00595d523609a70" }
            }
            $.get(imageInfoSettings, function(response){addToImgurList(response['data']);});
        } else {
            addToImgurList(response['data'][i]);
        }
        i += 1;
    }
});
