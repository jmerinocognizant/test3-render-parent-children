import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Children, Item } from "./Children"



export const Parent = () => {

  console.log('Render Parent');

  const [renderParent,setRenderParent] = useState(0);

  useEffect(() => {
    console.log('useEffect parent');
  }, []);
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect parent');
  }, []);

  // si creamos item directamente en la raiz del componente se vuelve a generar en cada refresco y cambia el objeto
  // dispara el render del hijo porque cambiamos el valor de las props
  //
  // const item:Item = {
  //   image: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
  //   name: 'promo1'
  // }

  // podemos utilizar un useMemo para mantener el objeto item y no disparar el cambio de las props del hijo
  const item:Item = useMemo(() => (
      {
        image: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
        name:'promo1'
      }
    ), []);

  // otra opción es utilizar un useState que internamente memoriza el objeto y tampoco dispara el render del hijo    
  // const [itemState,setItemState] = useState({
  //   image: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
  //   name:'promo1'
  // });

  // si modificamos el valor del useState vuelve a 
  const [renderChildren,setRenderChildren] = useState(0);

  // hemos probado con un useRef pero aunque se incrementa el contador no dispara el refresco 
  // const refContadorChildren = useRef(0);
  // useEffect(() => {
  //   console.log('cambió refContadorChildren: '+refContadorChildren.current);
  // }, [refContadorChildren.current]);

  const onClickRenderChildrenButton = () => {
    //console.log('on click render button');
    setRenderChildren(c => c + 1);
    //refContadorChildren.current++;
  }

  const onClickRenderButton = useCallback(
    () => {
      //console.log('on click render button');
      setRenderParent(c => c + 1);
    },
    [],
  )

  return (
    <>
      <div>Parent renders: {renderParent}</div>
      {/* <button className="btn btn-outline-primary" onClick={onClickRenderChildrenButton}>render children from parent</button> */}

      <hr/>

      <Children item={item} renderCount={renderChildren} onClickHandler={onClickRenderButton} />
      {/* <Children item={item} renderCount={refContadorChildren.current} onClickHandler={onClickRenderButton} /> */}
    </>
  )
}
