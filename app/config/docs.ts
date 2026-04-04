export interface DocsNavItem {
  slug: string;
  label: string;
  icon?: string;
  children?: Array<DocsNavItem>;
}

export const docsConfig: Array<DocsNavItem> = [
  {
    slug: "testing",
    label: "Testing",
    children: [
      {
        slug: "expect",
        label: "Expect API",
        children: [
          {
            slug: "status",
            label: "Status Assertions",
          },
          {
            slug: "body",
            label: "Body Assertions",
          },
          {
            slug: "headers",
            label: "Headers Assertions",
          },
          {
            slug: "cookies",
            label: "Cookies Assertions",
          },
        ],
      },
      {
        slug: "classic",
        label: "Classic API",
        children: [
          {
            slug: "status",
            label: "Status",
          },
          {
            slug: "body",
            label: "Body",
          },
          {
            slug: "headers",
            label: "Headers",
          },
          {
            slug: "cookies",
            label: "Cookies",
          },
        ],
      },
      {
        slug: "group",
        label: "Group",
      },
      {
        slug: "print",
        label: "Print",
      },
      {
        slug: "code",
        label: "Code",
      },
      {
        slug: "response",
        label: "Response",
      },
      {
        slug: "summary",
        label: "Summary",
      },
      {
        slug: "examples",
        label: "Examples",
      },
    ],
  },
];

export function resolveDocsPath(pathSegments: Array<string>): string {
  return `/docs/${pathSegments.join("/")}`;
}
