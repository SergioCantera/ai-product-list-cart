import {CartItem} from './CartItem';
import {TotalOrder} from './TotalOrder';
import {CartButton} from './CartButton';
import {useCartStore} from '../store/cart.store';

export const Cart = () => {
  const { cartItems, toggleConfirmation } = useCartStore();
  return (
    <div className="bg-Rose-50 p-6 rounded-lg min-w-[320px] h-full">
      <h2 className="text-2xl font-bold text-Red mb-6">Your Cart ({cartItems.length})</h2>
      { cartItems.length !== 0 ? (
        <>
          {cartItems.map(item => <CartItem key={item.name} {...item}/>)}
          <TotalOrder />
          <CartButton onClick={toggleConfirmation} text="Confirm Order"/>
        </>
      ):(
        <div className="flex flex-col items-center gap-2">
          <img src="assets/images/illustration-empty-cart.svg" alt="illustration-empty-cart" />
          <p className="text-sm text-Rose-500">Your added items will appear here</p>
        </div>
      )
    }
    </div>
  )
}