function isShallowEqual(object1, object2){
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
}

function searchObgValueInMap(map, obj){
    for(const [key, value] of map){
        if( isShallowEqual(obj, value) )
            return key;    
    }

    return -1;      
}

function populateAllowedPositions(allowedPositions, deniedPositions, map){
    for(const key of map.keys())
        allowedPositions.add(key);

    for (const element of deniedPositions) {
        allowedPositions.delete(element);
    }

    console.log('ALLOWED', allowedPositions);

    return allowedPositions;
}