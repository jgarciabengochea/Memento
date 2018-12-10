import moment from 'moment';

export default class DeckModel {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.cards = [];
    this.dateCreated = moment().format('MMMM Do YYYY');
  }
}