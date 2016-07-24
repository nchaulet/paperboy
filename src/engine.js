const Promise = require('bluebird');

class Engine {
  constructor(dataStore) {
    this.providers = [];

    this.dataStore = dataStore;
  }

  addProvider(provider) {
    this.providers.push(provider);
  }

  run() {
    return Promise.resolve(this.providers)
      .map(provider => {
        return this.fetchPage(provider, null);
      });
  }

  fetchPage(provider, page) {
    const providerSlug = provider.getInfo().slug;

    return provider.getData(page)
      .then(res => {
        const items = res.items;

        return Promise.resolve(items)
          .map(data => {
            return this.dataStore.getItem(data.id, providerSlug)
              .then(item => {
                if (item) return;

                return this.dataStore.createItem(data.id, providerSlug, data);
              });
          })
          .return({
            nextPage: res.nextPage
          });
      });
  }

  fetchAll() {
    return Promise.resolve(this.providers)
      .map(provider => {
        const rate_ms = provider.getInfo().rate_ms;

        const fetchAll = (provider, page) => {
          return this.fetchPage(provider, page)
            .then(res => {
              if (res.nextPage) {
                return Promise.delay(rate_ms)
                  .then(() => fetchAll(provider, res.nextPage));
              }
            });
        }

        return fetchAll(provider, null);
      });
  }

}

export default Engine;
