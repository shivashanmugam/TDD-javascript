`use strict`;
const expect = require('chai').expect;
const photoLister = require('./photo-lister.js');
const cheerio = require('cheerio');
describe('photoLister', function () {
    it('should exist', function () {
        expect(photoLister).to.not.be.undefined;
    })
})

describe('#photoToListItem()', function () {
    it('should convert photo Object to li', function () {
        const input = {
            title: 'This is a test',
            url: 'http://loremflickr.com/960/593'
        };
        const expected = ['<li><figure><img src="http://loremflickr.com/960/593" alt=""/>',
            '<figcaption>This is a test</figcaption></figure></li>'].join('')
        const actual = photoLister.photoToListItem(input)
        expect(actual).to.equal(expected)
    })
})

describe('#photoListToHTML()', function () {
    it('should take array of photos and convert them into list of items', function () {
        const input = [{
            title: 'This is a test',
            url: 'http://loremflickr.com/960/593'
        }, {
            title: 'This is another test',
            url: 'http://loremflickr.com/960/593/puppy'
        }];
        expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
            + '<figcaption>This is a test</figcaption></figure></li>'
            + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
            + '<figcaption>This is another test</figcaption></figure></li></ul>';
        const actual = photoLister.photoToListToHTML(input);
        expect(actual).to.equal(expected);

    })
})

describe('#addPhotosToElement()', function(){
    it('should add photo list elements into DOM of the page', function(){
        let $ = cheerio.load('<html><body><div id="myDiv"></div></body></html>');
        let list = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
        + '<figcaption>This is a test</figcaption></figure></li>'
        + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
        + '<figcaption>This is another test</figcaption></figure></li></ul>';
        const selector  = '#myDiv';
        $div = photoLister.addPhotosToElement($, selector, list);
        expect($div.find('ul').length).to.equal(1);
        expect($div.find('li').length).to.equal(2);
        expect($div.find('figure').length).to.equal(2);
        expect($div.find('img').length).to.equal(2);
        expect($div.find('figcaption').length).to.equal(2);
    })
})