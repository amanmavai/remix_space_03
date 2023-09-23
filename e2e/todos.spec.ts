import {test, expect} from "@playwright/test";

const TODO_ITEMS = ["buy some cheese", "feed the cat", "book a doctors appointment"];

test.describe("Todo App", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3000/todos");
  });

  test("loads todos", async ({page}) => {
    // Expects page to have a heading.
    await expect(page.getByRole("heading", {name: "Todos List"})).toBeVisible();
  });

  test("adds todos", async ({page}) => {
    const todoItemTextBox = page.getByRole("textbox", {name: "todo-text"});

    await todoItemTextBox.click();
    await todoItemTextBox.fill(TODO_ITEMS[0]);
    await page.getByRole("button", {name: /Add/i}).click();

    await todoItemTextBox.fill(TODO_ITEMS[2]);
    await todoItemTextBox.click();
    await page.getByRole("button", {name: /Add/i}).click();

    const todoItem = page.getByTestId("todo-item");
    await expect(todoItem).toHaveCount(2);
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("toggles a todo", async ({page}) => {
    const todoItemTextBox = page.getByRole("textbox", {name: "todo-text"});

    await todoItemTextBox.click();
    await todoItemTextBox.fill(TODO_ITEMS[1]);
    await page.getByRole("button", {name: /Add/i}).click();

    const item = page.getByTestId("todo-item");
    await item.click();
    await expect(item).toHaveClass("cursor-pointer line-through");

    await item.click();
    await expect(item).not.toHaveClass("cursor-pointer line-through");
  });

  test("deletes a todo", async ({page}) => {
    await page.getByRole("button", {name: /Delete Todo/i}).click();
    const todoList = await page.$$(".todo");
    expect(todoList.length).toBe(0);
  });
});
