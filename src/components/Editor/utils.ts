import {
  Descendant,
  Editor,
  Text,
  Element as SlateElement,
  Transforms,
  Range,
} from "slate";
import isUrl from "is-url";
import { ImageElement, LinkElement } from "./custom-types";

export const HOTKEYS: Record<string, string> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const isMarkActive = (editor: Editor, mark: any): boolean => {
  const marks: Omit<Text, "text"> | null = Editor.marks(editor);

  return !!marks?.[mark];
};

export const isBlockActive = (editor: Editor, type: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
    })
  );

  return !!match;
};

export const toggleBlock = (editor: Editor, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: Editor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return true; // [TODO]
};

export const insertImage = (
  editor: Editor,
  url: string | ArrayBuffer | null
) => {
  const text = { text: "" };
  const image: ImageElement = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isBlockActive(editor, "link")) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const KEYBOARD_SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

export const DEFAULT_STATE =
  '[{"type":"heading-one","children":[{"marks":[],"text":"Measuring Web Performance at Airbnb"}]},{"type":"paragraph","children":[{"text":"Learn what web performance metrics Airbnb tracks, how we measure them, and how we consider tradeoffs between them in practice.j"}]},{"type":"paragraph","children":[{"text":"Josh Nelson","underline":true}]},{"type":"paragraph","children":[{"marks":[],"text":"How long did it "},{"type":"link","url":"https://www.instagram.com/","children":[{"marks":[],"text":"take"}]},{"marks":[],"text":" for this web page to load? It’s a common question industrywide, but is it the right one? Recently, there has been a shift from using single seconds-based metrics"},{"marks":[],"text":" ","italic":true},{"marks":[],"text":"like “page load”, to metrics that paint a more holistic picture of performance, representing the experience from a website user’s perspective. At "},{"marks":[],"text":"Airbnb","bold":true},{"marks":[],"text":", "},{"type":"link","url":"https://www.instagram.com/","children":[{"marks":[],"text":"measuring"}]},{"marks":[],"text":" the web performance that our guests and hosts actually experience is critical. Previously, we described how Airbnb created a Page Performance Score to combine multiple metrics from real users into a single score. In this blog post, we describe the metrics that we consider important on our website and how they relate to industry standards. We also discuss some case studies that moved these metrics, and how they impacted the experience of website visitors."}]},{"type":"heading-one","children":[{"text":"Web Performance Metrics","bold":true}]},{"type":"paragraph","children":[{"text":"There are five key performance metrics that we measure on our website. We chose these metrics because they represent performance as our users experience it, and because their definitions are simple, interpretable, and performant to compute.\\n\\nWe record these metrics both for direct requests to the site, as well as for client side transition requests between pages (Airbnb uses a single page app architecture). We will give an overview of these metrics, how we instrument them, and their relative weightings in our overall Page Performance Score."}]},{"type":"heading-two","children":[{"text":"Time To First Contentful Paint"}]},{"type":"paragraph","children":[{"text":"Time To First Contentful Paint ("},{"text":"TTFCP","underline":true},{"text":") measures the time between the start of navigation and the time at which "},{"text":"anything appears on the screen","bold":true},{"text":". This could be text, a loading spinner, or any visual confirmation to the user that the website has received their request. We use the paint timing API for direct requests. For client routed transitions, we have written our own instrumentation that is triggered when a page transition begins:"}]},{"type":"paragraph","children":[{"text":"It’s important to note this metric equires manual instrumentation by our product engineers — every page must include a “FMP-target”, or we’ll never record the first meaningful paint milestone. To ensure that each page instruments TTFMP correctly, we report on how often this element is found on a given page. If it is found less than 80% of the time due either to lack of instrumentation or to conditional rendering of the FMP target, we trigger alerts to warn that the metric is not valid for that page. This requires developers to keep the TTFMP instrumentation up to date through page e-designs, refactors, and A/B tests."}]},{"type":"block-quote","children":[{"text":"We have seen through experimentation that these metrics correlate with positive user experience changes. Web PPS gives us a single score we can use for goal setting and regression detection, while also capturing many different aspects of usr experience: paint timings, interactivity and layout stability. We hope that Web PPS can be used as a reference for implementing similar systems outside of Airbnb."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]}]';
