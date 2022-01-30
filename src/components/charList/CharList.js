import './charList.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

   state = {
      chars: [],
      error: false,
      loading: true,
      newCharactersLoading: false,
      offset: 210,
      charsEnded: false,
   }

   refItems = [];

   marvelService = new MarvelService();

   componentDidMount() {
      this.onRequest();
      window.addEventListener('scroll', this.loadingCharsByScroll);
   }

   componentWillUnmount() {
      window.removeEventListener('scroll', this.loadingCharsByScroll);
   }
 
   loadingCharsByScroll = () => {
      if ((window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) && (document.documentElement.scrollHeight >= 1614)) {
         this.onRequest(this.state.offset);
      }
   }

   onRequest = (offset) => {
      this.onLoadingCharacters();
      this.marvelService.getAllCharacters(offset)
         .then(this.onLoadedCharacters)
         .catch(this.onError);
   }

   onError = () => {
      this.setState({
         error: true,
         loading: false,
      })
   }

   onLoadingCharacters = () => {
      this.setState({
         newCharactersLoading: true,
      })
   }

   onLoadedCharacters = newChars => {
      let ended = this.marvelService._total - this.state.offset <= 9;

      this.setState(({chars, offset}) => ({
         chars: [...chars, ...newChars],
         loading: false,
         true: false,
         newCharactersLoading: false,
         offset: offset + 9,
         charsEnded: ended,
      }))
   }

   setRef = (ref) => {
      this.refItems.push(ref);
   }

   focusChar = (i) => {
      this.refItems[i].focus();
   }

   renderItems = (chars) => {
      const items = chars.map((item, i) => {
         const {thumbnail, name, id} = item;

         let objectFit = {objectFit: 'cover'};

         if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            objectFit = {objectFit: 'contain'};
         }
         
         return (
            <li className='char__item'
               tabIndex={0}
               ref={this.setRef}
               key={id}
               onClick={() => {
                  this.props.onCharSelected(id);
                  this.focusChar(i);
               }}
               onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                     this.props.onCharSelected(id);
                     this.focusChar(i);
                  }
               }}>
               <img style={objectFit} src={thumbnail} alt="abyss"/>
               <div className="char__name">{name}</div>
            </li>
         )
      })
      
      return (
         <ul className="char__grid">
            {items}
         </ul>
      );
   }

   render() {
      const {chars, loading, error, newCharactersLoading, offset, charsEnded} = this.state;

      const items = this.renderItems(chars);

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinner = loading ? <Spinner/> : null;
      const content = !(spinner || errorMessage) ? items : null;
      
      return (
         <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
               className="button button__main button__long"
               disabled={newCharactersLoading}
               onClick={() => this.onRequest(offset)}
               style={{'display': charsEnded ? 'none' : 'block'}}>
               <div className="inner">load more</div>
            </button>
         </div>
      )
   }
}

CharList.propTypes = {
   onCharSelected: PropTypes.func.isRequired
}

export default CharList;