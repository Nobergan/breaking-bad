import hbsSeasonOne from '../../handlebars/season-one.hbs';
import refs from './refs';

function updateAMarkup(articles) {
    //   console.log(articles);
  
    const markUp = hbsSeasonOne(articles);
    refs.contentBox.insertAdjacentHTML("beforeend", markUp);
  }
  
  export default updateAMarkup;