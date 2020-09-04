import React from "react";
import { render, act, fireEvent, screen, getByText, findByTestId } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import CheckoutForm from "./CheckoutForm";
import App from "../App"

// Write up the two tests here and make sure they are testing what the title shows

const breakthetest= () => {
  throw new Error()
};

test("renders App without crashing", () => {
  render(<App />);
  // breakthetest()
});

test("form header renders", () => {
  const { getByRole, getByText } = render(<CheckoutForm />);
  // expect(screen.getByRole('h2')).toHaveTextContent('Checkout Form')
  getByText("Checkout Form")
});

test("form shows success message on submit with form details", async () => {
  const { getByLabelText, getByTestId, findByText } = render(<CheckoutForm />);
  const User = {
    firstName: "Josuah",
    lastName: "Mateo"
  };

  const firstName = getByLabelText("First Name:");
  userEvent.type(firstName, User.firstName);
  expect(firstName.value).toBe(User.firstName)

  const lastName = getByLabelText("Last Name:");
  userEvent.type(lastName, User.lastName);
  expect(lastName.value).toBe(User.lastName)

  //I don't know a better way of doing this, but I know there should be one. Code Review please
  //specifically:
    //how can I grab the button without putting a testid on it
    //is there a better way to submit
    //
  const submitOnForm = getByTestId("checkoutBtn")
  act(() => {fireEvent.click(submitOnForm)});
  //this mysterioiusly can't see the text that it's showing in the error dom, why???
  // const successMessage = await findByText("You have ordered some plants!")
  // expect(successMessage).toHaveTextContent(User.firstName)
  // expect(findByText("You have ordered some plants!")).toHaveTextContent(User.firstName)
  const successMessage = await getByTestId("successMessage")
  expect(successMessage).toHaveTextContent(User.firstName)
  expect(successMessage).toHaveTextContent(User.lastName)
  //meaningful breaking of code. everywhere else I was able to just delete a letter of a string, here I needed a different string.
  // expect(successMessage).toHaveTextContent("josephine damonte")

});
