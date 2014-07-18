shoudilistenit-api
==================

API's for Shouldilistenit.

**Shouldilistenit** set you up for your next Gig

## API
	/artist/<artistname>

### Example of reply

	{
		"artist": "best_artist",
		"songs": [
			{ "name": "foo", "count": 10, "quota": 30 },
			{ "name": "foobar", "count": 9, "quota": 27 },
			{ "name": "barfoo", "count": 7, "quota": 21 },
			{ "name": "foobarfoo", "count": 3, "quota": 9 },
			{ "name": "bar", "count": 3, "quota": 9 },
			{ "name": "barfoobar", "count": 1, "quota": 3 }
		],
		"songsTot": 33
	}
