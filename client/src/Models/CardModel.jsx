import moment from 'moment';

export default class CardModel {
  constructor(front, back, index, deckId) {
    this.deckId = deckId;
    this.id = '_' + Math.random().toString(36).substr(2, 9);
    this.front = front;
    this.back = back;
    this.index = index;
    this.bin = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.dateCreated = moment().format('MMMM Do YYYY');
  }
}