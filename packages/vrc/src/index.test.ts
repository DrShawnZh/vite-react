import customtheme from "./css";

test("antd theme", () => {
  const theme = { "@primary-color": "#fff" };
  expect(customtheme(theme)).toEqual(expect.objectContaining(theme));
});
