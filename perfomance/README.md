# App Performance Analysis

## Overview
Performance analysis of the application based on profiling data. The key metrics include commit duration, render duration, user interactions, and a ranked list of component render times.

## Performance Metrics

### 1. Commit Duration
The commit duration, which represents the time taken for React to render committed updates, varies across different commits:
- **Fastest Commit:** 18.1ms
- **Slowest Commit:** 98.7ms
- **Average Commit Duration:** ~33.5ms

### 2. Render Duration
Individual component render times show a wide range:
- **Longest Component Render:** 18.1ms (Root)
- **TableView Component:** 98.7ms (highest single render)
- **Most Components Rendered Under:** 1ms each

### 3. User Interactions
- **Main updates triggered by:** `TableView`
- **Priority Level:** Normal & Immediate

### 4. Flame Graph
*Example:*
![Flame Graph Placeholder](./docs/images/chart-before-optimization.png)

### 5. Top Time-Consuming Components
- **TableView:** Consistently takes the longest to render, often above 10ms
- **MainPage:** Second most time-consuming component
- **Controls:** Shows significant render times in some commits

### 6. Ranked Component Performance
| Component | Render Duration (ms) |
|-----------|----------------------|
| `createRoot()` | 18.1 |
| `TableView` | 98.7 |
| `Various Sub-components` | < 1ms |

## Recommendations
- Optimize `TableView` as it significantly impacts render performance.
- Investigate `createRoot()` initialization time for potential improvements.
- Consider using `React.memo` or `useCallback` to optimize component re-renders.

## How to Reproduce
1. Open Chrome DevTools and navigate to the **Profiler** tab.
2. Record an interaction while using the app.
3. Analyze the **Flame Graph** and **Ranked Chart** to identify performance bottlenecks.
