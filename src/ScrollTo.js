import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ConditionalScroll() {
	const location = useLocation();
	const lastHash = useRef('');

	useEffect(() => {
		if (location.hash) {
			lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
		}

		if (
			lastHash.current &&
			document.getElementById(lastHash.current)
		) {
			setTimeout(() => {
				document
					.getElementById(lastHash.current)
					?.scrollIntoView({ behavior: 'smooth', block: 'start' });
				lastHash.current = '';
			}, 100);
		} else {
			document.documentElement.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant', // Optional
			});
		}
	}, [location]);

	return null;
}
