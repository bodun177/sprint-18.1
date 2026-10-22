# Advanced Frontend with React.js 

## The tasks of the topic "custom hooks"

`EntitiesList` and `EntityDetails` display external data loaded by a method from props. The fetching logic is duplicated. Extract it into a custom hook and render the hook result in both components.

### Hook

Create `src/components/hooks/useLoading.js` with a named export:

```js
export function useLoading(fetchMethod, params) {}
```

- `fetchMethod` returns a promise with the data.
- `params` is optional. Forward it to `fetchMethod`. `EntitiesList` calls the hook with the method only . `EntityDetails` also passes `params`.
- Return `null` until the promise resolves.
- Return the resolved value itself, not a wrapper object.
- When `fetchMethod` or `params` changes, return `null` again and fetch once more.

Pass `fetchMethod` through as-is. The hook treats a new function as a new request, so creating one during render fetches without stopping.

```js
const entities = useLoading(fetchMethod);
const entity = useLoading(fetchMethod, params);
```

### Components

Remove the local loading state from `EntitiesList` and `EntityDetails`. Render the value returned by `useLoading`. Keep the current markup, including `Loading...` while the value is `null`.

### Tests

One-shot run:

```
npx react-scripts test --watchAll=false
```
