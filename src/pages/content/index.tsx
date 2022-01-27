import { v4 } from "uuid";
import { TextLeaf } from "../../components/Editor/TextLeaf";
import { Element } from "../../components/Editor/Element";
import { DEFAULT_STATE } from "../../components/Editor/utils";

const Content = ({ value }) => {
  const renderChildren = (child) => {
    const childId = v4();

    if (!!child.type) return renderElement(child);

    return (
      <TextLeaf
        key={childId}
        leaf={child}
        attributes={{
          "data-slate-leaf": true,
        }}
      >
        {child.text}
      </TextLeaf>
    );
  };

  const renderElement = ({ type, children }) => (
    <Element element={{ type }} attributes={{}} key={v4()}>
      {children.map(renderChildren)}
    </Element>
  );

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        style={{ maxWidth: 680, padding: "1rem 0 2rem 0", margin: "0 64px" }}
      >
        {value.map(renderElement)}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      value: JSON.parse(DEFAULT_STATE),
    },
  };
}

export default Content;
