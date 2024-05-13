import Product from "./Product";
import { IProduct } from "./MOCK";

export default function Products({ products }: { products: IProduct[] }) {
  return (
    <div className="bg-blue-000 grid gap-6">
      {products.map((product, index) => {
        return (
          <Product key={index} onBuy={() => console.log(index)} {...product} />
        );
      })}
    </div>
  );
}
