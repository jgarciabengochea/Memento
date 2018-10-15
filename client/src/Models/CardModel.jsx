export default class CardModel {
  constructor(front, back) {
    this.front = front;
    this.back = back;
    this.bin = 0;
    this.correct = 0;
    this.incorrect = 0;
  }
}