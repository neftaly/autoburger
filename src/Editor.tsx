import { toppings } from "./Burger";

export const Editor = ({ doc, changeDoc }) => {
  return (
    <div>
      <hr />
      <div>
        {Object.entries(toppings).map(([id, topping]) => (
          <button
            key={id}
            style={{ display: "block" }}
            children={`+ ${toppings[id].name}`}
            onClick={() => changeDoc((doc) => void doc.layers.push(id))}
          />
        ))}
      </div>
      <hr />
      <div>
        {doc?.layers.map((layer, key) => (
          <div key={key}>
            {toppings[layer].name}
            <button
              children="⬆️"
              onClick={() =>
                changeDoc(
                  (doc) =>
                    void doc.layers.splice(
                      key - 1,
                      0,
                      doc.layers.splice(key, 1)[0]
                    )
                )
              }
            />
            <button
              children="⬇️"
              onClick={() =>
                changeDoc(
                  (doc) =>
                    void doc.layers.splice(
                      key + 1,
                      0,
                      doc.layers.splice(key, 1)[0]
                    )
                )
              }
            />
            <button
              children="🗑️"
              onClick={() => changeDoc((doc) => void doc.layers.splice(key, 1))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
