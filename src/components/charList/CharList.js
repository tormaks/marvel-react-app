import './charList.scss';
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

   const [chars, setChars] = useState([]);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(true);
   const [newCharactersLoading, setNewCharactersLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [charsEnded, setCharsEnded] = useState(false);

   const refItems = useRef([]);

   const marvelService = new MarvelService();

   useEffect(() => {
      onRequest();
      // window.addEventListener('scroll', loadingCharsByScroll);
   }, [])
 
   // const loadingCharsByScroll = () => {
   //    if ((window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) && (document.documentElement.scrollHeight >= 1614)) {
   //       onRequest(offset);
   //    }
   // }

   const onRequest = (offset) => {
      onLoadingCharacters();
      marvelService.getAllCharacters(offset)
         .then(onLoadedCharacters)
         .catch(onError);
   }

   const onError = () => {
      setError(true);
      setLoading(false);
   }

   const onLoadingCharacters = () => {
      setNewCharactersLoading(true);
   }

   const onLoadedCharacters = newChars => {
      let ended = marvelService._total - offset <= 9;

      setChars(chars => [...chars, ...newChars]);
      setLoading(false);
      setError(false);
      setNewCharactersLoading(false);
      setOffset(offset => offset + 9);
      setCharsEnded(ended);
   }

   const focusChar = (i) => {
      refItems.current[i].focus();
   }

   const renderItems = (chars) => {
      const items = chars.map((item, i) => {
         const {thumbnail, name, id} = item;

         let objectFit = {objectFit: 'cover'};

         if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            objectFit = {objectFit: 'contain'};
         }
         
         return (
            <li className='char__item'
               tabIndex={0}
               ref={char => refItems.current[i] = char}
               key={id}
               onClick={() => {
                  props.onCharSelected(id);
                  focusChar(i);
               }}
               onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                     props.onCharSelected(id);
                     focusChar(i);
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

   const items = renderItems(chars);

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
            onClick={() => onRequest(offset)}
            style={{'display': charsEnded ? 'none' : 'block'}}>
            <div className="inner">load more</div>
         </button>
      </div>
   )
}

CharList.propTypes = {
   onCharSelected: PropTypes.func.isRequired
}

export default CharList;