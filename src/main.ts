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
        selector: ".after",
        target: "_blank",
        classes: "test-class",
        debug: true,
        ignore: ["SPAN", "A"]
      },
    ],
  },
  {
    scope: "/",
    configs: [
      {
        keywords: "warehouse",
        href: "/my-warehousing-link",
        selector: ".after .rich-text",
        debug: true
      },
      {
        keywords: "Inland transportation",
        href: "/my-inland-services-link",
        selector: ".after .rich-text",
        debug: true
      },
    ],
  },
];

start(options);