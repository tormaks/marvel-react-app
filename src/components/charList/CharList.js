import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

   state = {
      chars: [],
      error: false,
      loading: true,
   }

   marvelService = new MarvelService();

   componentDidMount() {
      this.marvelService.getAllCharacters()
         .then(this.onLoadingCharacters)
         .catch(this.onError);
   }

   onError = () => {
      this.setState({
         error: true,
         loading: false,
      })
   }

   onLoadingCharacters = chars => {
      this.setState({
         chars,
         loading: false,
         true: false,
      })
   }

   renderItems = (chars) => {
      const items = chars.map(item => {
         const {thumbnail, name, id} = item;
         return (
            <li className="char__item" 
               key={id}
               onClick={() => this.props.onCharSelected(id)}>
               <img style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : {objectFit: 'cover'}} src={thumbnail} alt="abyss"/>
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
      const {chars, loading, error} = this.state;

      const items = this.renderItems(chars);

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinner = loading ? <Spinner/> : null;
      const content = !(spinner || errorMessage) ? items : null;
      
      return (
         <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long">
               <div className="inner">load more</div>
            </button>
         </div>
      )
   }
}

export default CharList;