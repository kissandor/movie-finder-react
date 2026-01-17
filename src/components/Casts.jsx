import '../style/components.css'
import { useEffect, useState } from 'react'

function Casts({ castList }) {
    const [visible, setVisible] = useState(false);

    // Amikor castList megérkezik, láthatóvá tesszük az elemeket
     useEffect(() => {
        if (castList.length === 0) return;

        setVisible(false); // reset
        const id = requestAnimationFrame(() => {
            setVisible(true);
        });

        return () => cancelAnimationFrame(id);
    }, [castList]);

    return (
        <ul className="cast-list">
            {castList.slice(0, 4).map((cast, index) => (
                <li 
                    key={index} 
                    className={`cast-item ${visible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.2}s` }} // soronként delay
                >
                    <span className='character-name'>{cast.character}</span>
                    <span className='cast-name'>: {cast.name}</span>
                </li>
            ))}
        </ul>
    )
}

export default Casts;
