shoudilistenit-api
==================

API's for Shouldilistenit.

**Shouldilistenit** set you up for your next Gig.

## API
	/v1/artist/<artistname>

### Example of reply

	{
		"artist": "artistname",
		"songs": [
			{ "title": "foo", "count": 10 },
			{ "title": "foobar", "count": 9 },
			{ "title": "barfoo", "count": 7 },
			{ "title": "foobarfoo", "count": 3 },
			{ "title": "bar", "count": 3 },
			{ "title": "barfoobar", "count": 13 }
		],
		"songsTot": 33
		"setsTot": 2
	}
