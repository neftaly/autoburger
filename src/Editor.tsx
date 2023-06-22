import {toppings} from "./Burger";

export const Editor = ({doc, changeDoc}) => {
    return (
        <div>
            <hr/>
            <div style={{padding: '1rem'}}>
                {Object.entries(toppings).map(([id]) => (
                    <button
                        key={id}
                        style={{display: "block", marginBottom: '0.3rem'}}
                        children={`+ ${toppings[id].name}`}
                        onClick={() => changeDoc((doc) => void doc.layers.unshift(id))}
                    />
                ))}
            </div>
            <hr/>
            <div id="list" style={{minWidth: '290px'}}>
                {doc?.layers.map((layer, key) => (
                    <div key={key} style={{
                        cursor: 'move',
                        userSelect: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '1rem',
                        border: '1px dotted white',
                        padding: '1rem'
                    }}>
                        <div>{toppings[layer].name}</div>

                        <div>{key > 0 ? <button
                            style={{marginLeft: '0.3rem'}}
                            children="⬆️"
                            onClick={() => {

                                changeDoc(
                                    (doc) => {
                                        const replacedLayer = doc.layers[key - 1];
                                        const untouched = doc.layers.slice(key + 1)
                                        const frontLayer = [...doc.layers]
                                        frontLayer.splice(key - 1, untouched.length + 1, layer)
                                        frontLayer.push(...[...untouched])
                                        frontLayer[key] = replacedLayer
                                        doc.layers = frontLayer
                                    }
                                )

                            }

                            }
                        /> : null}
                            {key < (doc.layers.length - 1) ?
                                <button style={{marginLeft: '0.3rem'}}
                                        children="⬇️"
                                        onClick={() =>
                                            changeDoc(
                                                (doc) => {

                                                    const replacedLayer = doc.layers[key + 1];
                                                    const untouched = doc.layers.slice(key + 2)
                                                    const frontLayer = [...doc.layers]
                                                    frontLayer.splice(key + 1, untouched.length + 2, layer)
                                                    frontLayer.push(...[...untouched])
                                                    frontLayer[key] = replacedLayer
                                                    doc.layers = frontLayer

                                                }
                                            )
                                        }
                                /> : null}
                            <button
                                style={{marginLeft: '0.3rem'}}
                                children="🗑️"
                                onClick={() => changeDoc((doc) => void doc.layers.splice(key, 1))}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
