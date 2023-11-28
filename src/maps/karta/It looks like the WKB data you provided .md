It looks like the WKB data you provided (0101000020E61000004DC3FE54D989304031FC75E1269D4640) might be incomplete or malformed. In a valid WKB representation for a point geometry, there should be additional bytes representing the point's coordinates.

A correct WKB representation for a point with coordinates (latitude: 45.2, longitude: 16.2) would look something like this:

Copy code
0101000000582D4454FB210540
Each part of the WKB encoding has a specific meaning, and an error in any part can result in an invalid or incomplete representation.

Please double-check the way you are obtaining or storing the WKB data to ensure it is a complete and valid representation of a point geometry. If you have control over how the WKB data is generated, make sure it includes both the geometry type and the coordinates. If you're retrieving the data from an external source, there might be an issue with how it's being stored or transmitted.

If you can provide more context on how the WKB data is generated or obtained, I might be able to offer more specific guidance.
