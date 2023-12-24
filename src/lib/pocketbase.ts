import PocketBase, { RecordService } from 'pocketbase'
import { Wish } from 'src/components/wishlist/Wishlist'

interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService
	collection(idOrName: 'wishes'): RecordService<Wish>
  }

const pb = new PocketBase(import.meta.env.VITE_PB_URL)  as TypedPocketBase

export default pb