export const CartButton = ({onClick, text}) => {

  return (
    <div className="mt-6">
      <button onClick={onClick} className="bg-Red w-full rounded-full py-4
       text-Rose-100 font-semibold text-sm cursor-pointer
       hover:brightness-90 transition delay-100">{text}</button>
    </div>
  )
}
