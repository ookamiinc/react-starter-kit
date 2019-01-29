describe('App', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should match page title', async () => {
    const title = await page.title();
    expect(title).toBe('Home - www.reactstarterkit.com');
  });
});
