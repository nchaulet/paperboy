class DataStore {
    constructor(knex) {
        this.knex = knex;
    }

    init() {
        this.knex.schema.hasTable('saved_item').then((exists) => {
            if (exists) {
                return;
            }

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
        });
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
}

export default DataStore;
