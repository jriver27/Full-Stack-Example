import { ExampleAngularAppPage } from './app.po';

describe('example-angular-app App', function() {
  let page: ExampleAngularAppPage;

  beforeEach(() => {
    page = new ExampleAngularAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
