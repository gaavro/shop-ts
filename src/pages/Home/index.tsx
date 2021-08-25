import React, { useEffect, useState } from "react";
import api from "../../services/api";
import formatValue from "../../untils/formatValue";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, ProductList } from "./styles";
import { useCart } from "../../Providers/Cart";

interface IProducts {
  name: string;
  image_url: string;
  price: number;
  description: string;
  id: number;
  priceFormatted: string;
}

function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const response = await api.get("/products/");

    const data = response.data.map((product: IProducts) => ({
      ...product,
      priceFormatted: formatValue(product.price),
    }));

    setLoading(false);
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress size={50} />
      ) : (
        <ProductList>
          {products.map((product: IProducts) => (
            <li key={product.id}>
              <figure>
                <img src={product.image_url} alt={product.name} />
              </figure>
              <strong>{product.description}</strong>
              <div>
                <span>{product.priceFormatted}</span>

                <button type="button" onClick={() => addToCart(product)}>
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>
            </li>
          ))}
        </ProductList>
      )}
    </Container>
  );
}

export default Home;
