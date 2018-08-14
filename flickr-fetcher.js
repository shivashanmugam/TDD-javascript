const flickerFetcher = {
    photoObjToURL: function (photoObj) {

        return ['https://farm',
            photoObj.farm,
            '.staticflickr.com/',
            photoObj.server, '/',
            photoObj.id, '_',
            photoObj.secret, '_b.jpg'
        ].join('');
    },
    transformPhotoObj: function(input){
        return {
            title: input.title,
            url : flickerFetcher.photoObjToURL(input)
        }
    },
    fetchFlickrData: function(apiKey, fetch){
        if((!fetch) && typeof jQuery !== undefined){
            fetch = jQuery.getJSON.bind(jQuery);
        }
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
                        + apiKey + '&text=pugs&format=json&nojsoncallback=1'
        return fetch(url)
    },
    fetchPhotos: function(apiKey, fetch){
        return flickerFetcher.fetchFlickrData(apiKey, fetch).then(function(data){
            return data.photos.photo.map(flickerFetcher.transformPhotoObj)
        });
    }
}
// flickr-fetcher.js
//module won't be available in broswer, only in node, we need it all functions to be available testfile
if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = flickerFetcher;
}
