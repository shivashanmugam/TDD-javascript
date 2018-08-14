// The TDD is based on https://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-intro/

`use strict`;
const expect = require('chai').expect;
const flickerFetcher =  require('./flickr-fetcher.js');

describe('FlickerFetcher', function(){
    it('should exist', function(){
        expect(flickerFetcher).to.not.be.undefined;
        expect(flickerFetcher).to.not.be.undefined;
    })
})
//expect(actual).to.be.eql and expect(actual).to.be.equal is different 
describe('#photoObjToURL', function(){
    it('should take photo object and return photo url', function(){
        let expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
        let input = {
            id:       '24770505034',
            owner:    '97248275@N03',
            secret:   '31a9986429',
            server:   '1577',
            farm:     2,
            title:    '20160229090898',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        }
        let actual = flickerFetcher.photoObjToURL(input);
        expect(actual).to.be.eql(expected);

        input = {
            id:       '24770504484',
            owner:    '97248275@N03',
            secret:   '69dd90d5dd',
            server:   '1451',
            farm:     2,
            title:    '20160229090903',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        expected = 'https://farm2.staticflickr.com/1451/24770504484_69dd90d5dd_b.jpg';
        actual = flickerFetcher.photoObjToURL(input);
        expect(actual).to.equal(expected);
    })
})

describe('#transformPhotoObj()', function(){
    it('should take photo object and return just tile and url', function(){
        let input = {
            id:       '24770505034',
            owner:    '97248275@N03',
            secret:   '31a9986429',
            server:   '1577',
            farm:     2,
            title:    'Dog goes to desperate measure to avoid walking on a leash',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        }
        let expected = {
            title: 'Dog goes to desperate measure to avoid walking on a leash',
            url : 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg'
        }
        let actual = flickerFetcher.transformPhotoObj(input);
        expect(actual).to.eql(expected);
    })
})

//If a test returns a promise then test result will execute resolve or reject to finish the test
//Else If a test need to wait until certain time, (can pass `done` as a parameter to `it` callback function and invoking `done()` will finish test)
describe('#fetchFlickerData', function(){
    it('should resolve a fetch url by resolving promise', function(){
        const apiKey =  'does not matter much what this is right now';
        const fakeData = {
            'photos': {
                'page':    1,
                'pages':   2872,
                'perpage': 100,
                'total':   '287170',
                'photo':   [{
                    'id':       '24770505034',
                    'owner':    '97248275@N03',
                    'secret':   '31a9986429',
                    'server':   '1577',
                    'farm':     2,
                    'title':    '20160229090898',
                    'ispublic': 1,
                    'isfriend': 0,
                    'isfamily': 0
                }, {
                    'id':       '24770504484',
                    'owner':    '97248275@N03',
                    'secret':   '69dd90d5dd',
                    'server':   '1451',
                    'farm':     2,
                    'title':    '20160229090903',
                    'ispublic': 1,
                    'isfriend': 0,
                    'isfamily': 0
                }]
            }
        };
        //A stub which will act as a http fetcher like jquery $get
        fakeFetcher = function(url) {
            const expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
                        + apiKey + '&text=pugs&format=json&nojsoncallback=1'
            expect(url).to.equal(expectedURL)
            return Promise.resolve(fakeData);
        };
        //The reason being sending fakeFetcher to writing pure functions (If every dependencies are in local scope, no need to worry about dependencies, The function could be a standalone hence it is pure)
        return flickerFetcher.fetchFlickrData(apiKey, fakeFetcher).then(function(actual){
            expect(actual).to.eql(fakeData)
        })
    })
})

describe('#fetchPhotos', function(data){
    it('should fetch photo and return as photo object', function(){
        const apiKey =  'does not matter much what this is right now';
        const expected = [
            {
                'title':'Dog goes to desperate measure to avoid walking on a leash',
                'url':'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            },{
                'title':'the other cate',
                'url':'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
            }
        ]
        const fakeData = {
            'photos': {
                'page':    1,
                'pages':   2872,
                'perpage': 100,
                'total':   '287170',
                'photo':   [{
                    id:       '25373736106',
                    owner:    '99117316@N03',
                    secret:   '146731fcb7',
                    server:   '1669',
                    farm:     2,
                    title:    'Dog goes to desperate measure to avoid walking on a leash',
                    ispublic: 1,
                    isfriend: 0,
                    isfamily: 0
                }, {
                    id:       '24765033584',
                    owner:    '27294864@N02',
                    secret:   '3c190c104e',
                    server:   '1514',
                    farm:     2,
                    title:    'the other cate',
                    ispublic: 1,
                    isfriend: 0,
                    isfamily: 0
                }]
            }
        };
        fakeFetcher = function(url) {
            const expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
                        + apiKey + '&text=pugs&format=json&nojsoncallback=1'
            expect(url).to.equal(expectedURL)
            return Promise.resolve(fakeData);
        };
        return flickerFetcher.fetchPhotos(apiKey, fakeFetcher).then(function(actual){
            expect(actual).to.eql(expected)
        })
    })
})
