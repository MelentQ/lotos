import CircleType from '../../../node_modules/circletype/dist/circletype.min.js';

export default function circleTyping() {
  const elements = Array.from(document.querySelectorAll('.js-circle-type'));
  elements.forEach(element => {
    const radius = element.dataset.radius || 200;
    const circleType = new CircleType(element);
    circleType.radius(radius).dir(1);
  })
}