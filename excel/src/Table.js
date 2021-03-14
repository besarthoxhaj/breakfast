'use strict';


/**
 *
 *
 *
 */
export default class Table {

  constructor(domElm, rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.ctx = domElm.getContext('2d');
  }

  renderGrid() {

    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = 'rgb(200, 200, 200)';

    var width = this.rowCount * CELL_WIDTH;
    var height = this.colCount * CELL_HEIGHT;
  }
}
