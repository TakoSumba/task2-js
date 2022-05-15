export class base {
  id = "";

  constructor(id) {
    this.id = id;
  }

  setHtmlContent(content) {
    this.id.innerHTML = content;
  }
}
