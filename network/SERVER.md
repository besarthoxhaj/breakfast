## Web Server vs Web Framework

> A web server listens for web connections and either serves static content from files, or passes requests onto other code.  Originally, the "passing on" meant executing programs (usually scripts) separate from the WS, using a protocol called CGI (just a standard way to describe call the script, communicating the request, who it came from, etc.)  Script libraries, for parsing CGI requests, or generating HTML became the first web frameworks.  It became common to reduce the overhead of these external scripts by grafting the script interpreter onto the WS.  Web frameworks have, over time, started to take over much of the request-parsing aspect of the WS ("routing") - enough so that some frameworks decided to dispense with the WS entirely.  The style of web programming has also changed: javascript now puts a lot of the WF's logic into the browser, so that whatever logic is still on the WS may be much reduced (as opposed to the original CGI notion, where the browser really only handled rendering of a static blob of HTML provided by the WS.)
So, usually when people say WS, they mean a generic WS like Apache.  When people say WF, they usually mean something like PHP or more modern JS-based system that includes templating, ORM, routing, etc.
[From Quora](https://goo.gl/WPuAMA)