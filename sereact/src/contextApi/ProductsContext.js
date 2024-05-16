import react, {useState, createContext} from 'react';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props)=>{

    const [products, setProducts] = useState([]);

    return(

        <ProductsContext.Provider >
            {props.children}
        </ProductsContext.Provider>
    )
}