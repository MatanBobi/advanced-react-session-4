import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Pokemons", () => {
  it("Should render 10 Pokemons as in the mock response", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getAllByRole("checkbox")).toHaveLength(10);
  });

  it("Should mark a Pokemon as caught", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    await user.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByRole("complementary")).toHaveTextContent(
      /uncaught pokemons: 9/i
    );
  });

  it("Should open Pokemon modal when clicking on info", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    await user.click(screen.getAllByAltText("info")[0]);
    expect(await screen.findByAltText("bulbasaur")).toBeInTheDocument();
  });
});
