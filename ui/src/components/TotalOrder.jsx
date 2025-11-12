import { useCartStore } from '../store/cart.store';

export const TotalOrder = () => {
  const { totalOrder } = useCartStore();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center text-Rose-900">
        <p className="text-sm">Order Total</p>
        <h2 className="text-xl font-bold">${totalOrder().toFixed(2)}</h2>
      </div>
      <div className="flex justify-center items-center gap-2 bg-Rose-100 px-4 py-3 rounded-md text-[0.8rem] text-Rose-500">
        <img src="assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutral" />
        <p> This is a <span className="font-bold">carbon-neutral</span> delivery </p>
      </div>
    </div>
  )
}
