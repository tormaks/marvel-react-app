class MarvelService {
   _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   _apiKey = 'apikey=7b278298a152832e44b30fbabfc1fdbd';
   _offsetBase = 210;
   _total = 0;

   getResource = async (url) => {
      const res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   }

   getAllCharacters = async (offset = this._offsetBase) => {
      const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
      this._total = res.data.total;
      return res.data.results.map(this._transformCharacter);
   }

   getCharacter = async (id) => {
      const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this._transformCharacter(res.data.results[0]);
   }

   _transformCharacter = (char) => {
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
}

export default MarvelService;