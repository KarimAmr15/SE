import react, {useState,createContext} from 'react';

export const ProductsAdminContext = createContext();

export const ProductsAdminContextProvider = props => {


    const [products,setProducts] = useState([]);



    return(

        <ProductsAdminContext.Provider value={{products,setProducts}}>
            {props.children}
        </ProductsAdminContext.Provider>
    )
}
