# Radix Web Console — Components

Each subdirectory corresponds to a standalone component.

## The component directory

Each component directory contains the following files:

### `index.js`

The main file for the component; in many cases this is the only file necessary.
This is a JS module that exports as default the whole component:

```js
const MyComponent = … ;

export default MyComponent;
```

If the component is meant to be used with bindings (e.g. decorated with Redux's
`connect()`, react-rounter's `withRouter()`, etc.) then the default export
should contain these bindings, and a named export should expose the bare
component (used for testing). For instance:

```js
const MyComponent = … ;

export default connect(mapStateToProps)(MyComponent);
export MyComponent;
```
### `style.css`

This contains namespaced component styling. Every CSS rule in this file must be
prefixed with a unique classname (usually the same as the component). Code is
organised using [BEM](https://css-tricks.com/bem-101/). See also CSS guidelines
in [the main README file](../../README.md#CSS).

Example:

```css
.notification {
  …
}

.notification__actions {
  …
}

.notification--important {
  …
}
```

### `test.js`

Smoke tests for the component. These should not use any features of decorators
like Redux, etc. — instead always import the bare component from the `.js` file.
Tests should use [Enzyme](http://airbnb.io/enzyme/) for rendering the component.

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import { MyComponent } from '.';

it('renders without crashing', () => {
  shallow(<MyComponent />);
});
```

To decide on what to test on a component, take a look at this article:
[The Right Way to Test React Components](https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22).