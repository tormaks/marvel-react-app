import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
   const {loading, error, request, clearError} = useHttp();
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=7b278298a152832e44b30fbabfc1fdbd';
   const _offsetComics = 0;
   const _offsetBase = 210;

   const getComics = async (id, offset = _offsetComics) => {
      const res = await request(`${_apiBase}characters/${id}/comics?limit=8&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics);
   }

   const getAllCharacters = async (offset = _offsetBase) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
   }

   const _transformComics = (comics) => {
      return {
         id: comics.id,
         title: comics.title,
         description: comics.description || 'There is no description',
         thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
         price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
         language: comics.textObjects.language || 'en-us',
         pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      }
   }

   const _transformCharacter = (char) => {
      return {
         name: char.name,
         id: char.id,
         description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character. Read on the wiki.',
         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items,
      }
   }

   return {loading, error, getAllCharacters, getCharacter, getComics, clearError};
}

export default useMarvelService;