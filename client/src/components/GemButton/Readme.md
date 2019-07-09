Displays a styled button component for allowing users to interact with the system. Supports `:hover`, `:active`, and an optional toggle state. Uses Material Icons for icon displays.

```jsx
<GemButton icon="settings" title="Settings" />
```

It a GemButton doesn't specify a title, it takes it from the icon prop:

```jsx
<GemButton icon="settings" />
```

If a GemButton is toggleable, it should specify `from` and `to` states:

```jsx
<GemButton toggle from="settings" to="save" />
```

`from` would, therefore, take the place of `icon` in this use case.
