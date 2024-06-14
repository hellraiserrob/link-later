/**
 * Link later
 * a library to replace keywords with links
 */

import { Option, Config } from "./interfaces";


/**
 * constants
 */

const ignoredTags: string[] = ["HEAD", "SCRIPT", "STYLE", "A", "BUTTON", "INPUT", "H1", "H2", "H3", "H4", "H5"];

/**
 * variables
 */

let maxCounter: number = 0;

/**
 * if selector has been provided loop through them
 */
const selectorLoop = (els: NodeListOf<HTMLElement>, config): void => {
  els.forEach((el: HTMLElement) => {
    if (!parentCheck(el, config)) {
      loop(el, config);
    }
  });
};

/**
 * check the parents for tags meaning we should ignore
*/
const parentCheck = (el: HTMLElement, config: Config): boolean => {
  const ignored = config.ignore ? config.ignore : ignoredTags;

  while (el.parentNode) {
    el = el.parentNode as HTMLElement;
    if (ignored.includes(el.tagName)) {
      return true;
    }
  }

  return false;
}

/**
 * recursive loop
 */
const loop = (parent: HTMLElement, config: any) => {
  const ignored = config.ignore ? config.ignore : ignoredTags;

  if (parent.childNodes) {
    const children = [...parent.childNodes as NodeListOf<HTMLElement>];

    children.forEach((el) => {
      // check if we've reached a provided maximum
      if (config.max && maxCounter > config.max) {
        return;
      }

      // check for links and skip over
      if (ignored.includes(el.tagName)) {
        return;
      }

      if (el.childNodes.length) {
        loop(el, config);
      } else {
        replace(el, config);
      }
    });
  }
};

/**
 * replace the contents of the node
 */
const replace = (el: HTMLElement, { keywords, classes, href, target, max, debug }) => {
  const wordsArray = keywords.split(",");
  const re = new RegExp("\\b(" + wordsArray.join("|") + ")(?!-)\\b", "gi");

  // text node
  if (el.nodeType === 3) {
    const str = el.nodeValue as string;
    let match;
    let position: number = 0;
    const splitElements: (HTMLElement | Text)[] = [];

    // loop through the regex matches
    while ((match = re.exec(str)) !== null) {
      // check if we've reached a provided maximum
      if (max && maxCounter >= max) {
        continue;
      }

      // the textNode before any match
      const textNode: Text = document.createTextNode(str.slice(position, match.index));

      // the new link
      const a: HTMLElement = createLink(match[0], href, target, classes, debug);

      splitElements.push(textNode);
      splitElements.push(a);

      position = re.lastIndex;
      maxCounter += 1;
    }

    // the final textNode to be added
    if (position > 0) {
      splitElements.push(document.createTextNode(str.slice(position)));
      el.replaceWith(...splitElements);
    }
  }
};

/**
 * creating a html link element
 */
const createLink = (text: string, href: string, target: string, classes: string, debug: boolean): HTMLAnchorElement => {
  const a: HTMLAnchorElement = document.createElement("a");
  a.innerText = text;
  a.href = href;

  if (target) {
    a.target = target;
  }

  if (classes) {
    a.classList.add(classes);
  }

  if (debug) {
    a.setAttribute("style", "background: yellow");
  }

  return a;
};

/**
 * main sniping loop
 */
const start = (data: Option[]): void => {
  data.forEach((section: Option) => {
    const path = window.location.pathname;

    // check to see if the scope is within the current path
    if ((path.endsWith(section.scope) || path.startsWith(section.scope + "/"))) {
      const docEl: HTMLElement = document.body;

      section.configs.forEach((config: Config) => {
        // if a selector has been provided
        if (config.selector) {
          const els: NodeListOf<HTMLElement> = document.querySelectorAll(`${config.selector || docEl}`);
          selectorLoop(els, config);
        }
        // fallback to the entire document element, best avoided
        else {
          loop(docEl, config);
        }
      });

      maxCounter = 0;
    }
  });
};

export default start;
