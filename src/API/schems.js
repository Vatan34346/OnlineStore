export const Schems = {
  PRODUCT_SCHEMA: `
  {
  
    category{
      name,products{id,name,inStock,gallery,description,prices{amount,currency},brand,category,attributes{id,name,type,items{id,displayValue,value}}},
    }
    }
 `,
 CURRENCIES:`
 {
  currencies
 }`,
 PRODUCT:(id)=>{
   return `{
     product(id:"${id}"){
      id,name,attributes{id,name,type,items{id,displayValue,value}},description,gallery,brand,prices{amount,currency}
  }
}`
 }
};
