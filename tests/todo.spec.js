const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../pages/todo.page');

test.describe('TodoMVC demo app (POM)', () => {
  test('adds todos and verifies count', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTodos(['Learn Playwright', 'Write automated tests']);

    await todoPage.expectTodoTexts(['Learn Playwright', 'Write automated tests']);

    const count = await todoPage.getTodoCount();
    await expect(count).toBe(2);
  });

  test('completes and clears completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTodos(['Task 1', 'Task 2']);

    await todoPage.toggleTodoAt(0);
    await todoPage.clearCompleted();

    await todoPage.expectTodoTexts(['Task 2']);
    const count = await todoPage.getTodoCount();
    await expect(count).toBe(1);
  });
});

