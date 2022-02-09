import {useHttp} from '../hooks/http.hook';

export const useMarvelService = () => {
   const {loading, error, request, clearError} = useHttp();
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=7b278298a152832e44b30fbabfc1fdbd';
   const _offsetBase = 210;

   let _total = 0;

   const getAllCharacters = () => async (offset = _offsetBase) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      _total = res.data.total;
      return res.data.results.map(_transformCharacter);
   }

   const getCharacter = () => async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
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

   return {loading, error, getAllCharacters, getCharacter};
}