
class Engine {
  constructor(dataStore) {
    this.providers = [];

    this.dataStore = dataStore;
  }

  addProvider(provider) {
    this.providers.push(provider);
  }

  run() {
    this.providers.forEach((provider) => {
      var providerSlug = provider.getInfo().slug;
      provider.getData().then((datas) => {
        datas.forEach((data) => {
          this.dataStore.getItem(data.id, providerSlug).then((item) => {
            if (!item) {
              this.dataStore.createItem(data.id, providerSlug, data);
            }
          });
        });
      });
    });
  }

}

export default Engine;
