Renders a navigation list for traversing back to top. Has an implicit link to top. Children provide the breadcrumb elements, which are then styled by the component. Should be able to work with both `a` and `Link`.

```jsx
import { BrowserRouter, Link } from 'react-router-dom';

<BrowserRouter>
  <Breadcrumb>
    <Link to="/articles/2019">2019</Link>
    <Link to="/articles/2019/07">July</Link>
    <Link to="/articles/2019/07/about-breadcrumbs">About Breadcrumbs</Link>
  </Breadcrumb>
</BrowserRouter>;
```
