import OptionsSync from 'webext-options-sync';
import axios from 'axios';

const api =
  location.hostname === 'gitlab.com'
    ? 'https://gitlab.com/api/v4/'
    : `${location.origin}/api/v4/`;

async function get(query, personalToken) {
  return await axios.get(api + query, {
    'PRIVATE-TOKEN': personalToken
  });
}

async function fetch(type, query) {
  const { personalToken } = await new OptionsSync().getAll();
  if (!personalToken) {
    throw new Error('Personal token needed!');
  }
  switch (type) {
    case 'get':
      return await get(query, personalToken);
      break;
    default:
      break;
  }
}
export default fetch;
