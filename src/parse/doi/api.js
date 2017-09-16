import request from 'sync-request'
import parseDoiJson from './json'

/**
 * Fetch DOI API results
 *
 * @access private
 * @method fetchDoiApi
 *
 * @param {String} url - The input url
 *
 * @return {CSL} The fetched JSON
 */
const fetchDoiApi = function (url) {
  try {
    return JSON.parse(request('GET', url, {
      headers: {
        Accept: 'application/vnd.citationstyles.csl+json'
      },
      allowRedirectHeaders: ['Accept']
    }).getBody('utf8'))
  } catch (e) {
    logger.error('[set]', `File '${url}' could not be fetched:`, e.message)
    return {}
  }
}

/**
 * Get CSL JSON from DOI API URLs.
 *
 * @access protected
 * @method parseDoiApi
 *
 * @param {String|Array<String>} data - DOIs
 *
 * @return {Array<CSL>} Array of CSL
 */
const parseDoiApi = data => [].concat(data).map(fetchDoiApi).map(parseDoiJson)

export const name = '@doi/api'
export {
  parseDoiApi as data,
  parseDoiApi as default
}
