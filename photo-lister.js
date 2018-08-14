const photoLister = {
    photoToListItem: function(input){
        return ['<li><figure><img src="',
        input.url, '" alt=""/><figcaption>',
        input.title, '</figcaption></figure></li>'].join('');
    },
    photoToListToHTML: function(input){
        return ['<ul>',input.map(photoLister.photoToListItem).join(''),'</ul>'].join('');
    },
    addPhotosToElement: function($, selector , list){
        return $(selector).append(list);
    }
}

//module won't be available in broswer, only in node, we need it all functions to be available testfile
if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = photoLister;
}