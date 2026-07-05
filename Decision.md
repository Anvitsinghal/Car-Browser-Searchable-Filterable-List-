# DECISIONS.md

## 1. How did your debounce work? What happens if the user keeps typing before the 300ms is up?

I implemented the debounce using `setTimeout` inside a `useEffect`. Every time the search text changes, a new 300ms timer starts. If the user types another character before the timer finishes, the cleanup function runs and cancels the previous timer using `clearTimeout`. This means filtering only happens after the user stops typing for 300ms. It avoids unnecessary filtering on every keystroke and makes the search feel smoother.

## 2. Where does your filter state live in the component tree, and why there and not somewhere else?

All filter states (search, transmission, type, availability, and sort) are stored in the `App` component because every filter affects the same list of cars. Keeping the state in one place makes it easier to combine all filters together, update the URL, and pass the filtered data to the UI. Since this is a small application, lifting the state further or using a global state library would add unnecessary complexity.

## 3. Walk through, step by step, what happens when the page loads with filters already present in the URL.

When the page loads, I read the query parameters using `useSearchParams`. These values are used to initialize the React state for search, type, transmission, availability, and sorting. After the component mounts, the `useEffect` runs, applies all filters to the local `cars.json` data, sorts the results if required, and updates the displayed list. Because the state is initialized from the URL, refreshing the page restores the same filtered view.

## 4. If you had one more day, what is the first thing you'd refactor, and why?

The first thing I would refactor is the URL synchronization logic. Right now, each input updates the URL separately, which results in repeated code. I would create a reusable helper function or move the URL update into a single `useEffect` that listens to all filter states. This would reduce duplication, improve readability, and make the code easier to maintain as more filters are added.