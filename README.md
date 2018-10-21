To run via docker, in the command line interface:

1. Execute: docker pull knmcfaul/ine-beers:prod
2. Execute: docker run -d --name ine-beers -p 80:80 knmcfaul/ine-beers:prod
3. Navigate to localhost to view the application

For the development image on docker, replace "knmcfaul/ine-beers:prod" with "knmcfaul/ine-beers:dev", and update the port
mapping from "-p 80:80" to "-p 3000:3000". Navigate to localhost:3000 to view the app.

To run via node, in the command line interface:

1. Execute: npm install
2. Execute: npm run build
3. Execute: npm start
4. Navigate to localhost:3000 to view the application

Design notes:

For the overall list view of the beers, I decided to go with a table which innately implies sorting. The other view I
had considered was a card view but sorting based on the small details text that would be contained I thought may be
confusing for a user.

Sorting was not supported in the punkapi so I decided to do the data processing on the client side, retrieving all beers
and storing them in memory. I went this route because there wasn't a large total number of beers (234) and the data
each beer contains are only numbers and strings. I also built the sorting and pagination manually opposed to using the Ant
Table built in sorting as that only sorts the current page and not the whole data set. Because the initial data fetch
may take more than a second, I added a loading state so the user knows the app isn't frozen.

For the details view, I went with a drawer schema. I haven't done one before and it looked pretty cool. I also considered
a modal and a separate page with navigation but since the data was already available from the table rows I kept to a
single page application. As I was developing I realized that the total information per beer would exceed a typical screen
height, so I decided to implement a second level of the drawer that housed information regarding the brewing method. The
thinking here is that a user would click on the table row to view beer details, and then could expand the view if they
wanted the details to make the beer themselves. It was a bit of a learning process for me to design the views because I
have no experience in brewing beer, so the organization of data may be slightly inaccurate.

I wrote some basic unit tests as well to check rendering, and sanity checked with manual runs of the app.

For V2:

Some assorted ideas I had while developing the app that I didn't have time for and could see in a future version:

- Filtering. The punkapi supports filtering and a user could benefit from narrowing down the 200+ beers by categories
such as yeast types or a range of ABV.
- Implementation of a light server side. Currently the application fetches all beers and does all sorting client-side,
since the total number of beers and the data per beer is relatively small, but this could be offloaded to a server.
- Return to a card view. A card view with more visualization (such as a picture of each beer) may feel more interactive
than a table.
- Bookmarking. Since the app doesn't change URLs when beers are selected, it isn't possible to directly navigate to a
specific beer's details from a bookmark.