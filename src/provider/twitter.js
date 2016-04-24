var TwitterClient = require('twitter');

class Twitter {
    constructor(config) {
        this.config = config;
    }

    getInfo() {
        return {
            'slug': 'twitter',
            'name': 'Twitter',
            'logo': 'https://twitter.com/favicon.ico'
        };
    }

    getData() {
        return new Promise((resolve, reject) => {
            var client = new TwitterClient(this.config);
            client.get('favorites/list', (error, tweets, response) => {
                if(error) {
                    return reject(error);
                }

                if (!tweets instanceof Array) {
                    tweets = [];
                }

                tweets = tweets.map((tweet) => {
                    return {
                        id: tweet.id_str,
                        text: tweet.text,
                        link: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
                        extra: {
                            userName: tweet.user.name
                        }
                    };
                });

                resolve(tweets);
            });
        });
    }
}

export default Twitter;

