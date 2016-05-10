exports.objectifyMysqlResults = (results) => {
  var oldTableName = null;

  var res = results.map (function (object, i) {
    // Create object that will be returned inside the "res" array. E.g res = [ {} ]
    var objReturn = {};

    for (key in object) {
      var row = key.split ('.'); // E.g content.image = ['content', 'image'] OR if a literal ['distance']
      var tableName = row[0]; // E.g content (if row is a literal, it will return the name of literal)
      var rowName = row[1]; // E.g image_url

      // Check to see if oldtablename = newtablename | If not the same then create new object that will nest others
      if (oldTableName != tableName || oldTableName == null) {

        // Check if a literal, e.g distance (it's not assoicated to a table & will be located in the root of the object)
        if (row.length == 1) {
          objReturn[key] = object[key]; // Create x: val
        } else {
            objReturn[tableName] = {}; // Creates new object, e.g - image: {}
            objReturn[tableName][rowName] = object[key]; // Creates new key inside object & assigns val, e.g image: {key: val}
        }
      } // Adds key to existing object e.g image: {key1: val1, key2: val2} ->
      else {
        objReturn[tableName][rowName] = object[key];
      }

      // Take not of oldtablename & last object id
      oldTableName = tableName;
    }

    return objReturn;
  });

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
  return mergedObjs;
}
