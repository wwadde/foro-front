import { useState } from 'react';

interface Props {
    items: string[];
    titulo: string;
    onSelectItem: (item: string) => void;
}

export default function ListGroup({items, titulo, onSelectItem}: Props) {

    const [activeIndex, setActiveIndex] = useState(-1);


    const getMessage = () => {

        return items.length === 0 ? 'No hay elementos' : `Hay ${items.length} elementos`;
    }


    return (
        <>
            <h1>{titulo}</h1>
            <p>{getMessage()}</p>
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        key={item}
                        className={`list-group-item ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => {
                            
                            setActiveIndex(index);
                            onSelectItem(item)
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}
