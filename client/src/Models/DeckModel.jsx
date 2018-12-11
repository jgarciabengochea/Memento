import moment from 'moment';

export default class DeckModel {
  constructor(name, description) {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.description = description;
    this.cards = [];
    this.dateCreated = moment().format('MMMM Do YYYY');
  }
}