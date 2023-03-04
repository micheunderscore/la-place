import { store } from "@/redux/counter/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from ".";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/learn/i)).toBeInTheDocument();
});
