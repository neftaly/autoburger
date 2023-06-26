import {toppings} from "./Burger";

export const Editor = ({doc, changeDoc}) => {
    return (
        <div>
            <hr/>
            <div style={{padding: '1rem'}}>
                {Object.entries(toppings).map(([id, topping]) => (
                    <button
                        key={id}
                        style={{display: "block", marginBottom: '0.3rem'}}
                        children={`+ ${topping.name}`}
                        onClick={() => changeDoc((doc) => void doc.layers.unshift(id))}
                    />
                ))}
            </div>
            <hr/>
            <div id="list" style={{minWidth: '290px'}}>
                {doc?.layers.map((layer, key) => (
                    <div key={key} style={{
                        userSelect: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '1rem',
                        border: '1px dotted white',
                        padding: '1rem'
                    }}>
                        <div>{toppings[layer]?.name ?? <s children={layer} /> }</div>

                        <div>{key > 0 ? <button
                            style={{marginLeft: '0.3rem'}}
                            children="⬆️"
                            onClick={() => {

                                changeDoc(
                                    (doc) => {
                                        const layerToMove = doc.layers.splice(key, 1)[0];
                                        doc.layers.splice(key-1, 0, layerToMove);
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
                                        const layerToMove = doc.layers.splice(key, 1)[0];
                                        doc.layers.splice(key+1, 0, layerToMove);
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
