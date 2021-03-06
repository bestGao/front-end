
import Text from "./components/Text";

import Wrapper from "./components/Wrapper";

export function create(Class, attributes, ...children){
    let object;

    if (typeof Class == 'string') 
        object = new Wrapper(Class);
    else
        object = new Class();
    //遍历普通对象，
    for(let name in attributes) {
        //处理事件
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        }
        object.setAttribute(name, attributes[name]);
    }
    for(let child of children)//遍历孩子，集合，数组
        if(child instanceof Array) {
            for (let c of child) {
                if (typeof c === 'string') {
                    object.appendChild(new Text(c));
                } else {
                    object.appendChild(c);
                }
            }
        }
        else if (typeof child === 'object') {
            object.appendChild(child);
        }else {
            object.appendChild(new Text(child.toString()));
        }
    return object; 
}