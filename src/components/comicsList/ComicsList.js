import './comicsList.scss';

import {useEffect, useState} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {

   const [comics, setComics] = useState([]);
   const [offset, setOffset] = useState(0);
   const [comicsEnded, setComicsEnded] = useState(false);
   const [newComicsLoading, setNewComicsLoading] = useState(false);

   const {loading, error, getComics, clearError} = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
      const {charId} = props;

      if (!charId) {
         return;
      }

      clearError();
      initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
      getComics(charId, offset)
          .then(onComicsLoaded);
   }

   const onComicsLoaded = (newComics) => {
      let ended = false;
      if (newComics.length < 8) {
         ended = true;
      }

      setComics(comics => [...comics, ...newComics]);
      setOffset(offset => offset + 8);
      setNewComicsLoading(false);
      setComicsEnded(ended);
   }

   const renderItems = (comics) => {
      const items = comics.map((item, i) => {
         const {title, thumbnail, price} = item;

         return (
             <li key={i} className="comics__item">
                <a href="#">
                   <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                   <div className="comics__item-name">{title}</div>
                   <div className="comics__item-price">{price}</div>
                </a>
             </li>
         )
      })

      return (
          <ul className='comics__grid'>
             {items}
          </ul>
      )
   }

   const items = renderItems(comics);

   const errorMessage = error ?  <ErrorMessage/> : null;
   const spinner = loading && !newComicsLoading ? <Spinner/> : null;

   return (
        <div className="comics__list">
           {items}
           {errorMessage}
           {spinner}
           {comics.length > 0 ?
               <button
                  className="button button__main button__long"
                  disabled={newComicsLoading}
                  style={{'display': comicsEnded ? 'none' : 'block'}}
                  onClick={() => onRequest(offset)}>
               <div className="inner">load more</div>
               </button>
               : null
           }
        </div>
   )
}

export default ComicsList;