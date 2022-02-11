import './charList.scss';
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

   const [chars, setChars] = useState([]);
   const [newCharactersLoading, setNewCharactersLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [charsEnded, setCharsEnded] = useState(false);

   const refItems = useRef([]);

   const {loading, error, getAllCharacters} = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
      initial ? setNewCharactersLoading(false) : setNewCharactersLoading(true);
      getAllCharacters(offset)
         .then(onLoadedCharacters);
   }

   const onLoadedCharacters = newChars => {
      let ended = false;
      if (newChars.length < 9) {
         ended = true;
      }

      setChars(chars => [...chars, ...newChars]);
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
   const spinner = loading && !newCharactersLoading ? <Spinner/> : null;

   return (
      <div className="char__list">
         {errorMessage}
         {spinner}
         {items}
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