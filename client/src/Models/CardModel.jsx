export default class CardModel {
  constructor(front, back, index) {
    this.front = front;
    this.back = back;
    this.index = index;
    this.bin = 0;
    this.correct = 0;
    this.incorrect = 0;
  }
}