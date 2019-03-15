 // check for allowable conditions
  if ( Array.isArray(array) && typeof element === 'number' ) {
    length   = array.length;
    mid      = Math.floor( length / 2 );
    midValue = array[mid];
    left     = array.slice(0, mid);
    right    = array.slice(mid + 1);
    result   = 0;

    if (length === 0) {
      // base condition
      return null;
      // result = null;
    } else if ( midValue === element ) {
      return mid;
      // result = mid;
    } else if ( midValue > element ) {
      return binarySearch( left, element );
      // result = binarySearch( left, element );
    } else {
      var temp = binarySearch( right, element );
      // result = temp === null ? temp : mid + temp + 1;
      return temp === null ? temp : mid + temp + 1;
    }
    // return result;
  }
};