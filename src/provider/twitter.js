var TwitterClient = require('twitter');


class Twitter {
    constructor(config) {
        this.config = config;
    }

    getData() {
        return new Promise((resolve, reject) => {
            var client = new TwitterClient(this.config);

            client.get('favorites/list', (error, tweets, response) => {
                if(error) reject(error);
                tweets = tweets.map((tweet) => {
                    return {
                        id: tweet.id,
                        text: tweet.text,
                        userName: tweet.user.name
                    };
                });

                resolve(tweets);
            });
        });
    }
}

export default Twitter;

