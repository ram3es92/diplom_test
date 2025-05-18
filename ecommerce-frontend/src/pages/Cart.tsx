import CartDrawer from '../components/CartDrawer'

export default function Cart() {
  return <CartDrawer open={false} onClose={function (): void {
    throw new Error('Function not implemented.')
  } } items={[]} />
}