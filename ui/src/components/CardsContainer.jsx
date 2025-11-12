import {ProductCard} from './ProductCard';
import data from '../../data.json';


export const CardsContainer = () => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
      {
        data.map(item => <ProductCard key={item.name} {...item} />)
      }
    </div>
  )
}
