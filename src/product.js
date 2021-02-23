import React,{useReducer} from 'react'

const products = [
    {
      emoji: '🍦',
      name: 'ice cream',
      price: 5
    },
    {
      emoji: '🍩',
      name: 'donuts',
      price: 2.5,
    },
    {
      emoji: '🍉',
      name: 'watermelon',
      price: 4
    }
  ];

  function cartReducer(state,action){

    if(action.type==='add')
    return [...state,action];
    else if(action.type==='remove')
    {
        const productIndex = state.findIndex(x=>x.product.name===action.product.name);
        if(productIndex < 0) {
          return state;
        }
        const update = [...state];
        update.splice(productIndex, 1)
        return update
    }
    else
    return state;
 }

 function totalReducer(state,action){
    if(action.type==='add')
    return state + action.product.price;
    else if(action.type==='remove')
    {
        // let productIndex=state.findIndex(x=>x.product.name===action.product.name);
        // if(productIndex < 0) {
        //     return state;
        //   }
        if(state>0)
          return state - action.product.price;
    }
 }


export default function Product() {
    // const [cart, setcart] = useState([]);
    // const [total, settotal] = useState(0)

     

    const [cart, setcart] = useReducer(cartReducer,[]);
    const [total, settotal] = useReducer(totalReducer,0);

     
    function add(product,type){
        // setcart(x=>[...x,product.name]);
        setcart({product,type:'add'}); 
        settotal({product,type:'add'});
    }

    function remove(product){

        setcart({product,type:'remove'}); 
        settotal({product,type:'remove'});

    //      debugger
    //      var index=-1;
    //      setcart(x=>{
    //     const update=[...x];
    //       index=update.findIndex(x=>x===product.name);
    //      if(index>-1){
    //         update.splice(index,1);
    //         return update;      
    //      }
    // });
    // if(index>-1){
    //    settotal(x=>x - product.price)
    // }
}


    return (
        <div className="wrapper">
      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {total}</div>
      {products.map(x=>{
        return  <div>
                <div className="product"><span role="img" aria-label={x.name}>{x.emoji}</span></div>
                <button onClick={()=>add(x)}>Add</button> <button onClick={()=>remove(x)}>Remove</button>
                </div>
         })
      }
      
    </div>
    )
}
