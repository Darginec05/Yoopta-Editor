import { FC } from "react";
import { RenderElementProps } from "slate-react";
import s from "./Element.module.scss";

const Element: FC<RenderElementProps | any> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote className={s.blockquote} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return (
        <h1 className={s["heading-one"]} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 className={s["heading-two"]} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li className={s.listItem} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return (
        <p className={s.paragraph} {...attributes}>
          {children}
        </p>
      );
  }
};

export { Element };
