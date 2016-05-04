class DataStore {
  constructor(knex) {
    this.knex = knex;
  }

  getItem(id, provider) {
    return this.knex.select('*').from('saved_item').where({
      external_id: id.toString(),
      provider: provider
    }).then((items) => {
      if (items.length > 0) {
          return items[0];
      }
      return null;
    })
  }

  sendMessages() {
    this.knex('saved_item').update({
      'sent': true
    }).then(() => {
    });
  }

  createItem(id, provider, data) {
    this.knex('saved_item').insert({
      external_id: id.toString(),
      provider: provider,
      data: JSON.stringify(data),
      sent: false
    }).then((id) => {
    }, (error) => {
    });
  }

  getNotSentItems() {
    return this.knex.select('*').from('saved_item').where('sent', '!=', '1').then((items) => {
      items.forEach((item) => {
        item.data = JSON.parse(item.data);
      });

      return items;
    });
  }

  countTotalItems() {
    return this.knex
      .count('id as count')
      .from('saved_item')
      .then(function(results) {
          return results[0].count;
      });
  }

  getItems(page = 1, nbByPage = 10, filters = {}) {
    let qb = this.knex
      .select('*')
      .from('saved_item');

    if (filters.provider) {
      qb = qb.where('provider', filters.provider);
    }

    return qb
      .limit(nbByPage)
      .offset((page - 1) * nbByPage)
      .orderBy('id', 'DESC')
      .then((items) => {
        items.forEach((item) => {
          item.data = JSON.parse(item.data);
        });

        return items;
      });
  }
}

export default DataStore;
