const funcs = require('./fn');

test('adds 1 + 2 to be 3', () => {
  expect(funcs.add(1, 2)).toBe(3);
});


//To be exact comparison, with objects use toEqual
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });

  test('adding positive numbers is not zero', () => {
        const a = 1
        const b = 2
        expect(a + b).not.toBe(0);
  });

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });

  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

  const people = [
    'Ammar',
    'Leo',
    'Barney',
    'Jaime',
    'Tywin',
  ];
  
  test('The list of people has Ammar on it', () => {
    expect(people).toContain('Ammar');
  });


//Working with async
  test('First book should be Crime and Punishment', async () => {
    expect.assertions(1)
    const response =  await funcs.getBooks()
    expect(response.data.books[0].title).toEqual('Crime and Punishment')
  });

  test('Number of books should be 11', async () => {
    expect.assertions(1)
    const response =  await funcs.getBooks()
    expect(response.data.books.length).toBe(11)
  });

  test(`User's name should be  Leanne Graham`, async () => {
    expect.assertions(1)
    const user =  await funcs.getUser()
    expect(user.data.name).toEqual('Leanne Graham')
  });

