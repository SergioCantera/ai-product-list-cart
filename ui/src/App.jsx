import {CardsContainer} from './components/CardsContainer';
import {Cart} from './components/Cart';
import {OrderConfirmed} from './components/OrderConfirmed';
import {useCartStore} from './store/cart.store';
import {CustomChat} from './components/CustomChat';
import { useState } from 'react';

function App() {
  const { cartItems } = useCartStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return(
    <div className='min-h-screen'>
      {/* Main content */}
      <div className={`transition-all duration-300 ${isChatOpen ? 'pr-96' : 'pr-0'}`}>
        <main className='flex justify-center'>
          <section className='w-[327px] md:w-[675px] xl:w-[1180px] mb-24'>
            <OrderConfirmed cartItems={cartItems}/>
            <h1 className='text-[2.5rem] font-bold mt-8 mb-[30px]'>Desserts</h1>
            <div className='flex flex-col gap-10 xl:flex-row'>
              <CardsContainer/>
              <Cart />
            </div>
          </section>
        </main>
      </div>
      
      {/* Chat sidebar */}
      <CustomChat onOpenChange={setIsChatOpen} />
    </div>
  )
}

export default App
