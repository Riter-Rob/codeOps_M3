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
- **Cause**: In `DishList.jsx`, `Dish` is passed `onAdd={() => handleAdd(dish)}`. Because a new arrow function instance is created on every render of `DishList`, `React.memo(Dish)` detects that the `onAdd` prop reference changed, forcing all 9 `Dish` cards to unnecessarily re-render on every state update, making it the slowest and most redundant part of the render tree.
