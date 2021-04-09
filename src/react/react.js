import { TEXT_ELEMENT } from "./CONST";

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// children数组除了 dom 元素之外，还可以包含一些基本类型的值，
// 比如字符串或者数字。我们用一个特殊的类型 TEXT_ELEMENT 来把这些不是对象子节点给包装成对象类型。
function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const React = { createElement };
export default React;
