import { useState } from 'react';
import { useOutlet } from 'react-router-dom';

export const AnimatedOutlet: React.FC = () => {
	const out = useOutlet();
	const [outlet] = useState(out);

	return <>{outlet}</>;
};