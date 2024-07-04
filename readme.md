[![link later banner](./.github/assets/banner.svg)](https://hellraiserrob.github.io/link-later)

# Link Later

This is a small library to find and replace keywords in your html with linked keywords, it could also be easily adapted for different purposes, such as highlighting specific keywords.

Use cases might internal linking for SEO purposes, or affiliate linking.

[Demo](https://hellraiserrob.github.io/link-later/)


## What it does

In a nutshell it does this

![What it does](/public/what.jpg)


## Options

|             | Description | Type    | 
| ----------- | ----------- | ------- | 
| scope       | The path to scope keyword replacement.  For example if you only want to replace keywords under your products section the scope might be "/products"  | string |
| config | See Config | Config[] |


## Config
|             | Description | Type    | 
| ----------- | ----------- | ------- | 
| keywords    | Comma separated list of keywords  | string |
| href | The href to link to |  string |
| target? | An optional value for the target attribute | string |
| classes? | Optional classes to be added to the link | string |
| debug? | Optionally add a yellow background to the created links | boolean |
| ignore? | Optionally provide an array of html tags to ignore* if the text resides within them | string[] |

* the default list of ignored tags is:
["HEAD", "SCRIPT", "STYLE", "A", "BUTTON", "INPUT", "H1", "H2", "H3", "H4", "H5"]


## How to use

```javascript
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
      debug: true
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
}];

start(options);
```