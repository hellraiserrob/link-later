import start from "./link-later"
import Option from "./interfaces"

/**
 * config
 */

const options: Option[] = [
  {
    scope: "/",
    configs: [
      {
        keywords: "test,logistics solutions",
        href: "/my-logistical-solutions-link",
        target: "_blank",
        classes: "test-class",
        debug: true,
        ignore: ["SPAN"]
      },
    ],
  },
  {
    scope: "/",
    configs: [
      {
        keywords: "warehouse",
        href: "/my-warehousing-link",
        selector: ".rich-text",
        debug: true
      },
      {
        keywords: "Inland transportation",
        href: "/my-inland-services-link",
        selector: ".rich-text",
        debug: true
      },
    ],
  },
];

start(options);