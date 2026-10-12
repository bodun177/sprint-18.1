import { useState, useEffect } from "react";

function EntitiesList({ onEntityDetailsClick, propsToDisplay, fetchMethod }) {
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    setEntities(null);
    fetchMethod().then((res) => {
      setEntities(res);
    });
  }, [fetchMethod]);

  return entities ? (
    <ul>
      {entities.map((entity) => (
        <li key={entity.id}>
          <button onClick={() => onEntityDetailsClick(entity.id)}>👀</button>
          {Object.entries(propsToDisplay).map((entry) => (
            <span key={entry[0]}>
              {" "}
              {entry[1]}: <strong>{entity[entry[0]]}</strong>
            </span>
          ))}
        </li>
      ))}
    </ul>
  ) : (
    <p className="center">Loading...</p>
  );
}

export default EntitiesList;
