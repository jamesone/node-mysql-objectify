#node-mysql-objectify
Turn your node-mysql results into objects that have nested arrays of inner joins and etc...

This is pretty basic at the moment, but I'd like to build something universal and dynamic.

#TODO
- Make the objectifyMysqlResults function dynamic 
    + Meaning we can nest arrays without having to use groupBy from lodash.
    + At the moment, if you have a specific table in your query that is going to cause duplicate results, you have to specific it in the groupBy lodash function.
        * By duplicates I mean the only difference in the results is the table that is associated by a foreign key. E.g an article may have multiple images, you have to run an INNER JOIN to select * the images for that one article.