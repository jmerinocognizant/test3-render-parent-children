import { memo, useEffect, useLayoutEffect, useState } from 'react';

export interface Item {
  image: string,
  name: string,
}

interface props {
  item: Item,
  renderCount: number,
  onClickHandler: () => void,
}

export const Children = memo(({item,renderCount,onClickHandler}:props) => {

  console.log('Render Children');

  // ¿por qué si utilizamos un useState no se está actualizando el valor en el div del contador?
  //const [renderChildren,setRenderChildren] = useState(renderCount);

  useEffect(() => {
    console.log('useEffect children');

  }, []);
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect children');
  }, [])

  return (
    <>    
      <div>Children renders: {renderCount}</div>

      <img src={item.image} className="img-fluid animate__animated animate__fadeIn" alt="Responsive image" />

      <button className="btn btn-primary" onClick={onClickHandler}>Re-render parent from children</button>

    </>
  )
})
