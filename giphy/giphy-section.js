import { base } from "../common/base.js";

export class GiphySection extends base {
  _GiphyList = [];
  constructor(id) {
    super(id);
  }

  set setGiphyList(data) {
    this._GiphyList = data;
  }

  _renderGiphyItem(obj) {
    return `
    
    <div class="giphy-item">
   <img src="${obj.images.fixed_height.url}">
   <span class="rating">Rating:${obj.rating}</span>
  </div>
        `;
  }
  debugger;
  _renderGiphyItemsList(list) {
    return list
      .map((obj) => {
        return this._renderGiphyItem(obj);
      })
      .join("");
  }

  render() {
    let content = this._renderGiphyItemsList(this._GiphyList);
    this.setHtmlContent(content);
  }
}
