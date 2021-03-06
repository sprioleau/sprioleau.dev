/* eslint-disable no-param-reassign */

import getKeyValue from "./getKeyValue";

const organizeByKey = (array, path) => array.reduce((result, item) => {
  const property = getKeyValue(item, path);

  if (!result[property]) {
    result[property] = [item];
  } else {
    result[property].push(item);
  }
  return result;
}, {});

export default organizeByKey;
