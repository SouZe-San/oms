import { useRouter } from "next/navigation";
import "./dash-nav-style.css"

interface NotificationModalProps {
  products: { id: string; name: string; stock: number }[];
  onClose: () => void;
}

const NotificationModal = ({ products, onClose }: NotificationModalProps) => {
  const router = useRouter();

  return (
    <div className="absolute right-0 mt-2 z-50 w-96 bg-gray-200 rounded-lg shadow-xl border border-gray-300 text-black">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Low Stock Alerts</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto text-sm flex flex-col">
          {products.length === 0 ? (
            <p>No low stock products 🎉</p>
          ) : (
            products.map((p) => (
              <li key={p.id} className="mt-1 self-start cursor-pointer" onClick={() => { router.push(`/dashboard/product/${p.id}`) }} >
                <span><span className="font-medium underline decoration-red-500 hover:decoration-2">{p.name}</span> has{" "}
                  {p.stock === 0
                    ? <span className="text-red-500">{p.stock}</span>
                    : <span className="text-red-800">{p.stock}</span>
                  }
                  {" "}items in stock! </span>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={onClose}
          className="close-btn mt-4 w-full"
        >
          Close <i className="ri-close-fill"></i>
        </button>
      </div>
    </div>
  );
};


export default NotificationModal;
