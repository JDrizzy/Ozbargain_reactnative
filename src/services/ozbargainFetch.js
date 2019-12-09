import * as rssParser from 'react-native-rss-parser';

export default class OzBargainFetch {
  static async execute() {
    return new Promise((resolve, reject) => {
      fetch('https://www.ozbargain.com.au/feed')
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then(rss => {
          resolve(rss);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
