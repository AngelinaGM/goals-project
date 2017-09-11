import { GoalsProjectPage } from './app.po';

describe('goals-project App', () => {
  let page: GoalsProjectPage;

  beforeEach(() => {
    page = new GoalsProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
