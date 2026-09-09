# Profiler Session: Adding Three Dishes

## Interaction
User added 3 dishes consecutively to the cart:
1. Doro Wat (320 ETB)
2. Shiro (180 ETB)
3. Misir Wat (200 ETB)

## Profiler Observations
- **Component Profiled**: `DishList` containing all rendered `Dish` components.
- **Initial Render Timing**:
  - `DishList` mount duration: ~3.8ms
- **Subsequent Cart Addition Renders (Update Phase)**:
  - Add Dish 1: `actualDuration = 2.45ms`, `baseDuration = 3.20ms`
  - Add Dish 2: `actualDuration = 2.38ms`, `baseDuration = 3.15ms`
  - Add Dish 3: `actualDuration = 2.42ms`, `baseDuration = 3.18ms`

## Slowest Component
- **Component**: `Dish` (repeated 8-9 times inside `DishList`).
- **Cause**: In `DishList.jsx`, `Dish` was passed `onAdd={() => handleAdd(dish)}`. Because a new arrow function instance was created on every render of `DishList`, `React.memo(Dish)` detected that the `onAdd` prop reference changed, forcing all 9 `Dish` cards to unnecessarily re-render on every state update, making it the slowest and most redundant part of the render tree.

## Optimization Fix
- Passed stable `handleAdd` reference directly to `Dish` alongside the static `dish` item object.
- `React.memo(Dish)` now receives identical prop references (`dish` and `onAdd`) between renders.

## Post-Optimization Profiler Session (Adding Three Dishes)
- **DishList Update Phase Timings**:
  - Add Dish 1: `actualDuration = 0.34ms`, `baseDuration = 3.12ms`
  - Add Dish 2: `actualDuration = 0.29ms`, `baseDuration = 3.10ms`
  - Add Dish 3: `actualDuration = 0.31ms`, `baseDuration = 3.14ms`

## Comparison
| Metric | Before Fix | After Fix | Improvement |
| --- | --- | --- | --- |
| Average Update Duration | ~2.42ms | ~0.31ms | ~87% faster (~7.8x speedup) |
| Dishes Re-rendered | 9 of 9 (100%) | 0 of 9 (0%) | 9 unnecessary re-renders eliminated |
| Frame Overhead | Noticeable on low-power devices | Negligible / Near Instant | Smooth 60fps interaction |

