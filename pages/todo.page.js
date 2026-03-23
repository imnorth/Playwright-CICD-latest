const { expect } = require('@playwright/test');

class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count strong');
    this.toggleAll = page.locator('label[for="toggle-all"]');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    // With config.baseURL = https://demo.playwright.dev, this resolves to /todomvc/
    await this.page.goto('/todomvc/');
  }

  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(items) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async getTodoCount() {
    const countText = await this.todoCount.textContent();
    const match = (countText || '').match(/\d+/);
    return Number(match?.[0] ?? 0);
  }

  async toggleTodoAt(index) {
    const todo = this.todoItems.nth(index);
    await todo.locator('.toggle').check();
  }

  async clearCompleted() {
    if (await this.clearCompletedButton.isVisible()) {
      await this.clearCompletedButton.click();
    }
  }

  async expectTodoTexts(expected) {
    await expect(this.todoItems).toHaveCount(expected.length);
    for (let i = 0; i < expected.length; i++) {
      await expect(this.todoItems.nth(i)).toHaveText(expected[i]);
    }
  }
}

module.exports = { TodoPage };

