import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Register from "../Register/Register";

test("registers a user with valid data", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => ({ success: true }),
  });

  render(<Register />);

  fireEvent.change(screen.getByLabelText("Մուտքանուն"), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByLabelText("Էլեկտրոնային հասցե"), {
    target: { value: "test@polytechnic.am" },
  });
  fireEvent.change(screen.getByLabelText("Գաղտնաբառ"), {
    target: { value: "password@123" },
  });
  fireEvent.change(screen.getByLabelText("Գաղտնաբառի կրկնություն"), {
    target: { value: "password@123" },
  });
  fireEvent.click(screen.getByText("Գրանցվել"));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  expect(global.fetch).toHaveBeenCalledWith("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "test",
      email: "test@example.com",
      password: "password@123",
    }),
  });

  expect(screen.getByText("Մուտք")).toBeInTheDocument();
});
