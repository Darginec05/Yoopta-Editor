import { v4 } from "uuid";
import { TextLeaf } from "../../components/Editor/TextLeaf";
import { Element } from "../../components/Editor/Element";

const Content = ({ value }) => {
  const renderChildren = (child) => {
    const childId = v4();

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

  const renderElements = (elements: any[]) => {
    return elements.map((element) => {
      const id = v4();
      const { children } = element;

      return (
        <Element element={{ type: element.type }} attributes={{}} key={id}>
          {children.map(renderChildren)}
        </Element>
      );
    });
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        style={{ maxWidth: 680, padding: "1rem 0 2rem 0", margin: "0 64px" }}
      >
        {renderElements(value)}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      value: JSON.parse(
        '[{"type":"heading-one","children":[{"marks":[],"text":"Measuring Web Performance at Airbnb"}]},{"type":"paragraph","children":[{"text":"Learn what web performance metrics Airbnb tracks, how we measure them, and how we consider tradeoffs between them in practice."}]},{"type":"paragraph","children":[{"text":"Josh Nelson","underline":true}]},{"type":"paragraph","children":[{"marks":[],"text":"How long did it take for this web page to load? It’s a common question industrywide, but is it the right one? Recently, there has been a shift from using single seconds-based metrics like “page load”, to metrics that paint a more holistic picture of performance, representing the experience from a website user’s perspective. At Airbnb, measuring the web performance that our guests and hosts actually experience is critical. Previously, we described how Airbnb created a Page Performance Score to combine multiple metrics from real users into a single score. In this blog post, we describe the metrics that we consider important on our website and how they relate to industry standards. We also discuss some case studies that moved these metrics, and how they impacted the experience of website visitors."}]},{"type":"heading-one","children":[{"text":"Web Performance Metrics"}]},{"type":"paragraph","children":[{"text":"There are five key performance metrics that we measure on our website. We chose these metrics because they represent performance as our users experience it, and because their definitions are simple, interpretable, and performant to compute.\\n\\nWe record these metrics both for direct requests to the site, as well as for client side transition requests between pages (Airbnb uses a single page app architecture). We will give an overview of these metrics, how we instrument them, and their relative weightings in our overall Page Performance Score."}]},{"type":"heading-two","children":[{"text":"Time To First Contentful Paint"}]},{"type":"paragraph","children":[{"text":"Time To First Contentful Paint ("},{"text":"TTFCP","underline":true},{"text":") measures the time between the start of navigation and the time at which "},{"text":"anything appears on the screen","bold":true},{"text":". This could be text, a loading spinner, or any visual confirmation to the user that the website has received their request. We use the paint timing API for direct requests. For client routed transitions, we have written our own instrumentation that is triggered when a page transition begins:"}]},{"type":"paragraph","children":[{"text":"It’s important to note this metric requires manual instrumentation by our product engineers — every page must include a “FMP-target”, or we’ll never record the first meaningful paint milestone. To ensure that each page instruments TTFMP correctly, we report on how often this element is found on a given page. If it is found less than 80% of the time due either to lack of instrumentation or to conditional rendering of the FMP target, we trigger alerts to warn that the metric is not valid for that page. This requires developers to keep the TTFMP instrumentation up to date through page edesigns, refactors, and A/B tests."}]},{"type":"block-quote","children":[{"text":"We have seen through experimentation that these metrics correlate with positive user experience changes. Web PPS gives us a single score we can use for goal setting and regression detection, while also capturing many different aspects of usr experience: paint timings, interactivity and layout stability. We hope that Web PPS can be used as a reference for implementing similar systems outside of Airbnb."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]}]'
      ),
    },
  };
}

export default Content;
