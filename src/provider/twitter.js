import TwitterClient from "twitter";
import BPromise from "bluebird";
import moment from "moment";

class Twitter {
  constructor(config) {
    this.config = config;
  }

  getInfo() {
    return {
      'slug': 'twitter',
      'name': 'Twitter',
      'logo': 'https://twitter.com/favicon.ico',
      'rate_ms': 60 * 1000
    };
  }

  formatTweet(tweet) {
    return {
      id: tweet.id_str,
      text: tweet.text,
      created_at: moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toISOString(),
      link: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
      extra: {
        userName: tweet.user.name
      }
    };
  }

  getData(page) {
    const params = {
      count: 200
    };

    if (page) {
      params['max_id'] = page;
    }

    return new Promise((resolve, reject) => {
      var client = new TwitterClient(this.config);
      client.get('favorites/list', params, (error, tweets, response) => {
        if(error) {
          return reject(error);
        }
        if (!tweets instanceof Array) {
          tweets = [];
        }

        tweets = tweets.map((tweet) => this.formatTweet(tweet));
        resolve({
          items: tweets,
          nextPage: tweets.length > 1 ? tweets[tweets.length - 1].id : null
        });
      });
    });
  }
}

export default Twitter;

