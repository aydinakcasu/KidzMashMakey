// ---------------------------------------------
function dump(obj) {
    obj = obj || this || {};
    return JSON.stringify(obj, null, '\t');
}
Array.prototype.dump = dump;
Object.prototype.dump = dump;

// ---------------------------------------------
function alertInternal(obj) {
    obj = obj || this || {};
    alert(obj.dump());
    return obj;
}
Array.prototype.alert = alertInternal;
Object.prototype.alert = alertInternal;

// ---------------------------------------------

function listToDictionary(list) {
    list = list || this || [];
    var dictionary = {};
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        dictionary[item.key] = item;
    }
    return dictionary;
}

Array.prototype.listToDictionary = listToDictionary;
