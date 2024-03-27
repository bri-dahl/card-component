import Card from '../card.vue';

const testArrayWithOneImage = [
  'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAc7f1ca11960546962e0428b219cd6f38e953606e149d8506248907a189abf434f1f83dbb3fd99786e5740ca52efef1676489?w=2400&fit=crop&auto=enhance,format,compress&q=80',
];

const testArrayWithTwoImages = [
  'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAACplhPldO39jLVtt7LaUk8q61gHYELK0qzA3SdlWGn8G4sOYQ5Y?w=2400&fit=crop&auto=enhance,format,compress&q=80',
  'https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAtUOuwDQJjypnal71AkbmTq0j5k5IKPYeN2sqnr5txLMuTAHudg?w=2400&fit=crop&auto=enhance,format,compress&q=80',
];

const propsData = {
  props: {
    'result-name': 'Desert Whisper',
    'result-price': 21250,
    'result-review-score': 4.5,
    'guest-capacity': 2,
    bedrooms: 1,
    bathrooms: 1,
    wifi: true,
  },
};

it('mounts', () => {
  propsData.props['image-source'] = testArrayWithOneImage;
  cy.mount(Card, propsData);
});

it('contains required UI elements', () => {
  propsData.props['image-source'] = testArrayWithOneImage;
  cy.mount(Card, propsData);
  cy.get('[data-cy="card"]').should('exist');
  cy.get('[data-cy="name"]').should('contain', 'Desert Whisper');
  cy.get('[data-cy="price"]').should('exist');
  cy.get('[data-cy="score"]').should('contain', '4.5');
  cy.get('[data-cy="image"]').should('exist');
});

it('contains additional UI elements', () => {
  propsData.props['image-source'] = testArrayWithTwoImages;
  cy.mount(Card, propsData);
  cy.get('[data-cy="capacity"]').should('contain', '2');
  cy.get('[data-cy="bedrooms"]').should('contain', '1');
  cy.get('[data-cy="bathrooms"]').should('contain', '1');
  cy.get('[data-cy="wifi"]').should('exist');
});

it('shows navigation buttons if there are two images', () => {
  propsData.props['image-source'] = testArrayWithTwoImages;
  cy.mount(Card, propsData);
  cy.get('[data-cy="previous-image"]').should('exist');
  cy.get('[data-cy="next-image"]').should('exist');
});

it('hides navigation buttons if there is only one image', () => {
  propsData.props['image-source'] = testArrayWithOneImage;
  cy.mount(Card, propsData);
  cy.get('[data-cy="previous-image"]').should('not.exist');
  cy.get('[data-cy="next-image"]').should('not.exist');
});
