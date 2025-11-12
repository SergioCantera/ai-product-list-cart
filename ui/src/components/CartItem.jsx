import {useCartStore} from '../store/cart.store';

export const CartItem = ({name, quantity, price}) => {

  const { removeItemFromCart} = useCartStore()

  return (
    <div className="flex justify-between items-center mb-4 border-0 border-Rose-100 border-b-1 text-sm text-Rose-900">
      <div className="flex flex-col">
        <h3 className="font-semibold mb-1">{name}</h3>
        <div className="flex justify-between items-center gap-4 mb-4">
          <p className="text-Red font-semibold">{quantity}x</p>
          <p className="text-Rose-400">@${price}</p>
          <p className="text-Rose-400 font-semibold">${(quantity * price).toFixed(2)}</p>
        </div>
      </div>
      <button>
        <img 
          onClick={() => removeItemFromCart(name)}
          className="border-1 border-Rose-300 rounded-full p-0.5"
          src="./assets/images/icon-remove-item.svg" alt="icon-remove-item" />
      </button>
    </div>
  )
}
