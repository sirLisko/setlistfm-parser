# Setlist.fm Parser

[![Build Status](https://travis-ci.org/sirLisko/setlistfm-parser.svg)](https://travis-ci.org/sirLisko/setlistfm-parser)
[![Coverage Status](https://coveralls.io/repos/sirLisko/setlistfm-parser/badge.svg?branch=master&service=github)](https://coveralls.io/github/sirLisko/setlistfm-parser?branch=master)
[![dependency Status](https://david-dm.org/sirlisko/setlistfm-parser/status.svg)](https://david-dm.org/sirlisko/setlistfm-parser#info=dependencies)
[![devDependency Status](https://david-dm.org/sirlisko/setlistfm-parser/dev-status.svg)](https://david-dm.org/sirlisko/setlistfm-parser#info=devDependencies)

A Promises based parser for [https://www.setlist.fm](https://www.setlist.fm).

## Methods

### setList.getTracks(artist)

Return all the tracks played by an `artist`, in the last year of gigs.

## Example

```js
var setList = require('setlist');

setList.getTracks('the strokes').then(console.log).done(); 
```

output:

```js
{
    artist: 'The Strokes',
    tracks: [
        { title: 'new york city cops', count: 4 },
        { title: 'you only live once', count: 4 },
        { title: 'the end has no end', count: 4 },
        { title: 'someday', count: 4 },
        ...
     ],
    tracksTot: 72,
    setsTot: 4
}
```

### API key

A [SetListFM API key](https://api.setlist.fm/docs/1.0/index.html) is needed.

```bash
export SETLISTFMAPIKEY={token}
```
