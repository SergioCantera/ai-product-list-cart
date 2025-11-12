import { CartButton } from './CartButton';
import {useCartStore} from '../store/cart.store';

export const OrderConfirmed = ({cartItems}) => {
  const { isClosed, toggleConfirmation,totalOrder, clearCart } = useCartStore();
  
  const handleClick = () => {
    toggleConfirmation();
    clearCart();
  }

  return (
    <dialog hidden={isClosed} className="w-full fixed h-screen z-10 grid place-content-center bg-black/50">
      <section className="fixed w-full h-screen md:w-[675px] md:relative md:h-full mt-30 md:mt-0 bg-white rounded-xl py-10 px-6">
        <img className="mb-8" src="assets/images/icon-order-confirmed.svg" alt="icon-order-confirmed" />
        <h1 className="text-5xl font-bold w-[150px] mb-2">Order Confirmed</h1>
        <p className="text-Rose-300 font-semibold mb-8">We hope you enjoy your food!</p>
        <div className="bg-Rose-100 p-8 rounded-lg">
          {cartItems.map(({name,price,quantity,image}) => (
            <div key={name} className="flex justify-between items-center mb-6 pb-6 border-b border-Rose-300">
              <div className="flex items-center gap-4">
                <img className="rounded-lg size-18" src={image.thumbnail} alt="image-baklava-thumbnail" />
                <div className="flex flex-col">
                  <h3 className="font-semibold mb-1">{name}</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-Red font-semibold">{quantity}x</p>
                    <p className="text-Rose-400">@${price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <p className="text-Rose-900 text-lg font-semibold">${(quantity * price).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between items-center text-Rose-900 mt-10">
            <p className="text-sm">Order Total</p>
            <h2 className="text-xl font-bold">${totalOrder().toFixed(2)}</h2>
          </div>
      </div>
        <CartButton onClick={handleClick} text="Start New Order"/>
      </section>
    </dialog>
  )
}
