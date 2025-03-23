# App Performance Analysis

## Overview

Performance analysis of the application based on profiling data. The key metrics include commit duration, render duration, user interactions, and a ranked list of component render times.

---

## **Performance Metrics Before Optimization**

### **1. Commit Duration**

The commit duration, which represents the time taken for React to render committed updates, varies across different commits:

- **Fastest Commit:** 18.1ms
- **Slowest Commit:** 115.7ms
- **Average Commit Duration:** ~33.5ms

### **2. Render Duration**

Individual component render times show a wide range:

- **Longest Component Render:** 18.1ms (Root)
- **TableView Component:** 115.7ms (highest single render)
- **Most Components Rendered Under:** 1ms each

### **3. User Interactions**

- **Main updates triggered by:** `TableView`
- **Priority Level:** Normal & Immediate

### **4. Flame Graph**

_Example:_  
![Flame Graph Placeholder](./docs/images/chart-before-optimization.png)

### **5. Top Time-Consuming Components**

- **TableView:** Consistently takes the longest to render, often above 10ms
- **MainPage:** Second most time-consuming component
- **Controls:** Shows significant render times in some commits

### **6. Ranked Component Performance**

| Component                | Render Duration (ms) |
| ------------------------ | -------------------- |
| `createRoot()`           | 18.1                 |
| `TableView`              | 115.7                |
| `Various Sub-components` | < 1ms                |

## **Recommendations Before Optimization**

- Optimize `TableView` as it significantly impacts render performance.
- Investigate `createRoot()` initialization time for potential improvements.
- Consider using `React.memo` or `useCallback` to optimize component re-renders.

---

## **Performance Metrics After Optimization**

### **1. Commit Duration**

- **Fastest Commit:** 0.8ms
- **Slowest Commit:** 49.2ms
- **Average Commit Duration:** ~17.5ms

### **2. Render Duration**

- **Longest Component Render:** 57.1ms (Batch 2)
- **`createRoot()` Render Duration:** 17.6ms
- **Most components render in:** <1ms

### **3. User Interactions**

- **Main updates triggered by:** `TableView`
- **Priority Level:** Normal and Immediate

### **4. Observations**

- **TableView remains a significant performance factor**, but its render time has improved.
- **`createRoot()` initialization time is slightly lower** than previous data.
- **Commits now frequently have Immediate priority**, indicating more user interactions.
- **Overall, commit durations have improved significantly** compared to previous data.
- **Render times for most components remain very low**, typically under 1ms.
- **The application shows multiple batches of renders and commits**, suggesting efficient update grouping.

### **5. Flame Graph**

_Example:_  
![Flame Graph Placeholder](./docs/images/chart-after-optimization.png)

### **6. Ranked Component Performance**

| Component                | Render Duration (ms) |
| ------------------------ | -------------------- |
| `createRoot()`           | 17.6ms               |
| `TableView`              | 57.1ms               |
| `Various Sub-components` | < 1ms                |

---

## **Comparison of Both Profiling Sessions**

### **1. Commit Duration**

| Metric                      | Before Optimization | After Optimization | Change                  |
| --------------------------- | ------------------- | ------------------ | ----------------------- |
| **Fastest Commit**          | 18.1ms              | 0.8ms              | Significant improvement |
| **Slowest Commit**          | 115.7ms             | 49.2ms             | Improved                |
| **Average Commit Duration** | ~33.5ms             | ~17.5ms            | Improved                |

## Commit durations have improved significantly after optimization, reducing the fastest commit from 18.1ms to 0.8ms and the slowest from 115.7ms to 49.2ms.

### **2. Render Duration**

| Component                  | Before Optimization | After Optimization | Change                  |
| -------------------------- | ------------------- | ------------------ | ----------------------- |
| **Root (`createRoot()`)**  | 18.1ms              | 17.6ms             | Slight Improvement      |
| **TableView**              | 115.7ms             | 57.1ms             | Significant improvement |
| **Various Sub-components** | < 1ms               | < 1ms              | No significant change   |

`TableView` render time has improved but should still be monitored.  
`createRoot()` has seen slight improvements in render duration.  
Further optimizations to `TableView` may yield even better results.

---

### **3. User Interactions**

| Metric                        | Before Optimization | After Optimization | Change    |
| ----------------------------- | ------------------- | ------------------ | --------- |
| **Main Updates Triggered By** | `TableView`         | `TableView`        | No Change |
| **Priority Level**            | Normal & Immediate  | Normal & Immediate | No Change |

User interactions remain the same, meaning optimization efforts did not affect how updates are triggered.  
Consider analyzing event listeners or batching state updates to further optimize interactivity.

---

### **4. Top Time-Consuming Components**

| Component     | Before Optimization | After Optimization | Change                  |
| ------------- | ------------------- | ------------------ | ----------------------- |
| **TableView** | 115.7ms             | 57.1ms             | Significant Improvement |
| **MainPage**  | High                | High               | No Change               |
| **Controls**  | Variable impact     | Consistently low   | Improved                |

TableView performance improved significantly but remains a key target for monitoring.  
No regressions in `MainPage`, but continued monitoring is advised.

---

## **Conclusions & Next Steps**

- Optimizations have successfully reduced commit durations and render times.
- `TableView` performance has improved but should still be monitored for further optimizations.
- Investigate `MainPage` and `Controls` components for potential performance bottlenecks.
- Analyze user interaction flows to check if updates can be batched or reduced further.
- Continue profiling after new updates to ensure sustained performance improvements.
