import React from "react";
import { useSelector } from "react-redux";
interface ListItem {
  _id: string;
  name: string;
  gender?: string;
  genderProbability?: string;
  nationality?: string;
  nationalityProbability?: string;
}

function List() {
  const { persons, loading } = useSelector((store: any) => store.cart);

  return (
    <>
      {!loading && (
        <div className="person-container">
          <div>
            {persons.map((item: ListItem) => {
              const {
                _id: id,
                name,
                gender,
                genderProbability,
                nationality,
                nationalityProbability,
              } = item;
              return (
                <article className="person-item" key={id}>
                  <p className="line">
                    <span>{name}</span>
                    &nbsp;{gender}&nbsp;{genderProbability}&nbsp;{nationality}
                    &nbsp;{nationalityProbability}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default List;
