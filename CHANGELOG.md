## v1.0.0 - Campaign Dashboard

- Added clean, grid-based layout with consistent 20px spacing and visual hierarchy
  - Sticky top bar, collapsible sidebar, and main content area
- Implemented campaign overview cards with progress indicators
- Built sortable and filterable campaigns table (by name, status, budget, spent, progress, start)
- Added activity log and notifications/alerts with dismiss behavior
- Ensured consistent button styles, font sizes, and hover states across the app
- Adopted Inter font and neutral dark palette with accent highlight
- Fixed layout/UI issues:
  - Removed overlapping by using CSS Grid/Flex and proper stacking contexts
  - Normalized paddings/margins/line-heights for consistent alignment
  - Sticky table headers for better readability
- Mobile responsiveness (<= 768px):
  - Collapsible sidebar with overlay; content stacks vertically
  - Cards switch to single column; sections adapt to one column
  - Controls wrap and inputs expand to full width

How to run:
- Open `index.html` in a browser.