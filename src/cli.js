import container from 'src/services';
import {argv} from 'yargs';

function clearItems() {
  container.dataStore.clearItems()
    .then(() => console.log('Done'));
}

function fetchAllItems() {
  container.engine.fetchAll()
    .then(() => console.log('DONE'));
}

switch(argv["_"][0]) {
  case "items:delete-all": clearItems();break;
  case "items:fetch-all": fetchAllItems();break;
}
