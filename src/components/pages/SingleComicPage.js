import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComicPage = () => {

	const [comic, setComic] = useState({});
	const {comicId} = useParams();
	const {loading, error, getComicsById, clearError} = useMarvelService()

	useEffect(() => {
		onRequest();
	}, [comicId]);

	const onRequest = () => {
		clearError();
		getComicsById(comicId)
			.then(onComicLoaded);
	}

	const onComicLoaded = (comic) => {
		setComic(comic);
	}

	const spinner = loading ? <Spinner/> : null;
	const errorMessage = error ? <ErrorMessage/> : null;
	const content = !(spinner || errorMessage || !comic) ? <View comic={comic}/> : null;
	return (
		<>
			{spinner}
			{errorMessage}
			{content}
		</>
	)
}

const View = ({comic}) => {
	const {title, description, thumbnail, price, language, pageCount} = comic;
	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="../comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;