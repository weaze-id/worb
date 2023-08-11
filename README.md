# worb - Simplified Form Validation for React

**worb** is a library that provides a reactive container for values that can be observed for changes. It allows you to create "Orb" instances that store values and emit change events whenever the value is updated.

## Installation

You can install the **worb** library using npm:

```sh
npm install worb --save
```

Or using yarn:

```sh
yarn add worb
```

## Usage

```jsx
import { createOrb, useCreateOrb, useOrb } from 'morb';

// Create an Orb instance
const myOrb = createOrb('initial value');

// Use the Orb in a React component
function MyComponent() {
  const [value, setValue] = useOrb(myOrb);

  // ...

  return (
    // JSX rendering using the value and setValue
  );
}

// ...

// Or using hook
function MyComponent() {
  const myOrb = useCreateOrb('initial value');
  const [value, setValue] = useOrb(myOrb);

  // ...

  return (
    // JSX rendering using the value and setValue
  );
}
```

## Contributing

Contributions to **worb** are welcome! To contribute, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
