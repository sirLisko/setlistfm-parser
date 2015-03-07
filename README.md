#Setlist.fm Parser

[![Build Status](https://travis-ci.org/sirLisko/setlistfm-parser.svg)](https://travis-ci.org/sirLisko/setlistfm-parser) [![dependency Status](https://david-dm.org/sirlisko/setlistfm-parser/status.svg)](https://david-dm.org/sirlisko/setlistfm-parser#info=dependencies) [![devDependency Status](https://david-dm.org/sirlisko/setlistfm-parser/dev-status.svg)](https://david-dm.org/sirlisko/setlistfm-parser#info=devDependencies)

A Promises based parser for [http://www.setlist.fm](http://www.setlist.fm).

### Methods
#### setList.getTracks(artist)
Return all the tracks played by an `artist`, in the last year of gigs.
### Example

```js
var setList = require('setlist');

setList.getTracks('the strokes').then(console.log).done(); 
```
output:
```js
{
    artist: 'The Strokes',
    songs: [
        { title: 'new york city cops', count: 4 },
        { title: 'you only live once', count: 4 },
        { title: 'the end has no end', count: 4 },
        { title: 'someday', count: 4 },
        ...
     ],
    songsTot: 72,
    setsTot: 4
}
```
