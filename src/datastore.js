import BPromise from "bluebird";

function filterQuery(qb, filters) {
  if (filters.provider) {
    return qb.where('provider', filters.provider);
  }

  return qb;
}

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
      created_at: data.created_at,
      data: JSON.stringify(data),
      sent: false
    }).then((id) => {
    }, (error) => {
    });
  }

  getNotSentItems() {
    return this.knex.select('*')
      .from('saved_item')
      .where('sent', '!=', '1')
      .then((items) => {
        items.forEach((item) => {
          item.data = JSON.parse(item.data);
        });

        return items;
      });
  }

  clearItems() {
    return this.knex('saved_item').del();
  }

  getItems(page = 1, nbByPage = 10, filters = {}) {
    const select_qb = filterQuery(
        this.knex.select('*').from('saved_item'),
        filters
      )
      .limit(nbByPage)
      .offset((page - 1) * nbByPage)
      .orderBy('created_at', 'DESC')
      .then((items) => {
        items.forEach((item) => {
          item.data = JSON.parse(item.data);
        });

        return items;
      });

    const count_qb = filterQuery(
      this.knex.count('id as count').from('saved_item'),
      filters
    ).then(function(results) {
      return results[0].count;
    });

    return BPromise.join(select_qb, count_qb, (items, count) => {
      return {
        items,
        total: count
      };
    });
  }
}

export default DataStore;
