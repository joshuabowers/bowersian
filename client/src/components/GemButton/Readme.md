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
<GemButton toggled from="edit" to="save" />
<GemButton from="edit" to="save" />
```

`from` would, therefore, take the place of `icon` in this use case.

A toggleable GemButton has a `toggled` prop: setting this to `false` results in the `from` icon being rendered; setting this to `true` results in the `to` icon being rendered. A toggled button is visually identical, except for a color variation.

```jsx
const handleClick = () => {
  setState((prevState, props) => ({ isToggled: !prevState.isToggled }));
};
initialState = { isToggled: false };
<GemButton
  from="edit"
  to="save"
  toggled={state.isToggled}
  onClick={handleClick}
/>;
```
