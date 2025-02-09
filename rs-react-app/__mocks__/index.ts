export const mockedItemDetails = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'test',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'test',
  films: ['test'],
  url: 'test',
};

export const mockedItemList = [
  { ...mockedItemDetails, name: 'Leya Skywalker' },
  { ...mockedItemDetails, name: 'Darth Vader' },
  mockedItemDetails,
  mockedItemDetails,
];

export const mockedItemListResponse = {
  count: 4,
  items: mockedItemList,
};
