import { base } from "../common/base.js";

export class TopicsSection extends base {
  _topicsList = [];
  constructor(id) {
    super(id);
  }

  set setTopicsList(data) {
    this._topicsList = data;
  }

  _renderTopicsItem(name) {
    return `

    
    <li class="topics-item">${name}</li>
    
        `;
  }

  _renderTopicsItemsList(list) {
    return list
      .map((name) => {
        return this._renderTopicsItem(name);
      })
      .join("");
  }

  render() {
    let content = this._renderTopicsItemsList(this._topicsList);
    this.setHtmlContent(content);
  }
}
