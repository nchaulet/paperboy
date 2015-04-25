class DataStore {
    constructor(knex) {
        this.knex = knex;
    }

    init() {
        if (!this.knex.schema.hasTable('saved_item')) {
            this.knex.schema.createTable('saved_item', function (table) {
              table.increments();
              table.string('external_id');
              table.string('provider');
              table.integer('user_id');
              table.json('data')
              table.boolean('sent');
            }).then(function() {
                console.log('Database created');
            }, function() {
                console.log('Database creation error');
            });
        }
    }

    getItem(id, provider) {
        return this.knex.select('*').from('saved_item').where({
            external_id: id,
            provider: provider
        }).then((items) => {
            if (items.length > 0) {
                return items[0];
            }
            return null;
        })
    }

    createItem(id, provider, data) {
        this.knex('saved_item').insert({
            external_id: id.toString(),
            provider: provider,
            data: JSON.stringify(data)
        }).then((id) => {
        }, (error) => {
        });
    }

    getNotSentItems() {
        return this.knex.select('*').from('saved_item').where('sent', '!=', '1');
    }
}

export default DataStore;
