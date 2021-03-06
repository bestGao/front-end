const PROPERTY_SYMBOL = Symbol("property"); //名字跟注释差不多，为了调试方便
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Shop {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);//避免找原型链上的同名方法
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this._child=[]
    this.created();
  }

  appendTo(element) {
    element.appendChild(this._root);
    this.mounted();
  }

  created() {
    this._root = document.createElement("div");
    this._root.classList.add('shop')
  }
  mounted() {
    //this._child.forEach(child=>child.mounted())
  }
  unmounted() {

  }
  update() {

  }
  render(value) {
    let header=document.createElement("div")
    header.style.display="flex"
    header.classList.add('shop')
    let avatar=document.createElement("div")
    avatar.style.backgroundImage=`url(${value.avatar})`
    avatar.classList.add('shop_avatar')
    let title=document.createElement("div")
    title.innerText=value.title
    title.classList.add('shop_title')
    let ad=document.createElement("div")
    let body=document.createElement("div")
    ad.classList.add('shop_ad')
    ad.innerText=value.ad
    
    header.appendChild(avatar)
    header.appendChild(title)
    body.appendChild(header)
    body.appendChild(ad)
    return body;
  }
  appendChild(child){
    let arr=[]
    if (!Array.isArray(child)) {
      this._child.push(child)
      arr.push(child)
    }
    arr.forEach(item => {
      item.appendTo(this._root)
    })
  }
  getAttribute(name) {
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value) {
    if(name == "data"){
      this._root.appendChild(this.render(value))
    }
    if (name == "className") {
      this._root.classList.add(value)
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set;
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this);
  }
}