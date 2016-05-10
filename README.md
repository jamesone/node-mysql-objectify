#node-mysql-objectify
Turn your node-mysql results into objects that have nested arrays of inner joins and etc...

This is pretty basic at the moment, but I'd like to build something universal and dynamic.

#TODO
- Make the objectifyMysqlResults function dynamic 
    + Meaning we can nest arrays+objects without having to use groupBy method from lodash.
    + At the moment, I'm using the `groupBy` method to merge mysql duplicate rows. Hopefully this can be removed.
        * By duplicates I mean the only difference in the results is the table that is associated by a foreign key. E.g an article may have multiple images, you have to run an INNER JOIN to select * the images for that one article.

At the moment I'm depending on `lodash`, when I have the time to work on this, I'll really put in some effort to build something dynamic and functional, without having to depend on the `lodash groupBy` function. 

#Lodash groupBy
In my queries I turn my columns into `tableName.columnName` using the `AS` function...You must do this if you want the objectifyMysqlResults function to work, as it splits the results up into objects based on the `tableName`.

With the below function I'm grouping by a `PK` and then mapping the results to look for the `image` field, and then placing the found `image` into an  `images`. 

```
 // #TODO make this dynamic and not just for images
  var mergedObjs = _.chain(res)
          .groupBy('profile.content_ptr_id')
          .map ( (item, i) => {
            return _.chain(item[0])
                .omit('image')
                .set('images', _.map(item, 'image'))
                .value( (val) => {
                  delete item;
                });
          })
          .value();
```

Note*
I built this fairly quickly and haven't had time to optimize or make it dynamic! :D 
